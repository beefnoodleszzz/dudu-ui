import { cpSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { isMain, root, library, json, fingerprint, write } from './lib/project.mjs'
import { check, validateLibrary } from './check.mjs'

export function stageLibrary(destination) {
  validateLibrary()
  const target = resolve(destination, 'uni_modules/dudu-ui')
  if (existsSync(target)) throw new Error('目标插件目录已存在，拒绝覆盖')
  cpSync(library, target, { recursive: true })
  validateLibrary(target)
  return target
}
export function pack() {
  check()
  const version = json(resolve(library, 'package.json')).version
  const hash = fingerprint()
  const destination = resolve(root, 'dist', `dudu-ui-${version}-${hash.slice(0, 8)}`)
  if (!existsSync(destination)) {
    stageLibrary(destination)
    write(resolve(destination, 'BUILD.json'), JSON.stringify({ version, sourceHash: hash, kind: 'local-draft', note: '本地分发草稿；发布前运行 npm run release:check' }, null, 2) + '\n')
  } else if (fingerprint(resolve(destination, 'uni_modules/dudu-ui')) !== hash) {
    throw new Error('已有草稿包内容被改动，拒绝复用')
  }
  const archive = destination + '.zip'
  if (!existsSync(archive)) {
    const zipped = spawnSync('zip', ['-q', '-r', archive, 'uni_modules'], { cwd: destination, encoding: 'utf8' })
    if (zipped.error || zipped.status !== 0) throw new Error(`ZIP 创建失败；仍可使用目录 ${destination}。${zipped.stderr ?? ''}`)
  }
  console.log(`本地草稿：${archive}`)
  return destination
}
if (isMain(import.meta.url)) pack()
