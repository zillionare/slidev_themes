# slidev-addon-quantide-layout

A Slidev addon focused on rich layouts (especially cover layouts) and customizable fonts.

## Install

Add the following frontmatter to your `slides.md`:

```yaml
---
addons:
  - slidev-addon-quantide-layout
---
```

## Layouts

This addon provides the following layouts:

- `barrel`
- `cards`
- `center`
- `cover`
- `cover-figure`
- `cover-introduce-quantide`
- `cover-lecture`
- `cover-random-img-portrait`
- `default` - The default layout
- `end`
- `fact`
- `iframe`
- `image-left`
- `image-right`
- `intro`
- `landscape-section`
- `landscape-two-cols`
- `prelude`
- `quantide-cover`
- `quote`
- `statement`
- `thanks`
- `toc`
- `two-cols`
- `two-cols-header`

## Font Customization

Set fonts by frontmatter:

```yaml
---
font: "青柳隶书"
fontTitle: "庞门正道标题体"
h1: "朱雀仿宋"
---
```

Fonts are loaded from CDN via `styles/font.css` (no local font files required in the published package).

## Configuration

Cover layouts commonly use the following frontmatter fields:

```yaml
---
title: 'Your Presentation Title'
subtitle: 'Your Presentation Subtitle'
seq: 'Sequence Number'
galleryImages:
  - 'https://example.com/image1.jpg'
  - 'https://example.com/image2.jpg'
  - 'https://example.com/image3.jpg'
---
```

## License

MIT
