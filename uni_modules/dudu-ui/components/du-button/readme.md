# du-button

可组合按钮，保留旧版 label/variant/size 调用。API 状态 experimental。

```vue
<du-button label="保存" icon="＋" icon-after="→" />
<du-button aria-label="新增" icon="＋" circular />
<du-button label="自定义尺寸" :size="64" />
<du-button variant="outlined" aria-label="自定义内容">
  <text class="my-button-text">自定义文字</text>
</du-button>
<du-config-provider size="sm" button-variant="outline">
  <du-button label="继承默认值" />
</du-config-provider>
```

| 属性 | 类型 / 默认值 | 行为 |
| --- | --- | --- |
| label | string / '' | 兼容文本；有 default slot 时作为可访问名称回退 |
| variant | primary / secondary / outline / outlined / ghost / danger；继承 Provider | outlined 是 outline 别名 |
| size / responsiveSize | sm / md / lg / number / 自定义 `$token`；默认继承 | 默认高 44/48/56；数值联动高度、间距、字体、图标；触控高度至少 44。responsiveSize 为 sm/md/lg 的覆盖表 |
| theme | string / 继承 | light/dark/auto 或 config 中命名主题 |
| icon / iconAfter | string / '' | 字符图标或图片路径，前后位置；可用命名 slot 替代 |
| iconSize / scaleIcon | number 或 `$token` / 自动；number / 1 | 默认图标约为高度的 42%；token 对应 config.tokens 的 icon-名称；先取尺寸再缩放 |
| circular | boolean / false | 宽高相等、圆形；普通圆角默认仍为 12px |
| chromeless | boolean 或 all / false | 移除底色与边框；all 同时关闭自定义 hover/press/focus 样式，保留必要键盘焦点提示 |
| unstyled | boolean / 继承 false | 去掉默认尺寸、间距、边框、圆角和底色，保留操作保护与可访问语义 |
| elevation | number / 0 | 阴影偏移与模糊联动 |
| disabled / loading | boolean / 继承 false；boolean / false | disabled 灰化；loading 保留变体配色；都阻止激活与表单提交 |
| loadingText | string / '' | 加载时替代 label；空值保留 label |
| color / backgroundColor / borderColor | string / 未设置 | 接受颜色或语义 `$primary` 等 token |
| borderWidth / borderRadius / paddingHorizontal / fontSize / gap | number / 未设置（gap=8） | px；圆角可明确覆盖 circular 的半径，默认不改变形状 |
| fontWeight | string / 未设置 | 明确的文本字重 |
| hoverStyle / pressStyle / focusStyle | 样式对象 / {} | 悬停、按压、焦点样式，按此顺序覆盖；文字相关样式同步到内置文本，禁用/加载时忽略 |
| forceStyle | hover / press / focus / 未设置 | 强制演示状态；不绕过禁用保护 |
| delayLongPress | number / 500 | 长按毫秒；取消、松开、禁用或卸载清理计时 |
| textClass / contentClass / iconClass | string / '' | externalClasses 明确内部节点定制 |
| ariaLabel | string / '' | 图标按钮或 slot 必须给可读名称；默认使用 label |
| type | button / submit / reset / button | Web 标准 HTML 行为；原生映射 form-type，需置于官方 form 内 |
| form / formAction / formMethod / formEncType / formNoValidate / formTarget | HTML 类型 / 未设置（noValidate=false） | Web 完整 form 关联与提交覆盖；原生不支持 HTML 远程提交属性 |
| name / value | string / 未设置 | Web submitter 的表单数据；原生表单仍遵守官方 form 行为 |
| popoverTarget / popoverTargetAction | string、toggle/show/hide / 未设置 | Web 原生 Popover API；取决于浏览器能力，原生不适用 |

事件 `click()`、`press-in()`、`press-out()`、`longpress()`、`focus()`、`blur()`、`hover-in()`、`hover-out()`。均无 payload；hover 与焦点是 Web 对应交互，原生触控走 touch/原生按钮路径。loading 不执行异步请求，调用方维护请求状态。

默认 slot：`size/loading/disabled`；icon、icon-after、loading slot：`size`。自定义 slot 的文本样式由消费方显式设置，避免依赖原生文字样式继承；不要嵌套交互控件。图标 slot 替代 React 节点/组件传入，不自动修改任意 slot 子组件属性。Provider 默认值替代 Button.Apply。

原生内置 button 不能嵌套组件：纯文本使用内置按钮；组合路径使用内容布局和透明原生按钮点击面，保留触控和 form-type。Web 使用真实 HTML button，支持标准表单、键盘和 submitter。React render/asChild/任意 styled 运行时不作为空属性暴露；用 slot/class/style 定制。

主题变量支持旧版 --du-primary、--du-on-primary、--du-radius 等。宿主负责外边距；禁用状态优先于主动状态样式。平台认证仍以当前源码的验证记录为准。
