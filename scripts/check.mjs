import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { isMain, root, library, json, components, files } from './lib/project.mjs'
import { generate } from './generate.mjs'

export function contrast(a, b) {
  const luminance = (hex) => {
    assert.match(hex, /^#[0-9a-f]{6}$/i)
    const rgb = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
      .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
  }
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (values[0] + 0.05) / (values[1] + 0.05)
}
export function validateLibrary(base = library) {
  const pkg = json(resolve(base, 'package.json'))
  assert.equal(pkg.id, 'dudu-ui')
  assert.equal(pkg.dcloudext.type, 'component-vue')
  assert.match(pkg.version, /^\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/)
  const entries = components(base)
  assert.ok(entries.length > 0)
  for (const component of entries) {
    assert.match(component.name, /^du-[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/)
    assert.equal(component.name, component.directory)
    assert.ok(['experimental', 'stable', 'deprecated'].includes(component.status))
    assert.ok(component.title && component.summary && component.category && component.example)
    assert.ok(existsSync(resolve(base, `components/${component.name}/readme.md`)), `${component.name}: 缺少 API 文档`)
    const source = readFileSync(resolve(base, `components/${component.name}/${component.name}.uvue`), 'utf8')
    assert.match(source, /<script setup lang="uts">/, `${component.name}: 需要组合式 UTS`)
    const native = source.replace(/\/\/ #ifdef WEB[\s\S]*?\/\/ #endif/g, '').replace(/\/\* #ifdef WEB \*\/[\s\S]*?\/\* #endif \*\//g, '')
    assert.ok(!/\b(document|window|localStorage)\s*\./.test(native), `${component.name}: 浏览器 API 必须隔离在 WEB 分支`)
    const css = native.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? ''
    assert.ok(!/#[0-9a-f]{3,8}\b/i.test(css), `${component.name}: 使用语义 tokens，不写裸颜色`)
    const clean = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@import[^;]+;/g, '')
    for (const match of clean.matchAll(/(?:^|[{}])\s*([^{}]+?)\s*\{/g)) {
      const selector = match[1].trim()
      if (selector.startsWith('@media')) continue
      assert.ok(selector.split(',').every((part) => /^\.du-[a-z0-9_-]+$/i.test(part.trim())), `${component.name}: 原生选择器不合规：${selector}`)
    }
  }
  for (const path of files(base)) {
    const rel = relative(base, path)
    assert.ok(!/(^|\/)(node_modules|unpackage|\.git)(\/|$)/.test(rel), `禁止发布：${rel}`)
    assert.ok(!['App.uvue', 'main.uts', 'manifest.json', 'pages.json', 'theme.json'].includes(rel), `宿主配置不能放进插件：${rel}`)
    if (!/\.(uvue|uts|scss)$/.test(path)) continue
    const source = readFileSync(path, 'utf8')
    for (const match of source.matchAll(/(?:from\s+|@import\s+)['"]([^'"]+)['"]/g)) {
      const imported = match[1]
      if (imported === 'vue' || imported === '@dcloudio/uni-app') continue
      assert.ok(imported.startsWith('.'), `${rel}: 禁止依赖示例工程别名或未声明的包：${imported}`)
      const resolved = resolve(path, '..', imported)
      assert.ok(resolved.startsWith(base + '/'), `${rel}: 引用超出组件库`)
      assert.ok(existsSync(resolved), `${rel}: 引用不存在：${imported}`)
    }
  }
  return entries
}
export function check() {
  generate(true)
  const manifest = json(resolve(root, 'manifest.json'))
  assert.equal(manifest['uni-app-x'].vapor, true)
  assert.equal(manifest['uni-app-x'].styleIsolationVersion, '2')
  const pages = json(resolve(root, 'pages.json')).pages
  for (const page of pages) assert.ok(existsSync(resolve(root, page.path + '.uvue')), page.path)
  const entries = validateLibrary()
  for (const component of entries) assert.ok(pages.some((page) => page.path === component.example), `${component.name}: 示例未注册`)
  const tokens = json(resolve(root, 'design-system/tokens.json'))
  for (const [name, theme] of Object.entries(tokens.themes)) {
    for (const [foreground, background] of [['text', 'surface'], ['text-muted', 'surface'], ['on-primary', 'primary'], ['on-danger', 'danger'], ['danger', 'danger-surface'], ['success', 'success-surface']]) {
      assert.ok(contrast(theme[foreground], theme[background]) >= 4.5, `${name}: ${foreground}/${background} 文字对比不足`)
    }
    assert.ok(contrast(theme.border, theme.surface) >= 3, `${name}: 输入边界对比不足`)
  }
  for (const name of ['control-sm', 'control-md', 'control-lg']) assert.ok(parseInt(tokens.shared[name]) >= 44, `${name}: 触控高度不足`)
  console.log(`通过：${entries.length} 个组件、示例注册、生成同步、模块引用、原生样式规则及默认主题对比度`)
}
if (isMain(import.meta.url)) check()
