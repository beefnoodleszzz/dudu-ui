# 开发与发布

## 新增组件

1. 先描述用户动作、状态、props、events 和平台边界；对照内置能力，避免重复实现。
2. `npm run component:new -- badge`，实现生成的组件及 API 文档、示例。组件名与样式使用 `du-`。
3. `npm run generate` 同步目录、主题与示例索引。修改 token 只改 `design-system/tokens.json`。
4. 执行下方检查，确认源代码和实际运行行为，再更新组件状态与 changelog。

## 本地检查

```sh
npm run check
npm test
npm run build:web
npm run verify:consumer
npm run pack
npm run release:check
```

无需 npm install。编译使用本机 HBuilderX；自定义安装路径通过 HBUILDERX_CLI 指定。静态检查只验证约定和可测量的 token 规则，不替代 UTS 编译、完整无障碍审查和真机性能测量。

Web 构建后，用 `python3 -m http.server 4178 --bind 127.0.0.1 --directory unpackage/dist/build/web` 启动本机服务，在另一个终端执行 `npm run test:web`。需要已安装的 ego-browser；DUDU_TEST_URL 可覆盖地址。测试生成 `reports/verification.json` 和截图，记录组件源码指纹。源码变化后旧证据失效。

`verify:consumer` 在临时目录创建宿主，仅复制发布模块与最小应用入口，独立编译其 easycom 用法。它验证包的自包含性，不是全平台认证。

App 编译示例（本机 macOS）：

```sh
/Applications/HBuilderX.app/Contents/MacOS/cli launch app-ios --project "$PWD" --iosTarget simulator --compile true
```

此命令仅验证编译。真机/模拟器运行必须另测点击、输入、主题切换、字体放大、读屏、返回键和键盘避让。Android、iOS、鸿蒙及微信分别记录版本和设备，不能相互代替。

## 本地发布草稿

`pack` 先验证插件边界，再生成 `dist/dudu-ui-版本-源码指纹/` 与同名 ZIP；目录中 BUILD.json 是本地说明，不进入 ZIP。ZIP 只有 uni_modules/dudu-ui，没有示例、node_modules 或编译产物。

`release:check` 要求作者、许可证文件、changelog 和 release.config.json 中所有目标的当前源码运行证据。缺失时返回非零，这是发布闸门生效。仅编译通过不能记录为运行通过。

作者需自行确认分发许可与联系方式，在 HBuilderX 模块右键上传插件市场时核对截图、兼容平台、隐私声明、版本和文档；本项目脚本不会上传。package.json 平台标记尚未宣称认证支持。

视觉回归要求：默认普通按钮的变体、尺寸、状态与品牌配色使用统一 12px 圆角；circular 明确为圆形、unstyled 明确去掉默认圆角，borderRadius 显式覆盖也应单独验收；主题示例不隐式改变按钮形状。Web 回归读取实际渲染后的圆角，避免只验证变量可覆盖而漏掉视觉不一致。
