# Dudu UI 开发约定

- 范围：专门面向 uni-app X 蒸汽模式。Web / 小程序支持不等于原生蒸汽验证。
- 编译基线 HBuilderX 5.26；阅读 docs/architecture.md 的脚本版本边界后再改 lang。当前 uvue 使用 script setup lang="uts"，入口 main.uts。
- 组件唯一源码 uni_modules/dudu-ui/components；沿用 du- 前缀与 easycom 同名目录/文件。
- 默认样式隔离，简单 class 选择器，显式文本样式；使用 CSS 变量和必要的 externalClasses 提供定制。
- 优先使用内置组件；不引入跨端浏览器 DOM 依赖，Web 专属语义适配只能位于 WEB 条件编译分支、无需求的工具包或全局注册。
- 点击/触摸节点不得拍平；list-item 与 list-view 保持同文件和稳定 key。
- 每次改动运行 npm run check 与相关编译/交互检查。不能以静态检查替代编译或真机验证。
- 发布前更新逐端验证记录；未验证的端不宣称支持。当前未选择许可证、未授权提交或发布。

- token 唯一编辑来源 design-system/tokens.json；生成输出禁止手改。新增组件使用 component:new，再实现契约和示例。
- 修改工具逻辑运行 npm test；发布包先 pack 与 verify:consumer，公开发布前 release:check。证据必须对应当前插件源码指纹。
