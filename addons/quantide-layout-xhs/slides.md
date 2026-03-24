---
title: XHS Layout 演示
theme: default
font: "阿里巴巴普惠体-Regular"
addons:
  - quantide-palette
aspectRatio: 3/4
img: cats
layout: cover-photo-down
installment: na
htmlAttrs:
  class: autumn
---

---
layout: default
title: 如何使用 quantide-layout-xhs（1） ？
---

!!! tip "提示"
    这是 default 布局。当你不指定任何布局时，就会使用这个布局。
    如果本页面指定了 title，它会在顶部居中显示，并且下面有一个分割线。
    你也可以不写 title，或者通过`title: na`来关闭它。


一般地，我们可以这样写 headermatter:

```yaml
---
title: XHS Layout 演示
addons:
  - quantide-layout-xhs
  - quantide-palette
font: "阿里巴巴普惠体-Regular"
aspectRatio: 3/4
img: cats
layout: cover-photo-down
installment: na
htmlAttrs:
  class: autumn
---
```

这里列出了所有可以定制的属性。首先是 addons 属性。在这里，我们指定了两个 addon。

quantide-layout-xhs指定了页面的布局--也即页面模板，比如封面、图片布局等。它还支持了指定字体，使用 admonition 等。

quantide-palette 则是用来设定页面的背景、字体的背景。你可以在后面的页面中，找到可以设置选项。

字体是通过 `font` 属性来指定的。支持的字体列表可以在后面的页面中查看。`font`指定了默认字体。但是我们还允许为不同的部件（比如1~6级标题、列表项等）指定不同的字体。



---
layout: image-top
title: 图片在上
img: https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=900&q=80
---

这里是下半部分正文区块，适合放结论与要点。

---
layout: image-down
title: 图片在下
img: https://images.unsplash.com/photo-1521120098171-0400b4ec1319?auto=format&fit=crop&w=900&q=80
---

这里是上半部分正文区块，图片在底部突出视觉。

---
layout: grid
title: Grid
gridspec: |
  aa
  bc
---

::a::
这是 grid布局。你可以通过 gridspec 属性来控制布局。比如，这次我们指定的是：

```md
gridspec: |
  aa
  bc
```

这样就会显示一个两行的网格布局，其中第一行横跨下面两列。

通过`::a::`和`::b::`来定义每一个单元格的内容

::b::
左下信息

::c::
右下信息

---
layout: blank
title: 空白布局
---

纯空白布局，自由绘图。


---
layout: cover-photo-up
title: 封面在上
img: dogs
excerpt: 这是一个图片在上的封面布局。我们可以在发文时，与 cover-photo-down 交替使用，形成更加丰富的首页组合。
---
