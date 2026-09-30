import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, cpSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { root, library, json, fingerprint } from '../scripts/lib/project.mjs'
import { componentName } from '../scripts/new-component.mjs'
import { themeOutputs } from '../scripts/generate.mjs'
import { contrast, validateLibrary } from '../scripts/check.mjs'
import { stageLibrary } from '../scripts/pack.mjs'

function temporary(t) {
  const directory = mkdtempSync(resolve(tmpdir(), 'dudu-tooling-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  return directory
}

test('组件名称拒绝路径、特殊字符与重复前缀', () => {
  assert.equal(componentName('date-picker'), 'du-date-picker')
  for (const value of ['../escape', '/tmp/test', 'du-button', 'Badge', 'a_b', '', '--test']) assert.throws(() => componentName(value))
})

test('主题生成不允许 App 不支持的变量套变量，亮暗变量必须一致', () => {
  const tokens = json(resolve(root, 'design-system/tokens.json'))
  const outputs = themeOutputs(tokens)
  assert.match(outputs['theme.scss'], /prefers-color-scheme: dark/)
  assert.ok(!outputs['theme.scss'].includes(':root'))
  const nested = structuredClone(tokens)
  nested.themes.light.primary = 'var(--brand)'
  assert.throws(() => themeOutputs(nested))
  const mismatch = structuredClone(tokens)
  delete mismatch.themes.dark.primary
  assert.throws(() => themeOutputs(mismatch))
  assert.equal(contrast('#000000', '#ffffff'), 21)
  assert.equal(contrast('#ffffff', '#ffffff'), 1)
})

test('组件脚手架可以创建并注册，重复创建不改动原文件', (t) => {
  const directory = temporary(t)
  for (const path of ['scripts', 'design-system', 'uni_modules', 'pages', 'pages.json']) cpSync(resolve(root, path), resolve(directory, path), { recursive: true })
  const script = resolve(directory, 'scripts/new-component.mjs')
  const run = () => spawnSync(process.execPath, [script, 'badge'], { encoding: 'utf8' })
  assert.equal(run().status, 0)
  assert.ok(existsSync(resolve(directory, 'uni_modules/dudu-ui/components/du-badge/du-badge.uvue')))
  assert.ok(json(resolve(directory, 'pages.json')).pages.some((page) => page.path === 'pages/examples/badge/index'))
  const before = fingerprint(resolve(directory, 'uni_modules/dudu-ui'))
  assert.notEqual(run().status, 0)
  assert.equal(fingerprint(resolve(directory, 'uni_modules/dudu-ui')), before)
  const generation = spawnSync(process.execPath, [resolve(directory, 'scripts/generate.mjs'), '--check'], { encoding: 'utf8' })
  assert.equal(generation.status, 0)
})

test('分发包独立完整，拒绝宿主文件和超出模块的引用', (t) => {
  const directory = temporary(t)
  const staged = stageLibrary(directory)
  assert.equal(fingerprint(staged), fingerprint(library))
  assert.throws(() => stageLibrary(directory), /拒绝覆盖/)
  writeFileSync(resolve(staged, 'manifest.json'), '{}')
  assert.throws(() => validateLibrary(staged), /宿主配置/)
  rmSync(resolve(staged, 'manifest.json'))
  const component = resolve(staged, 'components/du-button/du-button.uvue')
  const source = readFileSync(component, 'utf8')
  writeFileSync(component, source.replace('<script setup lang="uts">', '<script setup lang="uts">\nimport broken from "@/styles/demo.uts"'))
  assert.throws(() => validateLibrary(staged), /禁止依赖示例工程/)
})

test('原生样式门禁拒绝关系选择器和裸颜色', (t) => {
  const directory = temporary(t)
  const staged = stageLibrary(directory)
  const component = resolve(staged, 'components/du-button/du-button.uvue')
  const source = readFileSync(component, 'utf8')
  writeFileSync(component, source.replace('.du-button {', '.du-button .child {'))
  assert.throws(() => validateLibrary(staged), /原生选择器/)
  writeFileSync(component, source.replace('border-color: transparent;', 'border-color: #123456;'))
  assert.throws(() => validateLibrary(staged), /裸颜色/)
})
