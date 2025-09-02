# Slidev Addon Colors

A Slidev addon for custom color palettes.

## Features

- 🎨 **Multiple Color Palettes**: Academic, Business and Valentine themes
- 🎯 **Easy Integration**: Simple HTML class attribute to apply themes
- 🎭 **Flexible Styling**: CSS variables for easy customization
- 📱 **Responsive Design**: Works on all screen sizes

## Installation

```bash
npm install slidev-addon-array
```

## Usage

Add the addon to your `slides.md` frontmatter:

```yaml
---
addons:
  - slidev-addon-colors
---
```

Then apply color palettes using the `htmlAttrs` property:

```yaml
---
htmlAttrs:
  class: palette-academic
---
```

Or for business theme:

```yaml
---
htmlAttrs:
  class: palette-business
---
```

Or for valentine theme:

```yaml
---
htmlAttrs:
  class: palette-valentine
---
```

## Color Palettes

### Academic Palette

- `--primary`: #2563eb (深蓝色)
- `--secondary`: #7c3aed (紫色)
- `--accent`: #0d9488 (青色)
- `--success`: #16a34a (绿色)
- `--tertiary`: #ea580c (橙色)

### Business Palette

- `--primary`: #1e40af (深蓝色 - 专业、可靠)
- `--secondary`: #0f766e (深青色 - 稳重、信任)
- `--accent`: #c2410c (深橙色 - 活力、热情)
- `--success`: #15803d (深绿色 - 成功、增长)
- `--tertiary`: #9333ea (紫色 - 创意、智慧)

### Valentine Palette (Inspired by daisyUI)

- `--primary`: #e96d7b (粉红色)
- `--secondary`: #a991d4 (紫色)
- `--accent`: #fda4af (浅粉红色)
- `--success`: #8dcc93 (浅绿色)
- `--tertiary`: #eea8a9 (浅粉红色)

## Examples

Apply the academic color palette to your slides:

```md
---
htmlAttrs:
  class: palette-academic
---

# This is a heading
## This is a subheading

This text uses the default color.

This is <span class="success">success</span> text.
This is <span class="highlight">highlighted</span> text.
```

Apply the valentine color palette to your slides:

```md
---
htmlAttrs:
  class: palette-valentine
---

# This is a heading
## This is a subheading

This text uses the default color.

This is <span class="success">success</span> text.
This is <span class="highlight">highlighted</span> text.
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
