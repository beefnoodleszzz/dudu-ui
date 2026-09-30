# 设计系统

Dudu UI 的视觉目标是克制、清晰、细腻，交互目标是可预测。视觉一致性来自语义 token，不依赖每个组件自己选择颜色。当前版本为实验阶段，尚未完成全平台运行认证。

## 单一来源

仓库 `design-system/tokens.json` 是编辑入口，执行 `npm run generate` 生成插件内 `styles/tokens.scss`、`styles/theme.scss` 和宿主 `theme.json`。用户消费插件不需要生成器。

- 颜色按 primary、surface、text、border、danger、success 等语义命名，亮暗色分别定义。
- 间距采用 4 / 8 / 12 / 16 / 24 / 32，字号采用 12 / 14 / 16 / 20 / 28；正文显式设置文字样式。
- 控件高度为 44 / 48 / 56，紧凑视觉不能牺牲可点击区域。
- 圆角为 8 / 12 / 20；动效为 120 / 220ms。减少动效通过 Provider 和 Web 系统偏好关闭过渡。
- 默认文字组合最低对比度 4.5:1，边框与表面最低 3:1，由本地脚本计算。品牌覆盖后的对比度由使用方验证。

## 主题与隔离

`du-config-provider` 支持 `light`、`dark`、`auto`，通过原生 CSS 变量与媒体查询更新，不安装全局事件监听器。组件无 Provider 时使用亮色回退。

```vue
<du-config-provider theme="auto">
  <du-button label="保存" />
  <du-config-provider theme="light" style="--du-primary: #136d52; --du-on-primary: #ffffff;">
    <du-button label="局部品牌" />
  </du-config-provider>
</du-config-provider>
```

每个 Provider 都完整设置主题变量，所以嵌套 Provider 是独立主题边界。对某个 Provider 的品牌覆盖不会自动穿过另一个 Provider。变量必须使用实际颜色或尺寸，不能嵌套 `var()`。组件根节点可传 class/style；内部节点只通过公开的 externalClasses 定制。

导航栏、状态栏、应用背景属于宿主配置，Provider 不修改这些全局设置。App 自动主题需要 `app.defaultAppTheme: auto`，Web/微信需要各自 darkmode 与 theme.json 配置；详见插件 readme。

## 交互与验收

每个组件先设计 normal、pressed/focused、disabled、loading、error、empty 等相关状态，明确键盘、返回键和关闭行为。动效只解释状态变化，不阻挡操作。对话框、浮层实现时必须验证焦点、滚动锁、返回键、安全区与多个实例，不提前建立空的浮层管理框架。

每个示例覆盖亮暗主题、中文长文本、窄屏、父级控制、禁用和错误。Web 的语义和键盘与 App 的读屏、字体放大分别验收；当前默认对比度检查不等于完整无障碍认证。
