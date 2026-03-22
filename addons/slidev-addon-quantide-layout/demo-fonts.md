---
title: Slidev 字体功能演示
info: |
  演示自定义字体加载、字体映射以及通过 frontmatter 切换字体的功能。

# 方案一：扁平化属性命名 (推荐)
font: "阿里巴巴普惠体-Regular" # 全局默认正文字体
fontTitle: "青柳隶书"            # 全局标题字体 (h2-h6, 并且作为 h1 的后备)
fontH1: "庞门正道粗书体"          # 全局 H1 字体
fontCoverTitle: "heiti"         # 仅封面标题字体 (优先级最高，覆盖当前页 h1 和 title)

codeFont: "文泉驿正黑等宽"

addons:
  - slidev-addon-quantide-layout
  - slidev-addon-mouse-trail-pen
  - slidev-addon-array
  - slidev-addon-interactive-table
  - slidev-addon-card
---

# Slidev 字体功能演示

这一页是普通页面，使用的是全局指定的正文字体：**阿里巴巴普惠体-Regular**。

## 标题字体演示 (H2)

- 所有的 H1 标签现在全局默认使用：**庞门正道粗书体**
- H2 到 H6 标签全局默认使用：**青柳隶书**
- 所有的正文 (包括这段文字) 使用：**阿里巴巴普惠体-Regular**

你可以通过控制台检查当前元素的 `font-family` 来验证。

---
layout: cover
---

# 这是一个 Cover 页面

在 Cover 页面中，如果你配置了 `fontCoverTitle: "heiti"`，它会自动覆盖 `fontH1` 和 `fontTitle` 的设置。

此时你应该看到标题使用了黑体 (`heiti`)，而正文仍然是：**阿里巴巴普惠体-Regular**。

---
layout: default
font: "微软雅黑"
fontH1: "演示夏行"
---

# 局部页面覆盖演示

这一页通过 frontmatter 进行了局部覆盖：
- `font: "微软雅黑"` -> 仅将当前页的正文改为微软雅黑。
- `fontH1: "演示夏行"` -> 仅将当前页的 H1 标题改为演示夏行。

## 未覆盖的 H2 标题

注意，我们并没有在当前页覆盖 `fontTitle`，因此这里的 H2 依然继承全局的 **青柳隶书**。

---
layout: center
---

# 混合使用 HTML 标签演示

如果你想让某一部分特别突出，仍然可以使用内联样式：

<div style="font-family: 'PangMenChuShuTi'; font-size: 3rem; color: #ff6600;">
  庞门正道粗书体：霸气侧漏！
</div>

- 默认字体：普通列表项
- <span style="font-family: 'YanShiXiaXing';">演示夏行：书法风格的列表项</span>
- <span style="font-family: 'ZhuqueFangsong';">朱雀仿宋：文艺范的列表项</span>
