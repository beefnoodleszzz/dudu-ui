# Dudu UI

面向 uni-app X 蒸汽模式的组件库基础工程。插件 ID 为 `dudu-ui`，组件、样式及主题变量统一使用 `du-`。当前为 0.1.0 实验阶段。

源码唯一位于 `uni_modules/dudu-ui`，根目录是直接消费同一源码的 HBuilderX 组件实验室。已有 ConfigProvider、Button、Input 三个参考组件，提供局部配置/命名主题、组合按钮、受控与非受控输入、状态样式及逐端属性映射。

## 开始

使用 HBuilderX 5.26+ 打开本目录；本次编译基线为 5.26.2026091802。无需安装 npm 依赖。

```sh
npm run open
npm run check
npm test
npm run build:web
npm run verify:consumer
npm run pack
```

新增组件：`npm run component:new -- badge`；修改主题：编辑 `design-system/tokens.json` 后运行 `npm run generate`。生成器同步真实组件目录与示例入口，不需要手动维护多个目录。

## 消费

复制整个 `uni_modules/dudu-ui` 到 uni-app X 项目，合并所需蒸汽与主题配置，使用 easycom：

```vue
<du-config-provider theme="auto">
  <du-button label="保存" @click="save" />
  <du-input v-model="name" label="姓名" />
</du-config-provider>
```

完整配置与 API 见 [插件使用文档](uni_modules/dudu-ui/readme.md) 和 [组件目录](uni_modules/dudu-ui/catalog.md)。

## 能力目标与任务

以 [Tamagui 官方 UI](https://tamagui.dev/ui/intro) 为组件、属性、组合和交互基线。详见 [能力对照](docs/tamagui-parity.md)，其中区分当前实现和待实现目标。

本轮三个组件的属性映射和技术差异见 [当前组件对照](docs/current-component-parity.md)，检查范围见 [验收记录](docs/verification.md)。

开发任务使用 Beads，主 Epic 为 `du-bz6`。进入项目运行 `bd ready` 查看可开始任务，`bd show <id>` 查看来源、验收和依赖；完成实际验收后才关闭。任务库位于 `.beads`，无需给组件消费者安装 Beads。

## 持续扩展

- [设计系统](uni_modules/dudu-ui/docs/design-system.md)：语义 token、局部主题、视觉与交互验收。
- [组件契约与路线](uni_modules/dudu-ui/docs/component-contract.md)：API、分阶段组件范围和原生性能边界。
- [开发与发布](docs/development.md)：新增组件、质量门禁、独立消费者和插件包。
- [官方依据与验证边界](docs/architecture.md)：框架特性和逐端证据。

当前支持声明保持未验证，编译与特定 Web 回归结果见验证记录。尚未上传插件市场，作者与分发许可证尚待确定；`npm run release:check` 会阻止资料和运行证据不完整的发布。
