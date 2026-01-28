---
title: Slidev 字体功能演示
info: |
  演示自定义字体加载、字体映射以及通过 frontmatter 切换字体的功能。
  需求实现说明：
  1. 支持全局和单页 frontmatter 指定字体 (font: "字体名")
  2. 自动加载 styles/fonts 下的所有字体
  3. 提供简洁的字体映射 (如 "庞门正道标题体")

font: "青柳隶书"
codeFont: "青柳隶书"

addons:
  - slidev-addon-quantide-layout
  - slidev-addon-mouse-trail-pen
  - slidev-addon-array
  - slidev-addon-interactive-table
  - slidev-addon-card
---

# Slidev 字体功能演示

这一页使用的是全局指定的字体：**阿里巴巴普惠体-Regular**。

- 字体映射允许你使用中文名称，如 `font: "演示夏行"`
- 字体仅对当前页生效，或者全局生效
- 所有 `styles/fonts` 下的字体都已预加载

---
layout: default
---

# 局部元素字体演示

除了全局和单页设置，你还可以为特定文字指定字体。由于所有字体都已通过 `styles/font.css` 加载，你可以直接使用 `font-family`。

### 1. 使用内联样式 (Inline Style)

这是一段普通的文字。
<span style="font-family: 'QingLiuLiShu'; font-size: 2em;">这段文字使用了“青柳隶书”</span>

### 2. 使用 HTML 标签

如果你想让某一部分特别突出：

<div style="font-family: 'PangMenChuShuTi'; font-size: 3rem; color: #ff6600;">
  庞门正道粗书体：霸气侧漏！
</div>

### 3. 在 Markdown 中混合使用

- 默认字体：普通列表项
- <span style="font-family: 'YanShiXiaXing';">演示夏行：书法风格的列表项</span>
- <span style="font-family: 'ZhuqueFangsong';">朱雀仿宋：文艺范的列表项</span>

---
layout: center
font: "朱雀仿宋"
---

# 这一页使用的是：朱雀仿宋

通过在这一页的 frontmatter 中设置 `font: "朱雀仿宋"`，
该字体仅对本页生效。

---
layout: default
font: "演示夏行"
---

# 这一页使用的是：演示夏行

如果你喜欢书法风格，可以使用演示夏行。

```ts
// 这里的代码使用的是全局指定的代码字体
const message = "Hello Slidev!"
console.log(message)
```

---
layout: cover
font: "鸿雷板书简体"
---

# 封面页：鸿雷板书简体

这一页演示了如何切换到手写风格的字体。

---
layout: default
font: "演示春风"
---

# 演示系列：演示春风

还有更多演示系列字体可供选择：
- 演示夏行
- 演示秋鸿
- 演示春风

---
layout: default
---

# 如何使用

1. **全局设置**：在文档顶部的 frontmatter 中设置 `font`。
2. **单页设置**：在分页符 `---` 下方的 frontmatter 中设置 `font`。
3. **字体映射**：在 `setup/fonts.ts` 中定义了常用字体的映射关系。
4. **自定义 CSS**：你可以直接在元素上使用 `font-family`，所有字体都已加载。

例如：
<p style="font-family: 'ChenYuLuoYanXi'">这段文字使用了：辰余落雁细</p>
<p style="font-family: 'ZhuqueFangsong'">这段文字使用了：朱雀仿宋</p>

---

# 字体列表

| 简洁名称            | 映射后的 CSS Font Family |
| ------------------- | ------------------------ |
| 庞门正道标题体      | PangMenTitle             |
| 青柳隶书            | QingLiuLiShu             |
| 鸿雷板书简体        | HongLeiBanShuJianTi      |
| 演示夏行            | YanShiXiaXing            |
| 阿里巴巴普惠体-Bold | AlibabaPuHuiTi-Bold      |
| ...                 | ...                      |

详情请参考 `setup/fonts.ts`。
