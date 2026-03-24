# Slidev Addon Array

A Slidev addon for displaying arrays with customizable layout and styling.

## Features

- 🎨 **Customizable Layout**: Support both horizontal and vertical array layouts
- 🏷️ **Flexible Labels**: Position labels on any side (top, bottom, left, right)
- 🎯 **Custom Styling**: Apply custom CSS classes to individual cells
- 📱 **Responsive Design**: Adapts to different screen sizes
- ✨ **Smooth Animations**: Built-in hover effects and slide-in animations
- 🎭 **Theme Integration**: Automatically uses Slidev theme colors

## Installation

```bash
npm install slidev-addon-array
```

## Usage

Add the addon to your `slides.md` frontmatter:

```yaml
---
addons:
  - slidev-addon-array
---
```

Then use the `<Array>` component in your slides:

```vue
<Array 
  data="1,2,3,4,5" 
  label="My Array" 
  labelPos="left" 
  flag="horizontal" 
  cell="custom-cell"
  class="mt-10"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `string` | **required** | Comma-separated string of array elements |
| `label` | `string` | `''` | Label text to display alongside the array |
| `flag` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the array |
| `labelPos` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'left'` | Position of the label relative to the array |
| `cell` | `string` | `'default-cell'` | CSS class name for individual array cells |

## Examples

### Basic Horizontal Array

```vue
<Array data="A,B,C,D,E" label="Letters" />
```

### Vertical Number Array

```vue
<Array 
  data="10,20,30,40,50" 
  label="Numbers" 
  flag="vertical" 
  labelPos="top"
/>
```

### Custom Styled Array

```vue
<Array 
  data="🍎,🍌,🍊,🍇,🍓" 
  label="Fruits" 
  labelPos="bottom"
  cell="fruit-cell"
  class="text-2xl"
/>
```

### Programming Array Example

```vue
<Array 
  data="int,string,boolean,float,char" 
  label="Data Types" 
  labelPos="right" 
  flag="vertical"
  class="font-mono"
/>
```

## Custom Styling

You can customize the appearance by:

1. **Using the `cell` prop** to apply custom CSS classes:

```vue
<Array data="1,2,3" cell="my-custom-cell" />
```

```css
.my-custom-cell {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border-radius: 50%;
  font-weight: bold;
}
```

2. **Using CSS custom properties** to override theme colors:

```css
.slidev-layout {
  --slidev-theme-primary: #ff6b6b;
  --slidev-theme-background: #f8f9fa;
  --slidev-theme-text: #2d3748;
}
```

3. **Applying utility classes** directly to the component:

```vue
<Array 
  data="1,2,3" 
  class="text-3xl font-bold text-blue-500"
/>
```

## Comparison with Numbers Component

This `Array` component differs from the `Numbers` component in several ways:

| Feature | Array Component | Numbers Component |
|---------|----------------|-------------------|
| **Layout Engine** | CSS Grid (modern, flexible) | HTML Table (traditional) |
| **Styling** | CSS custom properties + theme integration | Basic CSS styling |
| **Animations** | Built-in slide-in animations and hover effects | No animations |
| **Responsiveness** | Fully responsive with breakpoints | Limited responsiveness |
| **Customization** | Extensive prop validation and custom cell classes | Basic customization |
| **Performance** | Optimized with computed properties | Standard Vue reactivity |
| **Accessibility** | Better semantic structure | Table-based structure |

## Development

To develop this addon locally:

```bash
# Clone the repository
git clone <your-repo-url>
cd slidev-addon-array

# Install dependencies
npm install

# Start development server
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License