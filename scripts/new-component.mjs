import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { isMain, root, library, json, write } from './lib/project.mjs'
import { generate } from './generate.mjs'

export function componentName(input) {
  assert.match(input ?? '', /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, '使用小写英文短名称，如 badge；不能使用路径或特殊字符')
  assert.ok(!input.startsWith('du-'), '只输入短名称，如 badge，不要重复 du- 前缀')
  return 'du-' + input
}
export function createComponent(input) {
  const name = componentName(input)
  const directory = resolve(library, 'components', name)
  const example = `pages/examples/${input}/index`
  assert.ok(!existsSync(directory), `${name} 已存在，拒绝覆盖`)
  assert.ok(!existsSync(resolve(root, 'pages/examples', input)), '示例目录已存在，拒绝覆盖')
  const pageFile = resolve(root, 'pages.json')
  const pages = json(pageFile)
  assert.ok(!pages.pages.some((page) => page.path === example), '路由已存在，拒绝覆盖')
  write(resolve(directory, `${name}.uvue`), `<script setup lang="uts">\n</script>\n\n<template>\n  <view class="${name}"><slot /></view>\n</template>\n\n<style lang="scss">\n@import '../../styles/tokens.scss';\n.${name} { flex-direction: column; }\n</style>\n`)
  write(resolve(directory, 'component.json'), JSON.stringify({ name, title: input, summary: '基础结构已创建；请定义契约并添加行为验证', category: '基础', status: 'experimental', since: json(resolve(library, 'package.json')).version, example }, null, 2) + '\n')
  write(resolve(directory, 'readme.md'), `# ${name}\n\n实验性组件。当前只提供默认内容插槽；功能契约、交互和平台验证须在实现后补充。\n\n## 使用\n\n\`\`\`vue\n<${name}><text>示例内容</text></${name}>\n\`\`\`\n\n## API\n\n默认 slot：内容区域。暂无 props/emits。根样式通过 class/style 设置。\n\n## 平台验证\n\n全部未验证。不得标记为 stable 或宣称兼容。\n`)
  write(resolve(root, example + '.uvue'), `<script setup lang="uts">\n</script>\n\n<template>\n  <du-config-provider class="lab-page">\n    <view class="lab">\n      <text class="lab-title">${name}</text>\n      <${name}><text class="lab-note">待补充交互用例</text></${name}>\n    </view>\n  </du-config-provider>\n</template>\n\n<style lang="scss">\n@import '../../../styles/lab.scss';\n</style>\n`)
  pages.pages.push({ path: example, style: { navigationBarTitleText: name } })
  write(pageFile, JSON.stringify(pages, null, 2) + '\n')
  generate()
  console.log(`已创建 ${name} 的组件、API 文档、元数据和示例。补充行为后运行 npm run check 和编译验证。`)
}
if (isMain(import.meta.url)) createComponent(process.argv[2])
