# Slidev Card Addon

A beautiful and flexible card component for Slidev presentations that combines images, titles, and content with various styling options.

## Features

- 🖼️ **Image Support** - Display images with various frame styles
- 📐 **Flexible Layouts** - Landscape and portrait orientations
- 🎨 **Custom Frames** - Rectangle, circle, ellipse, diamond, and gem shapes
- 🎯 **Customizable Styling** - Colors, borders, shadows, and more
- 📱 **Responsive Design** - Adapts to different screen sizes
- ✨ **Hover Effects** - Smooth animations and interactions

## Installation

```bash
npm install slidev-addon-card
```

## Basic Usage

### 1. Add to your Slidev presentation

In your `slides.md` frontmatter:

```yaml
---
addons:
  - slidev-addon-card
---
```

### 2. Use the Card component

```markdown
# My Slide

<Card 
  title="Beautiful Card" 
  img="https://picsum.photos/400/300?random=1">
  
This is the card content. You can write any markdown or HTML here.

</Card>
```

## Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | String | Required | Card title text |
| `img` | String | Required | Image URL |
| `orientation` | String | `landscape` | Card layout: `landscape` or `portrait` |
| `frame` | String | `rectangle` | Image frame style |
| `backgroundColor` | String | `#ffffff` | Card background color |
| `borderColor` | String | `#e0e0e0` | Card border color |
| `titleColor` | String | `#333333` | Title text color |
| `textColor` | String | `#666666` | Content text color |
| `borderRadius` | String | `12px` | Card border radius |
| `shadow` | Boolean | `true` | Enable/disable drop shadow |

## Frame Styles

The `frame` property supports the following values:

- **`rectangle`** - Standard rectangular frame (default)
- **`circle`** - Circular frame, perfect for profile pictures
- **`ellipse`** - Elliptical frame for a softer look
- **`lens`** - Lens-shaped frame that adapts to container proportions
- **`diamond`** - Diamond-shaped frame for geometric appeal
- **`gem`** - Irregular gem shape that's unique each time

## Examples

### Landscape Card (Default)

```markdown
<Card 
  title="Landscape Card" 
  img="https://picsum.photos/400/300?random=1">
  
This is a landscape-oriented card with default styling.

</Card>
```

### Portrait Card

```markdown
<Card 
  title="Portrait Card" 
  img="https://picsum.photos/300/400?random=2"
  orientation="portrait">
  
This card uses portrait orientation.

</Card>
```

### Circular Frame

```markdown
<Card 
  title="Profile Card" 
  img="https://picsum.photos/400/400?random=3"
  frame="circle">
  
Perfect for profile pictures or circular designs.

</Card>
```

### Custom Styling

```markdown
<Card 
  title="Custom Card" 
  img="https://picsum.photos/400/300?random=4"
  frame="diamond"
  backgroundColor="#f8f9fa"
  borderColor="#007bff"
  titleColor="#007bff"
  textColor="#495057"
  borderRadius="20px">
  
Fully customized card with diamond frame and custom colors.

</Card>
```

### Multiple Cards Layout

```markdown
<div style="display: flex; gap: 20px; flex-wrap: wrap;">

<Card 
  title="Card 1" 
  img="https://picsum.photos/300/200?random=5"
  style="flex: 1; min-width: 250px;">
  
First card content.

</Card>

<Card 
  title="Card 2" 
  img="https://picsum.photos/300/200?random=6"
  frame="circle"
  style="flex: 1; min-width: 250px;">
  
Second card content.

</Card>

</div>
```

## Responsive Design

The card component automatically adapts to different screen sizes:

- On mobile devices, landscape cards automatically switch to portrait layout
- Images maintain their aspect ratio and clip properly
- Text content remains readable at all sizes

## Styling Tips

1. **Color Coordination**: Use colors that match your presentation theme
2. **Image Quality**: Use high-resolution images for better visual impact
3. **Content Length**: Keep content concise for better readability
4. **Frame Selection**: Choose frames that complement your content type
5. **Layout Planning**: Consider using multiple cards for comparison or showcase

## Browser Support

This addon works with all modern browsers that support:
- CSS Grid and Flexbox
- CSS clip-path property
- Vue 3 composition API

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - see LICENSE file for details.

## Changelog

### v1.0.0
- Initial release
- Basic card functionality
- Multiple frame styles
- Responsive design
- Customizable styling options