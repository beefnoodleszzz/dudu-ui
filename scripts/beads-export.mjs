import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { root, write } from './lib/project.mjs'

// The local database keeps private ownership metadata; the Git snapshot uses the public project identity.
const rows = execFileSync('bd', ['export'], { cwd: root, encoding: 'utf8' }).trim().split('\n').filter(Boolean).map(line => {
  const issue = JSON.parse(line)
  for (const field of ['owner', 'assignee']) if (issue[field]?.includes('@')) issue[field] = 'beefnoodleszzz'
  return JSON.stringify(issue)
})
write(resolve(root, '.beads/issues.jsonl'), rows.join('\n') + '\n')
console.log(`已导出 ${rows.length} 个任务；公开快照已移除私人邮箱。`)
