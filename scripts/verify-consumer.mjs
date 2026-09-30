import { mkdtempSync, cpSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { root, write } from './lib/project.mjs'
import { pack } from './pack.mjs'

const draft = pack()
const consumer = mkdtempSync(resolve(tmpdir(), 'dudu-consumer-'))
cpSync(resolve(draft, 'uni_modules'), resolve(consumer, 'uni_modules'), { recursive: true })
cpSync(resolve(root, 'index.html'), resolve(consumer, 'index.html'))
cpSync(resolve(root, 'main.uts'), resolve(consumer, 'main.uts'))
const manifest = JSON.parse(readFileSync(resolve(root, 'manifest.json'), 'utf8'))
manifest.name = 'dudu-consumer'
write(resolve(consumer, 'manifest.json'), JSON.stringify(manifest, null, 2))
write(resolve(consumer, 'App.uvue'), '<script setup lang="uts">\nonLaunch(() => {})\n</script>\n')
write(resolve(consumer, 'pages.json'), JSON.stringify({ pages: [{ path: 'pages/index/index' }], easycom: { autoscan: true } }))
write(resolve(consumer, 'pages/index/index.uvue'), `<script setup lang="uts">\nimport { shallowRef } from 'vue'\nconst value = shallowRef('')\nconst count = shallowRef(0)\n</script>\n<template>\n<du-config-provider theme="dark">\n<du-button id="consumer-button" label="Consumer" @click="count++" />\n<du-input id="consumer-input" v-model="value" label="Name" />\n<text id="consumer-result">{{ count }} / {{ value }}</text>\n</du-config-provider>\n</template>\n`)
const build = spawnSync(process.execPath, [resolve(root, 'scripts/hbuilderx.mjs'), 'build:web', consumer], { stdio: 'inherit' })
if (build.error) throw build.error
if (build.status !== 0) process.exit(build.status ?? 1)
console.log(`独立消费者编译通过：${consumer}`)
