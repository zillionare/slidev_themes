---
theme: default
title: Slidev Quantide Layout 演示
info: |
  演示 slidev-addon-quantide-layout 提供的所有功能与布局。

background: https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/slidev/landscape/background/lab-mint.jpg
# 扁平化字体配置 (方案一)
font: "阿里巴巴普惠体-Regular" # 全局默认正文字体
fontTitle: "青柳隶书"            # 全局标题字体 (h1-h6)
fontH1: "庞门正道粗书体"          # 全局 H1 字体

# Cover 专属覆盖
fontCover: "heiti"
fontCoverTitle: "朱雀仿宋"         # 仅封面标题字体
aspectRatio: 16/9
canvasWidth: 1000

fontCode: "文泉驿正黑等宽"

addons:
  - quantide-layout

layout: cover-introduce-quantide
subtitle: 一款专为 Slidev 设计的强大布局与字体扩展插件
author: Aaron Yang
date: "now"
---

---
layout: toc
title: 目录
img: https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80
---

---
layout: section
title: /01 基础概念
img: https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80
---


---
layout: intro
title: 介绍 (Intro Layout)
---

# 什么是 Quantide Layout？

这是一个为 **Slidev** 打造的增强包，它提供了：

- 🎨 **丰富的内置布局** 支持单栏、双栏、图片左/右、各种风格的 Cover 封面等
- 🔤 **极其灵活的字体配置**通过扁平化语法精准控制各个层级的字体
- 🃏 **admonition**支持
- 🎨 **丰富的主题颜色**: 通过quantide-palette提供的颜色方案，你可以轻松自定义主题颜色。

你可以通过 npm 直接安装并在 `addons` 中引入使用。

---
layout: section
title: /02 高级布局
img: https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80
---

---
layout: two-cols
title: 双栏布局演示 (Two Cols)
---

::left::

# 左侧内容区

在双栏布局中，我们可以使用 `::left::` 和 `::right::` 来分割内容。

- 支持**任意 Markdown 语法**
- 可以直接插入图片或组件
- 这个列表项应用了我们配置的 `fontLi`：演示夏行

::right::

# 右侧内容区

```ts
// 支持代码高亮，同时字体受 fontCode 影响
import { computed } from 'vue'

const addon = computed(() => {
  return "slidev-addon-quantide-layout"
})
```

---
layout: two-cols-header
title: 双栏布局演示 (Two Cols Header)
---

与双栏布局不同，two-cols-header 会显示标题，以及横跨双栏的内容。

::left::

# 左侧内容区

在双栏布局中，我们可以使用 `::left::` 和 `::right::` 来分割内容。

- 支持**任意 Markdown 语法**
- 可以直接插入图片或组件
- 这个列表项应用了我们配置的 `fontLi`：演示夏行

::right::

# 右侧内容区

```ts
// 支持代码高亮，同时字体受 fontCode 影响
import { computed } from 'vue'

const addon = computed(() => {
  return "slidev-addon-quantide-layout"
})
```

---
layout: image-left
img: https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/slidev/landscape/background/lab-mint.jpg
class: "text-center"
---

# 左图右文布局 (Image Left)

只需要在 frontmatter 中配置 `img` 属性，即可轻松实现。

- 完美的比例控制，图片默认全覆盖
- 自动适应屏幕大小
- 支持 `class` 属性以控制文字样式，例如当前页使用了 `class: "text-center"` 使文本居中

---
layout: image-right
img: https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/slidev/landscape/background/lab-mint.jpg
class: "bg-gray-100 p-10" 
---

# 右图左文布局 (Image Right)

当然，你也可以使用 `image-right` 实现相反的效果。

如果需要对内容区域添加特殊的样式，可以在 frontmatter 中使用 `class` 属性：

```yaml
---
layout: image-right
img: /path/to/image.jpg
class: "bg-gray-100 p-10" # 可以使用任意 UnoCSS 类名
---
```

---
layout: grid
title: 网格布局 (Grid Layout)
# 通过 cards: false 可以关闭默认的卡片样式（边框、圆角、阴影）
# cards: false
gridspec: |
  aab
  aac
  ddc
---

::a::
### 核心特性

你可以通`gridspec`属性，像 ASCII艺术一样来定义网格布局。每一个区块使用`::letter::`来定义，其中 letter是字母。

你可以通`gridspec`属性，像 ASCII艺术一样来定义网格布局。每一个区块使用`::letter::`来定义，其中 letter是字母。

::b::
### 样式定制

你可以为每个内容块自定义样式，只要在 Markdown 中直接使用 UnoCSS 或内联样式即可。

::c::
### 网格系统

通过 `gridspec` 参数像写 ASCII 艺术一样定义 2D 布局。

::d::
### 响应式支持

每个区域都会自动充满其所在的网格，且内容溢出时会自动出现滚动条。

---
layout: default
---

# 全局与局部字体覆盖演示

在全局配置中，我们指定了标题、正文、列表项和代码的字体。

你可以通过控制台检查这一页的 `font-family` 来验证。

- 所有的 H1 标签现在全局默认使用：**庞门正道粗书体**
- H2 到 H6 标签全局默认使用：**青柳隶书**
- 所有的正文使用：**阿里巴巴普惠体-Regular**
- 此处列表项使用：**演示夏行** (因为配置了 `fontLi`)

如果你想要改变当前单页的字体，只需要在这个页面的 `frontmatter` 中重新定义即可。

---
layout: center
---

# 居中布局 (Center)

这个布局会将所有的内容在屏幕正中央对齐。
非常适合用来展示一句名言，或者是一个重要的数字。

<div style="font-family: 'PangMenChuShuTi'; font-size: 4rem; color: #ff6600; margin-top: 2rem;">
  520,000+
</div>

---
layout: end
---
