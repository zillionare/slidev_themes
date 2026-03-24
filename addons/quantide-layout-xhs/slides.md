---
theme: default
title: Slidev Quantide Layout XHS 演示
aspectRatio: 3/4
canvasWidth: 810
font: "阿里巴巴普惠体-Regular"
addons:
  - ./quantide-layout-xhs
layout: cover-xhs-neat
subtitle: 竖版演示布局
author: Aaron Yang
---

---
layout: cover-figure
title: Cover Figure
subtitle: 3:4 比例封面
img: https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80
---

---
layout: default
title: 默认布局
---

- 这个 addon 专为竖版页面设计
- 只保留最常用布局
- 新增了上下图文布局

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
上方重点区域

::b::
左下信息

::c::
右下信息
