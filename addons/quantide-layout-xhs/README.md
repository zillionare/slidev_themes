# slidev-addon-quantide-layout-xhs

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/zillionare/slidev_themes/tree/main/addons/quantide-layout-xhs)

A Slidev addon for Xiaohongshu-style layouts with Pixabay image integration.

## Install

Add the following frontmatter to your `slides.md`:

```yaml
---
addons:
  - slidev-addon-quantide-layout-xhs
---
```

If you want to use `!!! tip`, `!!! note`, `!!! warning` and other admonition syntax, add `slidev-addon-quantide-admonition` explicitly:

```yaml
---
addons:
  - slidev-addon-quantide-layout-xhs
  - slidev-addon-quantide-admonition
---
```

## Layouts

This addon provides the following layouts:

- `cover-photo-down` - Cover with photo at bottom half
- `cover-photo-up` - Cover with photo at top half
- `image-down` - Content with image at bottom
- `image-top` - Content with image at top
- `grid` - Grid layout for cards
- `blank` - Blank layout
- `default` - Default layout

## Configuration

### Pixabay API Key Setup

To use the `cover-photo-*` layouts with keyword-based image search, you need to configure a Pixabay API Key:

1. Get your free API key from [Pixabay](https://pixabay.com/api/docs/)

2. Add to your `.env` file (in project root):
   ```
   VITE_PIXABAY=your_pixabay_api_key_here
   ```

3. Restart your Slidev dev server

### Usage Example

```yaml
---
layout: cover-photo-down
title: "My Article Title"
installment: "Series Name"
excerpt: "A brief description of the article"
img: "nature landscape"  # Can be a keyword or full URL
---
```

### Frontmatter Options

| Property      | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| `title`       | string | Article title                  |
| `installment` | string | Series name (use "NA" to hide) |
| `excerpt`     | string | Article excerpt/description    |
| `img`         | string | Image URL or search keyword    |
| `photo`       | string | Custom photo credit text       |

### Image Source Priority

1. If `img` is a full URL (starts with http), it will be used directly
2. If `img` is a keyword and `VITE_PIXABAY` is configured in `.env`, it will search Pixabay
3. If no API key is configured, the layout will show a placeholder

## Troubleshooting

### Images not loading

1. Check browser console for error messages
2. Verify `VITE_PIXABAY` is set in `.env` (project root directory)
3. Ensure you've restarted the dev server after adding the API key
4. Check that your Pixabay API key is valid and has not exceeded rate limits

### CORS issues

If you encounter CORS errors when loading images, try:
- Using a different image source
- Configuring a proxy in your Vite config
