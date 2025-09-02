# Slidev Addon Palette

A Slidev addon for custom color palettes.

## Features

- 🎨 **Multiple Color Palettes**: 30+ DaisyUI-inspired themes
- 🎯 **Easy Integration**: Simple HTML class attribute to apply themes
- 🎭 **Flexible Styling**: CSS variables for easy customization
- 📱 **Responsive Design**: Works on all screen sizes

## Installation

```bash
npm install slidev-addon-palette
```

## Usage

Add the addon to your `slides.md` frontmatter:

```yaml
---
addons:
  - slidev-addon-palette
---
```

Then apply color palettes using the `htmlAttrs` property:

```yaml
---
htmlAttrs:
  class: academic
---
```

Or for business theme:

```yaml
---
htmlAttrs:
  class: business
---
```

Or for valentine theme:

```yaml
---
htmlAttrs:
  class: valentine
---
```

## Available Themes

This addon provides over 30 themes inspired by [DaisyUI](https://daisyui.com/). Each theme is implemented with a consistent set of CSS variables for colors, backgrounds, borders, and text.

### Default Theme
The default theme provides a clean, professional look with blue as the primary color.

### Light-Based Themes
- **light** - Clean white background with dark text
- **cupcake** - Soft pastel colors with rounded elements
- **bumblebee** - Yellow and amber color scheme
- **emerald** - Green-based theme
- **corporate** - Professional grayscale theme
- **retro** - Vintage-inspired color palette
- **valentine** - Romantic pink and purple theme
- **garden** - Nature-inspired green theme
- **aqua** - Water-themed blue colors
- **lofi** - Low fidelity design with grayscale
- **pastel** - Soft pastel color scheme
- **fantasy** - Purple-based theme
- **wireframe** - Minimalist black and white
- **cmyk** - Printing color model theme
- **lemonade** - Citrus-inspired yellow theme
- **caramellatte** - Coffee-inspired brown and caramel theme

### Dark Themes
- **dark** - Dark background with light text
- **synthwave** - Neon cyberpunk theme
- **cyberpunk** - Vibrant neon colors
- **halloween** - Orange and black theme
- **forest** - Dark green nature theme
- **black** - Pure black background
- **luxury** - Gold and silver luxury theme
- **dracula** - Popular dark theme with purple
- **autumn** - Fall colors with orange and brown
- **business** - Professional dark theme
- **acid** - Bright fluorescent theme
- **night** - Dark blue theme
- **coffee** - Coffee shop brown theme
- **winter** - Cool blue theme
- **dim** - Dimmed dark theme
- **nord** - Nordic-inspired cool theme
- **sunset** - Warm orange and red theme
- **abyss** - Deep blue dark theme
- **silk** - Fluorescent light theme

## Theme Usage Guidelines

### When to use light themes:
- **default/cupcake/bumblebee**: General presentations, educational content
- **emerald/garden**: Environmental topics, health-related content
- **corporate**: Business presentations, professional settings
- **retro**: Creative projects, vintage-themed presentations
- **valentine**: Romantic themes, special occasions
- **aqua**: Water-related topics, summer presentations
- **lofi**: Technical presentations, minimalist designs
- **pastel/fantasy**: Creative works, children's content
- **wireframe**: Design mockups, prototyping
- **cmyk**: Printing-related presentations
- **lemonade**: Food-related topics, summer themes
- **caramellatte**: Food presentations, cozy themes

### When to use dark themes:
- **dark**: General dark mode preference
- **synthwave/cyberpunk**: Technology, futuristic themes
- **halloween**: October presentations, horror themes
- **forest**: Nature topics, environmental themes
- **black**: High contrast presentations, dramatic effect
- **luxury**: Premium products, high-end presentations
- **dracula**: Developer-focused content, coding presentations
- **autumn**: Fall-themed presentations
- **business**: Professional dark presentations
- **acid**: Creative, artistic presentations
- **night**: Evening presentations, astronomy topics
- **coffee**: Café-related content, casual meetings
- **winter**: Cold-weather themes, holiday presentations
- **dim**: Low-light environments
- **nord**: Developer environments, clean dark themes
- **sunset**: Evening themes, warm presentations
- **abyss**: Deep sea topics, mysterious themes
- **silk**: Modern presentations, fluorescent themes

## Examples

Apply the academic color palette to your slides:

```md
---
htmlAttrs:
  class: academic
---

# This is a heading
## This is a subheading

This text uses the default color.

This is <span class="text-success">success</span> text.
This is <span class="highlight">highlighted</span> text.
```

Apply the valentine color palette to your slides:

```md
---
htmlAttrs:
  class: valentine
---

# This is a heading
## This is a subheading

This text uses the default color.

This is <span class="text-success">success</span> text.
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
cd slidev-addon-palette

# Install dependencies
npm install

# Start development server
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License