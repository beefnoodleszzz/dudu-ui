# 官方文档阅读结论与开发约束

阅读日期：2026-09-30。资料以当前 DCloud 文档为准，本地编译器基线为 HBuilderX 5.26.2026091802。以下区分官方行为、项目选择和实际验证。

## 官方行为

| 主题 | 核实结果 | 官方来源 |
| --- | --- | --- |
| 蒸汽模式 | 去掉虚拟 DOM，App 采用新的原生渲染引擎；不是简单把普通 Vue Vapor 搬到 App | [蒸汽模式](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html) |
| 多端运行 | 鸿蒙 5.0+、iOS 5.11+、Android 5.21+ 支持蒸汽；Web / 小程序当前以 VDOM 运行 | [蒸汽模式](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html) |
| 系统基线 | 当前蒸汽模式要求 Android 6+、iOS 15+、鸿蒙 API 20+；原生插件需核对系统与 target 兼容性 | [运行注意](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html#运行注意) |
| Vue | 蒸汽模式仅支持 Composition API；不支持 Options API / mixin | [开发注意](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html#开发注意) |
| 脚本版本边界 | 5.31 以前统一 uts2js，官方提醒显式 ts/js lang 可能触发 bug；5.31+ 才拆分 ts/js/uts 编译策略 | [Vue script](https://doc.dcloud.net.cn/uni-app-x/vue/#lang) |
| 入口 | uni-app X 仍使用 main.uts，不使用 main.ts/js；蒸汽模式可写普通 JS/TS 风格逻辑 | [main.uts](https://doc.dcloud.net.cn/uni-app-x/collocation/main.html) |
| 打包与消费 | 成熟组件以 uni_modules 封装；同名组件目录/文件支持 easycom，按需引入 | [uni_modules](https://doc.dcloud.net.cn/uni-app-x/plugin/uni_modules.html)、[组件](https://doc.dcloud.net.cn/uni-app-x/vue/component.html) |
| UCSS | 跨端布局以 flex / 定位为主，文本样式不继承；蒸汽模式不用复杂关系选择器和伪元素 | [CSS](https://doc.dcloud.net.cn/uni-app-x/css/)、[蒸汽模式](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html#css) |
| 样式隔离 | 策略 2.0 默认组件 isolated；使用处的 class/style 仍能传递到单根节点；内部节点可用 externalClasses 暴露定制入口 | [样式隔离](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html) |
| 主题 | 支持自定义 CSS 变量；App 不支持变量值再引用 var，也不支持嵌套 var 回退；不要照搬 Web :root 方案 | [CSS 方法](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html#customvar) |
| 拍平 | view/text/image 的 flatten 可减少真实节点，但初始化后不能动态切换，且拍平节点不能处理点击/触摸；鸿蒙还要求相邻节点共同拍平才能获益 | [flatten](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html#组件) |
| 列表复用 | list-view / list-item 同文件；第一个有 key 的 list-item v-for 才进入复用路径，不把 list-item 包装到另一个组件 | [list-view 约束](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html#组件) |
| 原生扩展 | 平台 API 放在 utssdk 原生插件中；蒸汽模式页面不直接调用 utsAndroid 等原生 API | [升级指导](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html#vom2vapor) |
| 按钮 | 使用内置 button 保留基础行为；内容不能嵌套组件；组合按钮以独立内容布局和原生点击面实现；App 蒸汽模式修改高度时同步处理 padding | [button](https://doc.dcloud.net.cn/uni-app-x/component/button.html) |

官方文档有自己的性能对比报告，这不是本组件库的实测。不得直接继承“数倍快于原生”的宣传结论；组件性能在具体 release 包、设备、数据量上另行测量。

## 生态与组件库定位

并非没有可用生态：[uni-ui-x](https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/) 已提供扩展组件；[官方介绍](https://doc.dcloud.net.cn/uni-app-x/index.html) 也列举了 Lime UI 等方案。因此，本项目的价值方向是统一的产品视觉、易用且稳定的 API、可定制样式和可复现的跨端验证，而不是单纯重新包一遍所有内置组件。

这是项目定位建议，不是对现有组件库完整程度或性能的独立评测。

## 当前工程选择

单个 HBuilderX 工程，插件唯一源码在 uni_modules/dudu-ui。示例通过 easycom 消费，不引入运行时第三方依赖、monorepo 或全局注册。当前提供三个实验参考组件，完整 API 见插件目录。

主题源文件 design-system/tokens.json 生成样式、宿主主题和组件目录。Provider 用 CSS 变量处理局部主题，Web 使用系统媒体查询，App 使用系统主题 API 解析调色板；inherit 可保留父主题，否则嵌套容器重建边界。Web 使用真实 HTML button/input 提供标准属性与表单语义，相关 DOM 代码只编译到 WEB；原生继续使用官方输入与按钮能力。

新增组件命令生成元数据、源码、API 文档和示例路由。check 检查生成输出、包依赖边界、原生样式约定及默认对比度；pack 生成自包含本地插件包，独立消费者工程验证包脱离实验室后可以编译。

## 验证边界

实测日期 2026-09-30，使用 HBuilderX 5.26.2026091802。当前验证的具体结果在 docs/verification.md 与本机 reports/verification.json 中记录；tasks/todo.md 是历史记录。Web 采用 VDOM，不能作为 App 蒸汽引擎的运行证据；iOS 编译也不等于模拟器交互、Android 或鸿蒙通过。

App 中 scroll-view 使用 direction="vertical"；旧 scroll-y 属性会产生编译警告。原生 min-height 不使用百分比，浏览器专属布局规则条件编译。参见 [scroll-view](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html) 和 [主题](https://doc.dcloud.net.cn/uni-app-x/api/theme.html)。

插件市场平台字段保留未验证标记。许可证和作者未确定，本地打包不等于公开发布。组件新增和发布步骤见 [开发与发布](development.md)。

## 原生运行发现（2026-09-30）

在 iPhone 16 Pro / iOS 18.6 模拟器实际查看 Button、Input、Theme。发现 du-button 的 margin:0 覆盖了使用处 lab-button / lab-action 的间距，导致按钮相贴；移除重置后原生纵向间距恢复。库不规定宿主外边距。Web 回归增加实际 margin-bottom / margin-right 断言。

官方明确 App 单 class 按 class 属性中的顺序确定优先级，Web 按规则定义顺序确定优先级；不能把 Web 样式验收直接代替 App。参见 [UCSS 优先级](https://doc.dcloud.net.cn/uni-app-x/css/#样式冲突、优先级)。输入框原生焦点及输入 Dudu 到 v-model 的数据流已观察通过；软键盘避让、原生读屏和完整设备回归尚未认证。
