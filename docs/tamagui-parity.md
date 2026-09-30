# Dudu UI × Tamagui 能力基线

目标：达到 Tamagui 同等级的组件种类、属性表达力、组合能力与交互质量，以 uni-app X 蒸汽模式实现。不是把 React 属性机械改名，也不能用只有名字的组件算覆盖。

## 来源与范围

2026-09-30 通过 agent-reach / Jina 阅读 [官方入口](https://tamagui.dev/ui/intro) 和主要组件网页；网页阅读器遗漏 PropsTable 后，读取 [官方仓库 UI 文档](https://github.com/tamagui/tamagui/tree/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components) 的 48 个 `2.0.0.mdx` 文档主题补全属性。该数字包括基础设施、迁移和重叠文档，不等于 48 个独立组件。

网页配置示例使用 v5 配置包，组件文档存在 v1/v2 历史版本；以本次 v2 文档快照为基线。下面列出文档显式属性，继承的 Tamagui 样式、HTML/RN 属性需要在各组件实现任务中继续核对。文档列举不等于 Dudu 已支持，也不证明当前 Tamagui 实现完全一致。

## 当前事实

目前只有 ConfigProvider、Button、Input 三个 experimental 组件。主题/尺寸/加载/受控输入已有部分能力，距本基线尚有大量实现与原生验收工作。其余组件均未实现。原有简版路线不再作为最终范围；本文件定义能力范围，Beads 是任务、进度与依赖唯一来源。

## 公共能力契约

| 维度 | Dudu 目标与验收 |
| --- | --- |
| 尺寸 | 保留 sm/md/lg，并设计 token/数值扩展；联动框体、字体、图标、间距与圆角。`circular` 和一般圆角分开，触控区域至少 44px。 |
| 主题 | 亮/暗/系统、命名品牌主题、局部嵌套和覆盖；显式子节点文字颜色；跨浮层保留主题。 |
| 定制 | variant、unstyled、根样式、明确内部节点定制；hover/press/focus/disabled/loading/invalid 的行为和样式一致。不得承诺原生不支持的 CSS。 |
| 状态 | 表单值以 `modelValue/update:modelValue` 为主；开关/浮层使用明确的受控状态事件；default 值只初始化非受控状态，受控优先，不因父级回写重复发事件。 |
| 组合 | Tamagui 的 Root/Trigger/Content/Indicator 等映射为 `du-*` 子组件或命名插槽，逐组件确定；支持自定义内容，不绑定单一演示布局。 |
| 事件 | React onPress/onValueChange 等映射 Vue 事件；固定参数和触发时机，区分用户变更和外部同步，明确取消关闭协议。 |
| 响应式 | 断点/方向/安全区、Popover/Dialog ↔ Sheet 适配；不擅自销毁输入状态。平台 hover/keyboard 能力分开说明。 |
| 无障碍 | Web 名称/角色/状态/键盘/焦点恢复；原生标签与读屏实际验证，无法等价的属性写明端和替代方案。 |
| 动效 | 打开/关闭/中断/拖动过程一致；系统减少动效；原生性能结论有设备、构建模式与测量证据。 |
| 文档 | 每个组件有默认值、属性类型、事件、子组件/插槽、平台差异、真实示例和当前验证记录。 |

## UI 文档与属性清单

此表是来源索引和显式属性集合，包含子组件属性；实现时须回到对应章节确认归属、类型与默认值。`inputs` 是旧式概要，`new-inputs` 包含新的输入契约；`toast` 与 `toast-2` 同样需要在任务中确定取舍。

| 官方主题 | 显式属性（含子组件） | Beads 任务键 |
| --- | --- | --- |
| [accordion](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/accordion/2.0.0.mdx) | `asChild`, `type`, `value`, `defaultValue`, `onValueChange`, `collapsible`, `disabled`, `dir`, `forceMount` | `du-bz6.22` |
| [alert-dialog](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/alert-dialog/2.0.0.mdx) | `native`, `forceMount`, `displayWhenAdapted`, `shouldAddRootHost` | `du-bz6.37` |
| [anchor](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/anchor/2.0.0.mdx) | `href`, `target`, `rel` | `du-bz6.33` |
| [avatar](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/avatar/2.0.0.mdx) | `delayMs` | `du-bz6.26` |
| [button](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/button/2.0.0.mdx) | `size`, `variant`, `elevation`, `disabled`, `theme`, `icon`, `iconAfter`, `iconSize`, `scaleIcon`, `circular`, `chromeless`, `unstyled`, `type`, `form`, `formAction`, `formMethod`, `formEncType`, `formNoValidate`, `formTarget`, `name`, `value`, `popoverTarget`, `popoverTargetAction` | `du-bz6.10` |
| [card](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/card/2.0.0.mdx) | `size`, `unstyled` | `du-bz6.24` |
| [checkbox](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/checkbox/2.0.0.mdx) | `labeledBy`, `name`, `value`, `checked`, `defaultChecked`, `required`, `native`, `onCheckedChange`, `sizeAdjust`, `scaleIcon`, `scaleSize`, `unstyled`, `activeStyle`, `activeTheme`, `forceMount`, `disablePassStyles`, `labelledBy`, `disabled`, `onPress` | `du-bz6.15` |
| [context-menu](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/context-menu/2.0.0.mdx) | `children`, `placement`, `open`, `defaultOpen`, `onOpenChange`, `onOpenWillChange`, `modal`, `stayInFrame`, `allowFlip`, `offset`, `unstyled`, `zIndex`, `forceMount`, `action`, `loop`, `onCloseAutoFocus`, `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`, `key`, `disabled`, `destructive`, `hidden`, `onSelect`, `onFocus`, `onBlur`, `textValue`, `ios`, `android`, `value`, `onValueChange`, `checked`, `onCheckedChange`, `size`, `onPress`, `backgroundColor`, `borderRadius`, `preferredCommitStyle` | `du-bz6.42` |
| [dialog](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/dialog/2.0.0.mdx) | `children`, `size`, `open`, `defaultOpen`, `onOpenChange`, `modal`, `keepChildrenMounted`, `disableRemoveScroll`, `forceMount`, `unstyled`, `disableOutsidePointerEvents`, `displayWhenAdapted`, `enabled`, `loop`, `trapped`, `focusOnIdle`, `onMountAutoFocus`, `onUnmountAutoFocus` | `du-bz6.36` |
| [focus-scope](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/focus-scope/2.0.0.mdx) | `enabled`, `loop`, `trapped`, `focusOnIdle`, `onMountAutoFocus`, `onUnmountAutoFocus`, `forceUnmount`, `children` | `du-bz6.5` |
| [form](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/form/2.0.0.mdx) | `onSubmit` | `du-bz6.14` |
| [group](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/group/2.0.0.mdx) | `orientation`, `size`, `disabled`, `unstyled`, `children`, `forcePlacement` | `du-bz6.23` |
| [headings](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/headings/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.8` |
| [html-elements](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/html-elements/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.43` |
| [image](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/image/2.0.0.mdx) | `src`, `alt`, `objectFit`, `objectPosition`, `source`, `resizeMode`, `loading`, `decoding`, `fetchPriority`, `srcSet`, `sizes`, `crossOrigin`, `referrerPolicy`, `accessible`, `accessibilityLabel`, `aria-label`, `aria-describedby`, `aria-hidden`, `role` | `du-bz6.27` |
| [inputs](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/inputs/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.11` |
| [intro](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/intro/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.4` |
| [label](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/label/2.0.0.mdx) | `htmlFor`, `unstyled`, `aria-required`, `aria-invalid`, `aria-disabled`, `aria-describedby`, `aria-labelledby`, `aria-details` | `du-bz6.13` |
| [linear-gradient](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/linear-gradient/2.0.0.mdx) | `colors`, `locations`, `start`, `end` | `du-bz6.34` |
| [list-item](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/list-item/2.0.0.mdx) | `title`, `subTitle`, `size`, `variant`, `icon`, `iconAfter`, `iconSize`, `scaleIcon`, `disabled`, `unstyled`, `color` | `du-bz6.25` |
| [lucide-icons](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/lucide-icons/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.9` |
| [menu](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/menu/2.0.0.mdx) | `children`, `placement`, `open`, `defaultOpen`, `onOpenChange`, `onOpenWillChange`, `modal`, `stayInFrame`, `allowFlip`, `offset`, `resize`, `unstyled`, `zIndex`, `forceMount`, `action`, `loop`, `onCloseAutoFocus`, `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`, `key`, `disabled`, `destructive`, `hidden`, `onSelect`, `onFocus`, `onBlur`, `textValue`, `ios`, `android`, `value`, `onValueChange`, `checked`, `onCheckedChange`, `size` | `du-bz6.41` |
| [native](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/native/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.6` |
| [new-inputs](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/new-inputs/2.0.0.mdx) | `size`, `type`, `enterKeyHint`, `placeholderTextColor`, `selectionColor`, `onSubmitEditing`, `keyboardAppearance`, `textContentType`, `rows` | `du-bz6.11` |
| [popover](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/popover/2.0.0.mdx) | `children`, `size`, `placement`, `open`, `defaultOpen`, `onOpenChange`, `keepChildrenMounted`, `disableDismissable`, `stayInFrame`, `allowFlip`, `offset`, `hoverable`, `resize`, `zIndex`, `animatePosition`, `transformOrigin`, `unstyled`, `trapFocus`, `disableFocusScope`, `onOpenAutoFocus`, `onCloseAutoFocus`, `lazyMount`, `enabled`, `loop`, `trapped`, `focusOnIdle`, `onMountAutoFocus`, `onUnmountAutoFocus` | `du-bz6.38` |
| [portal](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/portal/2.0.0.mdx) | `zIndex`, `stackZIndex`, `passThrough` | `du-bz6.6` |
| [progress](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/progress/2.0.0.mdx) | `size`, `value`, `max`, `unstyled` | `du-bz6.29` |
| [radio-group](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/radio-group/2.0.0.mdx) | `name`, `value`, `defaultValue`, `required`, `disabled`, `native`, `onValueChange`, `orientation`, `accentColor`, `labeledBy`, `id`, `scaleSize`, `unstyled` | `du-bz6.16` |
| [roving-focus](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/roving-focus/2.0.0.mdx) | `orientation`, `dir`, `loop`, `currentTabStopId`, `defaultCurrentTabStopId`, `onCurrentTabStopIdChange`, `onEntryFocus`, `asChild`, `tabStopId`, `focusable`, `active` | `du-bz6.5` |
| [scroll-view](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/scroll-view/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.32` |
| [select](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/select/2.0.0.mdx) | `id`, `size`, `children`, `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`, `onOpenChange`, `dir`, `name`, `native`, `renderValue`, `lazyMount`, `zIndex`, `placeholder`, `disableScroll`, `unstyled`, `index`, `enabled`, `loop`, `trapped`, `focusOnIdle`, `onMountAutoFocus`, `onUnmountAutoFocus` | `du-bz6.19` |
| [separator](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/separator/2.0.0.mdx) | `vertical` | `du-bz6.28` |
| [shapes](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/shapes/2.0.0.mdx) | `size`, `circular` | `du-bz6.31` |
| [sheet](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/sheet/2.0.0.mdx) | `open`, `defaultOpen`, `onOpenChange`, `position`, `defaultPosition`, `snapPoints`, `onPositionChange`, `dismissOnOverlayPress`, `animationConfig`, `native`, `disableDrag`, `modal`, `dismissOnSnapToBottom`, `disableRemoveScroll`, `forceRemoveScrollEnabled`, `portalProps`, `moveOnKeyboardChange`, `preferAdaptParentOpenState`, `disableHideBottomOverflow` | `du-bz6.35` |
| [slider](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/slider/2.0.0.mdx) | `size`, `name`, `value`, `defaultValue`, `onValueChange`, `disabled`, `orientation`, `dir`, `min`, `max`, `step`, `minStepsBetweenThumbs`, `onSlideStart`, `onSlideMove`, `onSlideEnd`, `index` | `du-bz6.18` |
| [spinner](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/spinner/2.0.0.mdx) | `size`, `color` | `du-bz6.30` |
| [stacks](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/stacks/2.0.0.mdx) | `fullscreen`, `elevation` | `du-bz6.7` |
| [switch](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/switch/2.0.0.mdx) | `labeledBy`, `name`, `value`, `checked`, `defaultChecked`, `required`, `onCheckedChange`, `unstyled`, `native`, `nativeProps`, `activeStyle`, `activeTheme`, `disabled`, `onPress` | `du-bz6.17` |
| [tabs](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/tabs/2.0.0.mdx) | `value`, `defaultValue`, `onValueChange`, `orientation`, `dir`, `activationMode`, `size`, `loop`, `onInteraction`, `disabled`, `unstyled`, `activeStyle`, `activeTheme`, `forceMount` | `du-bz6.21` |
| [tamagui-image](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/tamagui-image/2.0.0.mdx) | `src`, `alt`, `objectFit`, `unstyled`, `onLoad`, `onError` | `du-bz6.27` |
| [text](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/text/2.0.0.mdx) | `ellipsis`, `numberOfLines`, `size` | `du-bz6.8` |
| [toast-2](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/toast-2/2.0.0.mdx) | `position`, `duration`, `gap`, `visibleToasts`, `swipeDirection`, `closeButton`, `offset`, `hotkey`, `label`, `toast`, `index` | `du-bz6.40` |
| [toast](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/toast/2.0.0.mdx) | `label`, `duration`, `swipeDirection`, `swipeThreshold`, `id`, `native`, `hotkey`, `name`, `multipleToasts`, `portalToRoot`, `unstyled`, `forceMount`, `type`, `defaultOpen`, `open`, `onOpenChange`, `onEscapeKeyDown`, `onPause`, `onResume`, `onSwipeStart`, `onSwipeMove`, `onSwipeCancel`, `onSwipeEnd`, `viewportName` | `du-bz6.40` |
| [toggle-group](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/toggle-group/2.0.0.mdx) | `type`, `value`, `defaultValue`, `orientation`, `disabled`, `onValueChange`, `loop`, `disableDeactivation`, `rovingFocus`, `activeStyle`, `activeTheme` | `du-bz6.20` |
| [tooltip](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/tooltip/2.0.0.mdx) | `children`, `groupId`, `restMs`, `delay`, `size`, `placement`, `open`, `defaultOpen`, `onOpenChange`, `modal`, `stayInFrame`, `allowFlip`, `offset`, `zIndex`, `timeoutMs`, `preventAnimation` | `du-bz6.39` |
| [unspaced](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/unspaced/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.4` |
| [visually-hidden](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/visually-hidden/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.5` |
| [z-index](https://github.com/tamagui/tamagui/blob/0eb99e3fc61537988500268a607b157496985bf0/code/tamagui.dev/data/docs/components/z-index/2.0.0.mdx) | 继承基础/平台属性；见正文 | `du-bz6.6` |

## 平台映射与不等价边界

- React `asChild`、render function、Context/hook 不直接移植。优先用 Vue 插槽、provide/inject 与 UTS 类型；是否可在 Vapor 中跨组件传递上下文、事件及 ref，要通过最小编译和运行样例确认。
- Tamagui 的 HTML 表单和 React Native TextInput 属性不能无条件透传。以 [uni-app X input](https://doc.dcloud.net.cn/uni-app-x/component/input.html)、[textarea](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html)、[button](https://doc.dcloud.net.cn/uni-app-x/component/button.html) 的逐端兼容表为准，Web 专属实现条件编译；键盘类型、自动填充、confirm 和 readonly 必须逐项说明。
- Portal、系统菜单、手势库与动画引擎是 Tamagui 的平台实现依赖，不是可复用的 uni-app X 能力。先验证同页浮层宿主、层叠/滚动/返回与键盘避让；只有原生能力确实需要时才增加 UTS 插件，不能写空代理冒充支持。
- 保持默认样式隔离及简单 class，文字显式样式，定制内部节点使用受支持的 externalClasses；依据 [样式隔离](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html)。
- ScrollView 直接使用原生滚动。ListItem 的便利 API 不得破坏 [list-view](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html) 的同文件复用边界。跨端性能或原生手势等价目前仍未验证。
- Lucide 图标、原生系统菜单、图片预取与渐变能力需确认资源许可、包体与兼容性。不能因为文档出现就默认安装 RN 依赖。

## 交付判定

每项能力分别标记：已实现并验证、已实现待验证、端上替代、明确不支持、待研究。不得把待研究写成技术栈限制直接删除；任何降级要注明原能力、原因、替代、适用端与证据。

组件任务关闭前：完成属性逐项映射、真实组件与示例、交互边界测试、相关端编译和运行、更新指纹对应的验证记录。Web 通过不能替代原生验收；一个组件存在不能代表其属性覆盖完成。

当前基线不指定随意的百分比目标。后续按每个属性/子组件的状态计算覆盖，分别统计语义等价、端上替代和缺失，避免通过组件数量制造完成率。

## Beads 使用

```sh
bd ready
bd show du-bz6
bd update <id> --status in_progress
bd close <id> --reason "实现与验证证据"
bd dep cycles
```

Epic `du-bz6` 管理整体目标。任务详情内包含本表来源、具体行为验收和依赖；按 ready 顺序推进，缺陷优先，不以建立任务代替实现。
