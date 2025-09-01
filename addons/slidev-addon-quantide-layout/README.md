# slidev-addon-quantide-theme-landscape

Quantide Landscape Theme for Slidev, based on the landscape-jade theme.

## Install

Add the following frontmatter to your `slides.md`:

```yaml
---
theme: quantide-theme-landscape
addons:
  - slidev-addon-quantide-theme-landscape
---
```

## Layouts

This addon provides the following layouts:

- `cover` - A cover page with gallery images
- `cover-douyin` - A cover page styled for Douyin
- `cover-wechat` - A cover page styled for WeChat
- `default` - The default layout
- `end` - An ending page
- `fact` - A fact presentation layout
- `iframe` - An iframe embed layout
- `image-left` - Content with image on the left
- `image-right` - Content with image on the right
- `intro` - An introduction page
- `prelude` - A prelude page
- `quote` - A quote presentation layout
- `section` - A section header page
- `statement` - A statement layout
- `thanks` - A thank you page
- `toc` - A table of contents page
- `two-cols` - A two-column layout

## Configuration

The cover layout uses the following configurations from your frontmatter:

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