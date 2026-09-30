import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { root, library, json, fingerprint } from './lib/project.mjs'
import { check } from './check.mjs'

check()
const issues = []
const pkg = json(resolve(library, 'package.json'))
if (!pkg.author?.trim()) issues.push('填写插件 package.json 的 author 和发布联系信息')
if (!pkg.license || pkg.license === 'UNLICENSED' || !existsSync(resolve(library, 'license.md'))) issues.push('确定分发许可证，并提供 license.md（没有默认替你选择开源/商业条款）')
const config = json(resolve(root, 'release.config.json'))
const evidencePath = resolve(root, 'reports/verification.json')
const evidence = existsSync(evidencePath) ? json(evidencePath) : {}
for (const platform of config.platforms) {
  const record = evidence[platform]
  if (!record || record.status !== 'passed' || record.sourceHash !== fingerprint()) issues.push(`${platform} 缺少当前源码对应的运行验证证据`)
}
if (!readFileSync(resolve(library, 'changelog.md'), 'utf8').includes(pkg.version)) issues.push('changelog 未包含当前版本')
if (issues.length) {
  console.error('发布前仍需完成：\n' + issues.map((issue) => '- ' + issue).join('\n'))
  process.exitCode = 1
} else console.log('本地发布前检查通过；最终平台声明和插件市场资料需在 HBuilderX 发布界面核对。本命令不会上传。')
