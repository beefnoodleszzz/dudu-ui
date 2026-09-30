import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { root } from './lib/project.mjs'
const config = { root, spaceId: Number(process.env.DUDU_TEST_SPACE_ID) || undefined, url: process.env.DUDU_TEST_URL, keep: Boolean(process.env.DUDU_KEEP_TEST_SPACE) }
const result = spawnSync('ego-browser', ['nodejs'], { input: `const testConfig = ${JSON.stringify(config)};\n` + readFileSync(resolve(root, 'tests/button-smoke.mjs'), 'utf8'), stdio: ['pipe', 'inherit', 'inherit'] })
if (result.error) throw result.error
process.exitCode = result.status ?? 1
