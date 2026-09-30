# 三组件验收记录

日期：2026-09-30。模块源码 SHA-256：`4b64a61330bacd5d46851d1546ac586f9accc579905ef216d57950ce5c084304`。

| 检查 | 结果与范围 |
| --- | --- |
| npm run check | 通过：生成同步、三组件/路由、依赖边界、原生选择器、默认主题对比度 |
| npm test | 5 个工具测试通过，包括真实脚手架生成与分发包自包含性 |
| npm run build:web | HBuilderX 5.26.2026091802 编译通过，无编译警告 |
| npm run test:web | 实际 Chromium：点击/Enter/Space、按下松开、加载进出/禁用保护、图标/slot/圆形/无样式/尺寸、HTML 表单提交、受控/非受控/只读/选区、主题继承/反转/重置/系统切换、375/1280px 无横向溢出 |
| npm run verify:consumer | 仅复制模块的新宿主独立编译通过；easycom、暗色、按钮事件、受控输入另在浏览器实际运行检查 |
| npm run pack | 自包含 ZIP：dudu-ui-0.1.0-4b64a613.zip；源码/文档在 uni_modules 内，无宿主或编译缓存 |
| iOS 蒸汽编译 | iPhone 16 Pro / iOS 18.6，Vapor bytecode，三组件编译通过，无编译警告 |
| iOS 实际查看 | Button 的图标/slot、普通圆角/圆形、数值尺寸、chromeless/unstyled；Input 字段与只读/禁用；Provider 命名/继承/反转/重置/默认禁用 |

原生主题检查发现同节点主题 class 会覆盖命名主题变量；修正为原生输出一次完整解析后的调色板，Web 保留媒体查询。修正后命名、继承及重置均实际显示品牌绿色，反转显示深色调色板。

原生验收为 **partial**。当前 CUA 指针接口 noWindowsAvailable，输入 AX set_value 返回 cannotComplete，未完成本轮真实软键盘输入、中文 IME、键盘遮挡和读屏认证。此前输入观察不能作为当前版本完整认证。Beads `du-bz6.45` 保留这些验收，且阻塞 `du-bz6.43` 市场发布任务。Android、Harmony、微信和 Safari 未做本轮运行验证；组件继续 experimental。

本机详细证据为 reports/verification.json 与截图（忽略于 Git）；本文件提供可提交的范围摘要。后续修改模块会使上述指纹失效，需重跑相关检查。
