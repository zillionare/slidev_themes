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

You can granularly control fonts using flat properties in your headermatter (for global settings) or frontmatter (for single-page overrides):

```yaml
---
font: "阿里巴巴普惠体-Regular" # Default font for the body/text
fontTitle: "青柳隶书"            # Default font for headings (h1-h6)
fontH1: "庞门正道粗书体"          # Specific font for h1 headings
fontH2: "庞门正道标题体"          # Specific font for h2 headings (can also configure fontH3 ~ fontH6)
fontCode: "文泉驿正黑等宽"        # Font for inline code and code blocks
fontLi: "演示夏行"              # Font for list items
fontCover: "阿里巴巴普惠体-Bold"  # Override text font on 'cover' layouts
fontCoverTitle: "heiti"         # Override title font on 'cover' layouts
fontCoverH1: "heiti"            # Override H1 font on 'cover' layouts
---
```

You can also override fonts on specific pages. For example, to change only the text font on a single slide without affecting its headings:

```yaml
---
font: "微软雅黑"
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
