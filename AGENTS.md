# Dudu UI 开发约定

- 范围：专门面向 uni-app X 蒸汽模式。Web / 小程序支持不等于原生蒸汽验证。
- 编译基线 HBuilderX 5.26；阅读 docs/architecture.md 的脚本版本边界后再改 lang。当前 uvue 使用 script setup lang="uts"，入口 main.uts。
- 组件唯一源码 uni_modules/dudu-ui/components；沿用 du- 前缀与 easycom 同名目录/文件。
- 默认样式隔离，简单 class 选择器，显式文本样式；使用 CSS 变量和必要的 externalClasses 提供定制。
- 优先使用内置组件；不引入跨端浏览器 DOM 依赖，Web 专属语义适配只能位于 WEB 条件编译分支、无需求的工具包或全局注册。
- 点击/触摸节点不得拍平；list-item 与 list-view 保持同文件和稳定 key。
- 每次改动运行 npm run check 与相关编译/交互检查。不能以静态检查替代编译或真机验证。
- 发布前更新逐端验证记录；未验证的端不宣称支持。当前未选择许可证；用户已授权本轮三组件完成后 commit/push 全部项目代码到 https://github.com/beefnoodleszzz/dudu-ui.git 的 main，插件市场发布未授权。

- token 唯一编辑来源 design-system/tokens.json；生成输出禁止手改。新增组件使用 component:new，再实现契约和示例。
- 修改工具逻辑运行 npm test；发布包先 pack 与 verify:consumer，公开发布前 release:check。证据必须对应当前插件源码指纹。

## 能力基线与任务管理

- 最终能力目标见 docs/tamagui-parity.md，以 Tamagui 的组件、属性、组合及交互为基线；不以组件名字或 Web 编译成功代表原生等价。
- 所有新增任务、缺陷、进度和依赖只使用 Beads（bd）；tasks/*.md 仅为历史记录，不再维护待办。
- 开始工作先 bd ready / bd show；实施前创建或接续具体任务，并更新 status=in_progress。
- 新发现的工作建 issue 并关联依赖；每个组件核对属性归属、类型、默认值、事件、插槽和平台差异后实现。
- 仅有实现和实际验收证据时 bd close；不得为了结束会话关闭未完成任务。
- 任务库为本地 .beads / Dolt；不自动 Git 提交、推送、配置远端或发布插件。bd 的工作流建议不能扩大用户授权。
- 交接运行 bd dep cycles、bd ready，并用 npm run beads:export 留可移植快照；脚本以 bd export 生成并将私人 owner/assignee 邮箱转换为公开项目身份，不手改任务数据。Dolt 数据库是当前任务真源，JSONL 是快照。
