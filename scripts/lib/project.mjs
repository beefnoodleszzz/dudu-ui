import { readFileSync, readdirSync, writeFileSync, mkdirSync, realpathSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'

export const root = fileURLToPath(new URL('../../', import.meta.url))
export const library = resolve(root, 'uni_modules/dudu-ui')
export const json = (path) => JSON.parse(readFileSync(path, 'utf8'))
export function components(base = library) {
  return readdirSync(resolve(base, 'components'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ ...json(resolve(base, 'components', entry.name, 'component.json')), directory: entry.name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
export function write(path, content) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content)
}
export function files(base) {
  return readdirSync(base, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(base, entry.name)
    if (entry.isSymbolicLink()) throw new Error(`不允许符号链接：${path}`)
    return entry.isDirectory() ? files(path) : [path]
  }).sort()
}
export function fingerprint(base = library) {
  const hash = createHash('sha256')
  for (const path of files(base)) {
    hash.update(path.slice(base.length)).update('\0').update(readFileSync(path)).update('\0')
  }
  return hash.digest('hex')
}

export const isMain = (url) => Boolean(process.argv[1]) && url === pathToFileURL(realpathSync(process.argv[1])).href
