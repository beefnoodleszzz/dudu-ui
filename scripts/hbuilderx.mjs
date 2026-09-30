import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const cli = process.env.HBUILDERX_CLI || '/Applications/HBuilderX.app/Contents/MacOS/cli'
const project = process.argv[3] ? resolve(process.argv[3]) : fileURLToPath(new URL('../', import.meta.url))
if (!existsSync(cli)) throw new Error('请安装 HBuilderX，或设置 HBUILDERX_CLI 为其 cli/cli.exe 路径')
const mode = process.argv[2]
if (!['open', 'build:web'].includes(mode)) throw new Error('用法：node scripts/hbuilderx.mjs open|build:web')
const commands = [['open'], ['project', 'open', '--path', project]]
if (mode === 'build:web') commands.push(['publish', 'web', '--project', project, '--webHosting', 'false'])
for (const args of commands) {
  const result = spawnSync(cli, args, { encoding: 'utf8' })
  process.stdout.write(result.stdout ?? '')
  process.stderr.write(result.stderr ?? '')
  if (/编译失败|发布失败|Build failed|appid 不存在/.test((result.stdout ?? '') + (result.stderr ?? ''))) process.exit(1)
  if (result.error) throw result.error
  if (args[0] === 'publish' && !/导出Web成功/.test(result.stdout ?? '')) process.exit(1)
  if (result.status !== 0) process.exit(result.status ?? 1)
}
