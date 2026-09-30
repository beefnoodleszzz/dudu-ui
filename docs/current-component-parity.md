# 当前三组件的 Tamagui 对齐范围

本轮限定 ConfigProvider、Button、Input，不把其它组件任务提前算完成。对应契约的类型、默认值、事件、插槽和平台差异分别见插件三个组件的 readme；总来源见 [能力基线](tamagui-parity.md)。

## 已实现的映射

| 官方能力 | Dudu 实现 | 验证方式 |
| --- | --- | --- |
| Button size、variant、elevation、disabled、theme | 尺寸 token/数值与联动、outlined 别名、阴影、状态保护、局部命名主题 | Web 实际属性/尺寸/交互；iOS 蒸汽编译与实际显示 |
| icon、iconAfter、iconSize、scaleIcon | 字符/图片图标和前后命名插槽，尺寸与缩放 | 实际图标组合示例；不把 React 组件当 Vue prop |
| circular、chromeless、unstyled | 圆形与普通圆角分开、无底色、无默认样式 | Web 形状与样式断言；原生同屏视觉 |
| Button.Text / Apply / 状态样式 | default slot、textClass/文字属性、Provider 默认值、hover/press/focusStyle | 组合、事件、默认禁用、强制状态检查 |
| Web type/form/action/method/encoding/noValidate/target/name/value/popoverTarget | 真实 HTML button 属性，原生 type 映射 form-type | Web submitter/name/value/method 回归；HTML 提交/Popover 不适用于原生 |
| Input size、type、enterKeyHint | token/数值尺寸、密码/邮箱/电话/数字等、原生确认键映射 | 实际 HTML 输入属性与尺寸；原生输入示例 |
| value/defaultValue、只读、disabled、表单属性 | 受控与非受控；显式默认值只初始化；readonly/required/name/长度/pattern/autofill | 输入/拒绝修改/属性/外部同步回归 |
| placeholderTextColor、selectionColor、光标选区 | Web 占位/光标/选区颜色和选区控制；原生占位/cursor-color/选择范围 | Web 选区断言；原生按官方属性映射 |
| onChange/onSubmitEditing/focus/blur | Vue update/input/change/confirm/submit-editing 与 expose focus/blur | 原有契约兼容；Web 实际输入/重置/确认场景 |
| TamaguiProvider / Theme | DuConfig tokens/themes、命名子主题、亮暗/自动、反转/重置/继承 | Web 命名主题、系统暗色反转、局部嵌套回归；原生同屏显示 |
| media/default props | 固定断点 responsiveSize、Provider 默认尺寸/变体/禁用/unstyled、方向/语言 | Web 375/1280px；原生由页面 windowWidth 驱动 |

## 技术替代与明确差异

- 原生官方 button 不允许子组件，组合布局以透明原生按钮覆盖点击面；纯文本保留原生 button。slot 自定义文字需显式样式，不自动克隆并修改任意子组件。
- 原生官方 input 没有 readonly：禁止编辑并保留正常视觉；不能承诺选择/复制等同 Web。selectionColor 在原生只设置 cursor-color。键盘外观 keyboardAppearance 没有官方属性，未暴露空 prop；需未来明确 UTS 集成。
- HTML required/minLength/pattern 校验、autoCorrect/autoCapitalize、远程表单和 HTML Popover 是 Web 能力。原生保留 name/maxlength、类型、确认、文本内容提示和键盘布局属性，业务使用同一值事件校验。
- TextArea/rows 是单独组件，尚未实现。React render/asChild、styled 编译器、任意动画驱动和运行时 CSS shorthands 不直接移植；slot/class/style、生成 token、状态样式承担当前定制职责。
- 原生没有全局 onWindowResize；页面 onResize 时传 windowWidth。Web 自动监听 resize。Provider 的 themeShallow 可用内层独立 Provider 表达，未用无效果属性冒充。

## 验收与后续

编译、Web 行为和原生视觉结果必须对应当前模块指纹；没有执行的设备交互、读屏、系统输入法或性能检查不算通过。三个组件继续保持 experimental，市场平台支持声明保持未认证。

项目任务为 Beads `du-bz6.44`，三个组件与公共契约的收尾依据实际检查关闭；整体组件库 Epic `du-bz6` 继续进行。原生跨设备完整质量矩阵由后续任务管理。
