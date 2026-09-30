# du-input

单行输入框，支持受控和非受控模式。API 状态 experimental。默认值只初始化一次，父级受控值优先。

```vue
<du-input v-model="name" label="姓名" :maxlength="20" />
<du-input default-value="hello" label="非受控输入" />
<du-input label="邮箱" type="email" required auto-complete="email" enter-key-hint="next" />
<du-input label="只读" model-value="hello" read-only />
```

| 属性 | 类型 / 默认值 | 行为 |
| --- | --- | --- |
| modelValue / value | string / 未设置 | modelValue 优先，其次兼容 value；两者都未给时非受控；拒绝回写时显示仍取受控值 |
| defaultValue | string / '' | 非受控初始值；后续改变不会重置用户输入 |
| label / ariaLabel | string / '' | 可见标签、标签点击聚焦；ariaLabel 优先；未给 label 时须给可读名称 |
| placeholder / help / error | string / '' | error 优先于 help，Web 错误含 alert 语义；不内置业务校验 |
| disabled / unstyled | boolean / 继承 Provider（默认 false） | 可显式 false 覆盖；unstyled 去除默认框体样式 |
| readOnly / required / password | boolean / false | Web 只读可选择复制，required 标记；password 兼容旧用法 |
| type | text/password/email/tel/number/url/search/digit/none / text | Web HTML 类型，digit 使用 decimal 键盘提示；原生 password→密码开关、search→text+确认键可配置，其他按官方 input 映射 |
| size / responsiveSize / theme | 同 Button / 继承 | sm/md/lg、数字、自定义尺寸 token；联动高度/字体；局部主题 |
| name / form | string / 未设置 | Web 表单名/关联；原生 name 参与官方 form，form ID 关联仅 Web |
| maxlength / minLength / pattern | number / 140、number / 0、string / 未设置 | maxlength=-1 不限制；minLength/pattern 用于 Web HTML 校验，原生由业务校验 |
| autoComplete / autoFocus | string / off、boolean / false | Web 自动填充、初次聚焦；原生用 textContentType 和 auto-focus |
| autoCorrect / autoCapitalize | on/off / on；none/sentences/words/characters/off/on / sentences | Web 输入属性；原生官方 input 不提供对应控制 |
| enterKeyHint | enter/done/go/next/previous/search/send / done | 原生映射 confirm-type；enter/previous 缺对应值时用 done；官方 confirm-type 受 type 约束 |
| confirmHold / cursorSpacing / adjustPosition / holdKeyboard | false / 0 / true / false | 原生确认后保持键盘、光标距离、键盘避让与保持键盘；Web 无同等属性 |
| cursor / selectionStart / selectionEnd | number / -1 | 原生官方光标位置与选择范围属性；Web 使用 DOM 输入节点标准选区行为 |
| selectionColor / placeholderTextColor | string / 未设置 | Web 光标/选区与占位颜色；原生 selectionColor 只映射 cursor-color，不控制选区底色 |
| textContentType | string / '' | 原生自动填充提示，具体可用值依官方兼容表；Web 对应 autoComplete |
| color / backgroundColor / borderColor | string / 未设置 | 颜色或语义 token |
| borderWidth / borderRadius / fontSize | number / 未设置 | px 样式定制 |
| fontWeight | string / 未设置 | 文本字重 |
| hoverStyle / focusStyle / forceStyle | 样式对象 / {}；hover/focus / 未设置 | 状态样式；disabled 不应用；hover 为 Web，focus 对应真实焦点 |
| labelClass / inputClass / messageClass | string / '' | externalClasses 内部样式 |

事件：`update:modelValue(string)`、`update:value(string)`、`input(string)` 在真实用户值变化时发出；外部回写不发事件。`change(string)` 遵循平台原生 change 时机；`focus()`、`blur()` 保留旧版无参数契约；`confirm(string)`、`submit-editing(string)` 对应确认，不执行网络提交；`keyboard-height-change(number)` 为原生键盘高度。

Expose：`focus()`、`blur()`。prefix/suffix slot 接收 disabled，message slot 接收 error/help。Web 中文输入法未结束时 Enter 不触发确认。

原生差异：官方 input 没有 readonly，当前 readOnly 使用 disabled 编辑能力并保留正常视觉，保证值不可改；不承诺原生只读选择/复制或聚焦。键盘外观 keyboardAppearance 没有官方组件属性，当前不支持，不声明一个无效果的 prop；需要原生 UTS 扩展才可增加。autoCorrect/autoCapitalize、HTML minLength/pattern/required 校验依 Web，原生业务可使用同一值事件校验。TextArea/rows 是另一组件任务，不将单行 Input 冒充多行实现。

相关来源：[uni-app X input](https://doc.dcloud.net.cn/uni-app-x/component/input.html)、[Tamagui Input](https://tamagui.dev/ui/inputs)。Web 与原生交互证据分开记录，完整读屏/输入法/真机键盘场景尚未认证。
