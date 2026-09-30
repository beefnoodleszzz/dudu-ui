# Dudu UI

面向 uni-app X 蒸汽模式的组件库，组件名与 CSS 变量前缀 `du-`。要求 HBuilderX 5.26+，当前是 0.1.0 开发版，API 尚未冻结。

## 安装与使用

将 `uni_modules/dudu-ui` 复制到自己的 uni-app X 工程，或在正式发布后通过 DCloud 插件市场导入。只需复制这个模块，不需要示例工程的 styles、scripts 或其他配置文件。

宿主 manifest.json：

```json
{
  "uni-app-x": { "vapor": true, "styleIsolationVersion": "2" },
  "app": { "defaultAppTheme": "auto" },
  "web": { "darkmode": true },
  "mp-weixin": { "darkmode": true }
}
```

合并以上字段到已有配置，保留宿主的 appid 等字段，不整体替换 manifest。easycom 默认自动扫描，使用时无需全局注册：

```vue
<du-config-provider theme="auto">
  <du-button label="保存" :loading="saving" @click="save" />
  <du-input v-model="name" label="你的称呼" />
</du-config-provider>
```

[组件目录和独立 API](catalog.md) · [设计变量](docs/design-system.md) · [组件契约](docs/component-contract.md)

## 主题与定制

使用 theme=light/dark/auto，或在使用处通过 style 覆盖 `--du-*`。导航栏/TabBar 的主题由宿主 theme.json 管理。需要减少动效时设置 reduced-motion。默认主题不依赖远程字体、图标库或网络请求。

## 兼容性

Web 与小程序当前以 VDOM 运行，原生 App 使用蒸汽引擎；两类验证不能相互替代。平台声明仍保留未验证状态，完整验证后才在正式发布包和市场资料中更新。普通 uni-app 与 App VDOM 模式不是本版支持目标。

## 分发条款

当前未正式发布、未确定公开分发许可证。package.json 的 UNLICENSED 仅标识发布条款待定，不是对消费者的开放授权。正式发布前将提供真实作者资料、许可证、更新日志和经过验证的平台列表。
