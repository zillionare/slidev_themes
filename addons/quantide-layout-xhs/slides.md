---
title: XHS Layout 演示
theme: default
font: "阿里巴巴普惠体-Regular"
addons:
  - quantide-palette
  - quantide-admonition
aspectRatio: 3/4
canvasWidth: 600
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
  - quantide-admonition
font: "阿里巴巴普惠体-Regular"
aspectRatio: 3/4
canvasWidth: 600
img: cats
layout: cover-photo-down
installment: na
htmlAttrs:
  class: autumn
---
```



---
title: 如何使用 quantide-layout-xhs（2） ？
---

前图列出了所有可以定制的属性。addons 属性用来指定扩展。

quantide-layout-xhs包含了页面模板（比如封面应该是什么样？）。quantide-palette 则是用来设定页面的背景、字体的颜色。

字体家族是通过 `font` 属性来指定的。有以下字体可以使用：

<span style="font-family: 'PangMenChuShuTi';border: 1px solid #000;margin-right: 2px;">庞门正道粗书体</span>
<span style="font-family: 'YanShiXiaXing';border: 1px solid #000;margin-right: 2px;">演示夏行</span>
<span style="font-family: 'YanShiChunFeng';border: 1px solid #000;margin-right: 2px;">演示春风</span>
<span style="font-family: 'YanShiQiuHong';border: 1px solid #000;margin-right: 2px;">演示秋鸿</span>
<span style="font-family: 'AlibabaPuHuiTi-Black';border: 1px solid #000;margin-right: 2px;">阿里巴巴普惠体-Black</span>
<span style="font-family: 'AlibabaPuHuiTi-Thin';border: 1px solid #000;margin-right: 2px;">阿里巴巴普惠体-Thin（AlibabaPuHuiTi-Thin）</span>
<span style="font-family: 'AlibabaPuHuiTi-RegularL3';border: 1px solid #000;margin-right: 2px;">阿里巴巴普惠体-Regular（AlibabaPuHuiTi-RegularL3）</span>
<span style="font-family: 'AlibabaPuHuiTi-Bold';border: 1px solid #000;margin-right: 2px;">阿里巴巴普惠体-Bold（AlibabaPuHuiTi-Bold）</span>
<span style="font-family: 'QingLiuLiShu';border: 1px solid #000;margin-right: 2px;">青柳隶书</span>
<span style="font-family: 'HongLeiBanShuJianTi';border: 1px solid #000;margin-right: 2px;">鸿雷板书</span>
<span style="font-family: 'HongLeiXingShuJianTi';border: 1px solid #000;margin-right: 2px;">鸿雷行书</span>
<span style="font-family: 'ChenYuLuoYanXi';border: 1px solid #000;margin-right: 2px;">辰余落雁细</span>
<span style="font-family: 'WenQuanWeiMiHei';border: 1px solid #000;margin-right: 2px;">文泉驿微米黑</span>
<span style="font-family: 'WenQuanYiZenHei';border: 1px solid #000;margin-right: 2px;">文泉驿正黑</span>
<span style="font-family: 'WenQuanYiZenHeiMono';border: 1px solid #000;margin-right: 2px;">文泉驿正黑等宽</span>
<span style="font-family: 'ZhuqueFangsong';border: 1px solid #000;margin-right: 2px;">朱雀仿宋</span>
<span style="font-family: 'OPPOSans-Bold';border: 1px solid #000;margin-right: 2px;">OPPOSans-Bold</span>
<span style="font-family: 'OPPOSans-Medium';border: 1px solid #000;margin-right: 2px;">OPPOSans-Medium</span>
<span style="font-family: 'OPPOSans-Regular';border: 1px solid #000;margin-right: 2px;">OPPOSans-Regular</span>
<span style="font-family: 'wqy-microhei-lite';border: 1px solid #000;margin-right: 2px;">文泉驿微米黑-轻</span>
<span style="font-family: 'wqy-microhei-mono-lite';border: 1px solid #000;margin-right: 2px;">文泉驿微米黑等宽-轻</span>

---
title: 如何使用 quantide-layout-xhs（3） ？
fontTitle: 鸿雷板书
---

允许为不同的部件（比如1~6级标题、列表项等）指定不同的字体。

- fontTitle：为标题（多见于封面）指定字体
- fontH1 ~ fontH6 ：为各级标题指定字体
- fontLi ：列表字体
- fontCode / fontMono / codeFont ：代码字体
- [fontCover、fontCoverTitle、fontCoverH1~fontCoverH6] ： 仅用于 cover 布局对应的元素。

在本页面的 frontmatter 中指定了 fontTitle 为`鸿雷板书`，所以，这一页的标题的字体就与其它页不同。

!!! quote
    接下来的两个属性`aspectRatio`和`canvasWidth`属性，用于指定封面的宽高，必须原样照写：
    ```yaml
    ---
        aspectRatio: 3/4
        canvasWidth: 600
    ---
    ```

---
title: 如何使用 quantide-layout-xhs（4） ？
---

接下来这组属性与封面有关：

```yaml
---
layout: cover-photo-down
img: cats
installment: na
---
```

layout 用来指定页面的布局样式。对于首页，我们一般使用专门设计的封面布局（cover-photo-down/up）。

img 用来指定封面图片。它可以是一个图片链接（有效的 url），也可以是一个关键词。 当它是一个关键词时，将搜索 pixabay 并随机返回一张图片。

!!! info
    要使用 pixabay 的图片，请先在 pixabay申请 api Key， 并设置环境变量VITE_PIXABAY=你的api_key

installment 用来指定系列名称。这在我们发布分期专栏文章时会用到。


---
layout: image-top
title: Image Top布局
img: https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=900&q=80
---

这是一个半图半文的布局（`image-top`）。这里是下半部分正文区块，适合放结论与要点。

---
layout: image-down
title: Image Down布局
img: https://images.unsplash.com/photo-1521120098171-0400b4ec1319?auto=format&fit=crop&w=900&q=80
---

这是与前一页对称的图片布局（`image-down`）。这里是上半部分正文区块，图片在底部突出视觉。

---
layout: grid
title: Grid 布局
gridspec: |
  aa
  bc
---

::a::
这是 `grid` 布局。你可以通过 gridspec 属性来控制布局。比如，这次我们指定的是：

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
title: 空白布局 - blank
---

这是一个纯空白布局(`blank`)，你可以自由绘图（包括通过引入更多 addons来实现）。如果我们没有提供合意的布局，那么，就从这里开始吧！

---
layout: grid
gridspec: |
    ab
    cd
    ef
    gh
    ij
title: 使用admonition
cards: false
---
<style scoped>
    :deep(.grid-area-wrapper) {
       overflow: visible !important;
    }
    :deep(.grid-area-card) {
        padding: 0;
    }
</style>

::a::
!!! info
    这是一个信息

::b::
!!! warning
    这是一个警告

::c::
!!! success
    这是一个成功

::d::
!!! summary
    这是一个摘要

::e::
!!! example
    这是一个示例

::f::
!!! attention
    这是一个注意事项

::g::
!!! tip
    这是一个提示

::h::
!!! error
    这是一个错误

::i::
!!! quote
    这是一个引用

::j::
!!! note
    这是一个 note

---
title: 如何使用 palette?
---

<p style="font-size:18px;line-height:1.2;">通过 `htmlAttrs.class` 来切换全局调色板，如：</p>

<div style="scale: 0.8;margin-top:-40px">
```yaml
---
addons:
  - quantide-palette
htmlAttrs:
  class: autumn
---
```
</div>

<p style="font-size:18px;line-height:1.2;">目前内置的调色板方案有：</p>
<ul>
<li style="font-size:16px">常用亮色：`cupcake`、`valentine`、`pastel`、`fantasy`、`mint`、`winter`</li>
<li style="font-size:16px">商务与通用：`business`、`academic`、`tech`、`corporate`、`wireframe`、`lofi`</li>
<li style="font-size:16px">自然与季节：`garden`、`forest`、`autumn`、`lemonade`、`coffee`、`caramellatte`</li>
<li style="font-size:16px">强风格主题：`halloween`、`dracula`、`night`、`dim`、`nord`、`sunset`</li>
<li style="font-size:16px">高饱和与实验风格：`bumblebee`、`emerald`、`aqua`、`black`、`luxury`、`cmyk`、`acid`、`abyss`</li>
</ul>

<p style="font-size:18px;line-height:1.2;">当你要换肤时，直接修改 `htmlAttrs.class` 就够了。当前用的是 `autumn`。</p>

<div style="scale:0.8;margin-top:-40px">

!!! tip
    如果只是某一小块内容想换肤，也可以给局部容器加上调色板类名，例如 `<div class="dracula">...</div>`。
</div>

---
layout: cover-photo-up
title: 这是另一个封面，与首页对称的布局（cover-photo-up）
img: dogs
excerpt: 这是一个图片在上的封面布局。我们可以在发文时，与 cover-photo-down 交替使用，形成更加丰富的首页组合。
---
