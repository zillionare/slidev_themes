# Slidev Addon Palette

A Slidev addon for custom color palettes.

## Features

- 通过 `htmlAttrs.class` 快速切换全局配色主题
- 提供统一的颜色变量（文本、背景、边框、按钮、语义色）
- 可在单个区块中使用主题类做局部换肤
- 内置常用辅助类（`text-success`、`highlight`、`btn` 等）

## Installation

```bash
npm install slidev-addon-palette
```

## Quick Start

在 `slides.md` 顶部 frontmatter 启用：

```yaml
---
addons:
  - slidev-addon-palette
htmlAttrs:
  class: academic
---
```

## Available Theme Classes

`cupcake` `business` `academic` `tech` `valentine` `bumblebee` `emerald` `corporate` `halloween` `garden` `forest` `aqua` `lofi` `pastel` `fantasy` `wireframe` `black` `winter` `mint` `luxury` `dracula` `cmyk` `autumn` `acid` `lemonade` `night` `coffee` `dim` `nord` `sunset` `caramellatte` `abyss`

## Usage

全局主题：

```yaml
---
addons:
  - slidev-addon-palette
htmlAttrs:
  class: dracula
---
```

局部主题（单个容器）：

```md
<div class="valentine p-4 rounded">
  <h2 class="heading-2">Valentine Section</h2>
  <p class="text-secondary">This block uses valentine palette.</p>
  <button class="btn">Primary</button>
</div>
```

语义类示例：

```md
<p class="text-success">Success</p>
<p class="text-warning">Warning</p>
<p class="text-error">Error</p>
<p class="highlight">Important</p>
```

## Core CSS Variables

`--primary` `--secondary` `--accent` `--success` `--warning` `--error` `--info`  
`--text-primary` `--text-secondary` `--text-tertiary`  
`--bg-primary` `--bg-secondary` `--bg-tertiary` `--bg-accent`  
`--border-primary` `--border-secondary`

## License

MIT
