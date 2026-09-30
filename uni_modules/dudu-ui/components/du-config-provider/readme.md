# du-config-provider

局部配置、主题与默认值容器，对应 TamaguiProvider + Theme + Apply 的常用能力。API 状态 experimental；不改变宿主导航栏、存储或全局注册。

```vue
<du-config-provider :config="config" theme="light_brand" size="sm" button-variant="outline">
  <du-button label="继承默认值" />
  <du-config-provider inherit><du-button label="继承品牌" /></du-config-provider>
  <du-config-provider theme-inverse><du-button label="反转主题" /></du-config-provider>
</du-config-provider>
```

```ts
// 可直接使用插件内 shared/config.uts 导出的 DuConfig 类型。
const config = {
  defaultTheme: 'light_brand', size: 'md', buttonVariant: 'primary',
  tokens: { 'size-tall': '72px', 'icon-large': '24px', radius: '12px' },
  themes: { light_brand: { primary: '#136d52', 'on-primary': '#ffffff' } },
  breakpoints: { md: 768, lg: 1024 },
}
```

| 属性 | 类型 / 默认值 | 行为 |
| --- | --- | --- |
| config | DuConfig / 继承 | tokens、themes、defaultTheme、size、buttonVariant、breakpoints；局部响应式更新，不安装全局运行时 |
| theme | string / config.defaultTheme 或 auto | light/dark/auto 或命名主题；brand 按父级亮暗解析 light_brand/dark_brand；未知名称回退父级 |
| inherit | boolean / false | 未给 theme 时继承父级视觉变量与主题；默认每个容器重建亮暗变量边界，兼容旧版行为 |
| themeInverse / themeReset | boolean / false | 反转亮暗（auto 随系统实时反转），优先同名反色主题；恢复配置默认主题；有具体 theme 时也可明确 reset |
| size / buttonVariant | DuSize / 继承配置；string / 继承配置 | Button.Apply 等价默认值；子组件显式属性优先 |
| disabled / unstyled / reducedMotion | boolean / 继承（根 false） | 可显式 false 覆盖父级；减少库定义的非必要动效 |
| dir / locale | ltr/rtl / 继承 ltr；string / 继承 zh-CN | Web dir/lang；原生由组件布局顺序、文字对齐及消费方本地化处理，不冒充原生 lang 属性 |
| windowWidth | number / 未设置 | 原生页面 onResize 时传入宽度驱动响应式；初始取 getWindowInfo；Web 自动监听窗口尺寸 |

默认 scoped slot：theme、size、width、dir。无 emits。共享配置读取函数 `useDuConfig()` 位于 shared/config.uts，返回 computed 的只读契约，消费方不修改 context。

配置 token 键是语义名称，值是 CSS 的具体值，不把 var 再赋给 var。size 自定义名称用 `$tall` 对应 size-tall，图标用 `$large` 对应 icon-large。样式通过 --du-* 输出，主题可只覆盖部分语义颜色。根 class/style 仍可传入；动态 config 不依赖示例工程。

原生响应式页面示例：在页面 `onResize(event)` 更新 ref，向 Provider 传 `:window-width="width"`。uni-app X 5.26 没有可用的全局 onWindowResize；不使用普通 uni-app 的 observer API 冒充支持。Web 监听 resize，并在卸载时清理。

Tamagui 的 React SSR、styled 编译器、CSS 注入开关、任意 shorthands/动画驱动不直接移植。Dudu 的设计变量生成、原生兼容 class/style、状态样式和明确断点配置承担对应职责；任意运行时 media 规则和 animation 插件当前不支持。themeShallow 不提供伪属性，若 slot 要独立主题，请使用内层 Provider。

auto：宿主 Web/小程序需开启 darkmode；App 蒸汽使用 HBuilderX 5.25+ 并配置 defaultAppTheme=auto。Web 同时尊重系统减少动效；原生 reducedMotion 由宿主提供。完整平台支持以独立证据为准。
