# Slidev Addon: Mouse Trail Pen

A beautiful mouse trail pen effect addon for Slidev presentations that creates smooth, animated pen-like trails following your cursor.

## Features

- 🎨 **Smooth Animation**: Bezier curves for natural movement
- 🌈 **Gradient Effect**: Beautiful color transitions
- ⚡ **Performance Optimized**: Uses requestAnimationFrame
- 🎯 **Auto Fade**: Trail points disappear naturally
- 🔧 **Zero Configuration**: Works out of the box
- 📱 **Responsive**: Adapts to window resizing

## Installation

```bash
npm install slidev-addon-mouse-trail-pen
```

## Usage

Add the addon to your Slidev presentation frontmatter:

```yaml
---
addons:
  - slidev-addon-mouse-trail-pen
---
```

That's it! The mouse trail effect will be active across all slides in your presentation.

## How It Works

The addon automatically:

1. Creates a canvas overlay covering the entire screen
2. Tracks mouse movement and stores trail points
3. Renders smooth curves using quadratic bezier curves
4. Applies gradients for visual appeal
5. Manages performance by limiting trail points and using efficient rendering

## Technical Details

- **Canvas-based rendering** for smooth performance
- **Fixed positioning** to cover entire viewport
- **Pointer events disabled** so it doesn't interfere with interactions
- **Automatic cleanup** when navigating away
- **Responsive design** adapts to window resizing

## Configuration

### Global Configuration (Frontmatter)

Configure the mouse trail globally in your Slidev frontmatter:

```yaml
---
theme: default
addons:
  - slidev-addon-mouse-trail-pen
mouseTrailPen:
  preset: ink
  maxPoints: 80
  lineWidth: 5
  fadeDuration: 1500
  enabled: true
---
```

### Using Color Presets

Add a preset color to any slide by including a div with the `data-mouse-trail-preset` attribute:

```html
<div data-mouse-trail-preset="rainbow"></div>
```

**Available Presets:**
- `blue` - Classic blue trail (default)
- `green` - Vibrant green
- `purple` - Royal purple
- `red` - Bold red
- `orange` - Warm orange
- `pink` - Bright pink
- `rainbow` - Multi-color rainbow
- `fire` - Orange-red fire effect
- `ocean` - Blue ocean depths
- `ink` - Classic black and white ink pen

### Custom Configuration

For advanced customization, use the `data-mouse-trail-config` attribute with JSON:

```html
<div data-mouse-trail-config='{"maxPoints": 80, "lineWidth": 5, "fadeDuration": 1500, "colors": ["rgba(255, 0, 255, 0)", "rgba(0, 255, 255, 0.8)", "rgba(255, 255, 0, 1)"]}'></div>
```

**Configuration Options:**
- `preset` - Color preset name (blue, green, purple, red, orange, pink, rainbow, fire, ocean, ink)
- `maxPoints` - Number of trail points (default: 50)
- `fadeDuration` - How long trails last in ms (default: 1000)
- `lineWidth` - Thickness of the trail (default: 3)
- `colors` - Array of RGBA colors for gradient (default: blue gradient)
- `enabled` - Enable/disable the effect (default: true)

### Examples

**Global Ink Trail:**
```yaml
---
addons:
  - slidev-addon-mouse-trail-pen
mouseTrailPen:
  preset: ink
  lineWidth: 4
---
```

**Per-slide Green Trail:**
```md
# My Slide
<div data-mouse-trail-preset="green"></div>
Content here...
```

**Custom Purple-to-Gold:**
```md
# My Slide
<div data-mouse-trail-config='{"colors": ["rgba(147, 51, 234, 0)", "rgba(234, 179, 8, 1)"]}'></div>
Content here...
```

**Disable on Specific Slide:**
```yaml
---
mouseTrailPen:
  enabled: false
---
```

## Development

To develop this addon locally:

```bash
# Clone the repository
git clone https://github.com/zillionare/slidev-addon-mouse-trail-pen
cd slidev-addon-mouse-trail-pen

# Install dependencies
npm install

# Run the example
npm run dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
