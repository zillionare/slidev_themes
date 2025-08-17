# slidev-addon-notecell

A Slidev addon that brings interactive Jupyter notebook cells to your presentations. Execute Python code, create visualizations, and demonstrate live coding directly in your slides.

## Features

- 🚀 **Interactive Code Execution** - Double-click code cells to execute Python code
- 📊 **Rich Output Support** - Display plots, tables, images, and HTML output
- 🔄 **Initialization Cells** - Auto-run setup code when slides load
- 📐 **Flexible Layouts** - Vertical and horizontal code/output arrangements
- 🎨 **Customizable Styling** - Control colors, sizes, and spacing
- 👨‍🏫 **Presenter Mode** - Safe execution with warnings in presenter view
- 🌙 **Theme Support** - Works with all Slidev themes
- ⚡ **Powered by Thebe** - Built on the robust Thebe Core library

## Installation

```bash
npm install slidev-addon-notecell
```

## Basic Usage

### 1. Add to your Slidev presentation

In your `slides.md` frontmatter:

```yaml
---
addons:
  - slidev-addon-notecell
---
```

### 2. Use the NoteCell component

```markdown
# My Slide

<NoteCell class="w-full h-60">
```python
print("Hello from Jupyter!")
result = 2 + 2
print(f"2 + 2 = {result}")
```
</NoteCell>
```

### 3. Double-click to execute

Double-click the code cell during your presentation to execute the code and see the output.

## Configuration

### Jupyter Server Setup

You need a running Jupyter server. The default configuration expects:

- **Base URL**: `/thebe/` (configurable via `baseUrl` prop)
- **Token**: `` (configurable via `token` prop)
- **Path**: `/tmp/` (configurable via `path` prop)

如果 baseURL 使用默认值，则你还需要在 vite.config.ts 中，添加代理:

```ts
export default defineConfig({
    server: {
        proxy: {
            '/thebe': {
                target: 'http://127.0.0.1:8080/path',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => {
                    // console.log('proxying:', path);
                    return path.replace(/^\/thebe/, '')
                }
            }
        }
    }
})
```
target 应该为JupyterLab 址到/lab/tree 之前的部分。比如，如果你能在 http://localhost:8080/course/fa/aaron/lab/tree/courseware/01.ipynb打开这个 notebook,那么，你就应该将 target 设置为 http://localhost:8080/course/fa/aaron

你也可以单独为每个 Notecell 设置 baseUrl，直接把它设置为绝对路径，比如 http://localhost:8080/course/fa/aaron。这种情况下，如果 jupyter lab 已设置为允许跨源访问，则可以不用代理。

### Component Props

| Prop          | Type    | Default          | Description                              |
| ------------- | ------- | ---------------- | ---------------------------------------- |
| `init`        | Boolean | `false`          | Auto-run cell when slide loads           |
| `layout`      | String  | `"vertical"`     | Layout: `"vertical"` or `"horizontal"`   |
| `hideOutput`  | Boolean | `false`          | Hide output initially                    |
| `maxOutput`   | Boolean | `false`          | Allow maximum output height              |
| `outputWidth` | String  | `"50%"`          | Width of output area (horizontal layout) |
| `outputMt`    | String  | `"-3.2rem"`      | Output margin top                        |
| `outputMl`    | String  | `"0"`            | Output margin left                       |
| `scaleImg`    | String  | `"100%"`         | Scale images in output                   |
| `color`       | String  | `"black"`        | Text color for output                    |
| `baseUrl`     | String  | `"/thebe/"`      | Jupyter server base URL                  |
| `token`       | String  | `"Qu@ntide2024"` | Authentication token                     |
| `path`        | String  | `"/tmp/"`        | Notebook file path                       |

## Examples

### Basic Code Execution

```markdown
<NoteCell class="w-full h-60">
```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(8, 4))
plt.plot(x, y)
plt.title('Sine Wave')
plt.show()
```
</NoteCell>
```

### Initialization Cell

```markdown
<!-- This runs automatically when the slide loads -->
<NoteCell init class="w-full h-40">
```python
import pandas as pd
df = pd.read_csv('data.csv')
print("Data loaded!")
```
</NoteCell>

<!-- This uses the initialized data -->
<NoteCell class="w-full h-60">
```python
print(df.head())
print(f"Dataset shape: {df.shape}")
```
</NoteCell>
```

### Horizontal Layout

```markdown
<NoteCell layout="horizontal" outputWidth="60%" class="w-full h-80">
```python
import seaborn as sns
import matplotlib.pyplot as plt

# Create visualization
fig, ax = plt.subplots(figsize=(6, 4))
sns.scatterplot(data=df, x='x', y='y', ax=ax)
plt.title('My Plot')
plt.show()
```
</NoteCell>
```

### Custom Styling

```markdown
<NoteCell 
  layout="horizontal" 
  outputWidth="55%" 
  scaleImg="80%" 
  color="#2563eb"
  class="w-full h-80"
>
```python
# Your code here
```
</NoteCell>
```

## Interactive Features

### Execution
- **Double-click** any code cell to execute
- **Toggle view** between code and output by double-clicking again
- **Status indicator** shows "runnable" or "running" state

### Presenter Mode
- Safe execution warnings in presenter view
- Prevents accidental code execution during presentation
- Prompts to run code in slide view instead

## Jupyter Server Configuration

### Local Development

```bash
# Start Jupyter server with token
jupyter lab --token=Qu@ntide2024 --allow-root --ip=0.0.0.0
```

### Docker Setup

```dockerfile
FROM jupyter/scipy-notebook

# Install additional packages
RUN pip install plotly seaborn

# Start with custom token
CMD ["jupyter", "lab", "--token=Qu@ntide2024", "--allow-root", "--ip=0.0.0.0"]
```

### Custom Configuration

```markdown
<NoteCell 
  baseUrl="http://localhost:8888/" 
  token="your-custom-token"
  path="/your/notebook/path/"
>
```python
# Your code
```
</NoteCell>
```

## Styling

### CSS Classes

The component uses these CSS classes that you can customize:

```css
.thebe-code {
  /* Code cell styling */
}

.output-wrapper {
  /* Output area styling */
}

.wrapper-all {
  /* Container styling */
}

.horizontal-layout {
  /* Horizontal layout modifications */
}
```

### Custom Themes

The component adapts to your Slidev theme automatically. You can override styles in your theme's CSS:

```css
.slidev-addon-notecell .thebe-code {
  background: var(--slidev-code-background);
  border-radius: 8px;
}

.slidev-addon-notecell .output-wrapper {
  color: var(--slidev-code-foreground);
}
```

## Troubleshooting

### Common Issues

1. **"Could not start thebe jupyter session"**
   - Check if Jupyter server is running
   - Verify `baseUrl` and `token` configuration
   - Ensure server allows cross-origin requests

2. **Code not executing**
   - Double-click the code cell
   - Check browser console for errors
   - Verify Jupyter server connectivity

3. **Output not displaying**
   - Check if `hideOutput` is set to `true`
   - Verify the code produces output
   - Check for JavaScript errors

### Debug Mode

Enable debug logging:

```javascript
// In browser console
localStorage.setItem('thebe-debug', 'true')
```

## Development

### Setup

```bash
git clone <repository-url>
cd slidev-addon-notecell
npm install
```

### Testing

```bash
# Run example presentation
npm run dev

# Build for production
npm run build
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Dependencies

- **thebe-core**: Jupyter integration
- **crypto-js**: Cryptographic utilities
- **Vue 3**: Component framework
- **Slidev**: Presentation framework

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/yourusername/slidev-addon-notecell)
- 🐛 [Issue Tracker](https://github.com/yourusername/slidev-addon-notecell/issues)
- 💬 [Discussions](https://github.com/yourusername/slidev-addon-notecell/discussions)

## Acknowledgments

- Built with [Thebe Core](https://github.com/executablebooks/thebe)
- Inspired by Jupyter Notebooks
- Designed for [Slidev](https://sli.dev) presentations
