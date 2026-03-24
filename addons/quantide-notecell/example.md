---
theme: default
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## Slidev NoteCell Addon Demo
  
  Interactive Jupyter notebook cells in your Slidev presentations.
drawings:
  persist: false
transition: slide-left
title: NoteCell Addon Demo
mdc: true
---

# NoteCell Addon Demo

Interactive Jupyter notebook cells in Slidev

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# Configuration

### 1. Add to your Slidev presentation

In your `slides.md` frontmatter:

```yaml
---
addons:
  - slidev-addon-notecell
---
```

### 2. start a jupyter lab server

start a jupyter server and try to access some notebooks. Remember the url to the notebook, for example: `http://localhost:8888/path/to/lab/tree/notebooks/example.ipynb`. We'll need the baseUrl (i.e., http://localhost:8888/path/to in this case) later.

---

# Configuration

### 3. configure vite.config.ts

We can use global configure by configuring vite.config.ts as:

```ts
export default defineConfig({
    server: {
        proxy: {
            '/thebe': {
                target: 'http://localhost:8888/path/to',
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

then all notecell will be proxied to your jupyterlab server

---

# Configuration

### 4. convigure via NoteCell

Or, we can configure each notecell without touch vite.config.ts:

````md

<NoteCell baseUrl="http://localhost:8888/path/to">

``python
print("Hello from Jupyter!")
print("This is an interactive code cell")
``
</NoteCell>

````

---
layout: two-cols
---

# Basic Usage

````md
<NoteCell class="w-full h-80">

``python
print("Hello from Jupyter!")
print("This is an interactive code cell")

# Simple calculation
result = 2 + 2
print(f"2 + 2 = {result}")
``
</NoteCell>
````

**Use three backticks to wrap your code, Not two!!!**

::right::

Double-click the "runnable" button to execute:

<NoteCell class="w-full h-30">

```python
print("Hello from Jupyter!")
print("This is an interactive code cell")

# Simple calculation
result = 2 + 2
print(f"2 + 2 = {result}")
```
</NoteCell>

The runnable button contains two status: runnable and running.

When it's running, just wait.

---

# Data Visualization

Create plots and visualizations:

<NoteCell class="w-full h-80">
```python
import matplotlib.pyplot as plt
import numpy as np

# Generate sample data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create plot
plt.figure(figsize=(8, 4))
plt.plot(x, y, 'b-', linewidth=2)
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.show()
```
</NoteCell>

---
layout: two-cols
---

# Initialization Cell

Use `init` prop for setup code (runs automatically):

![](https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/2025/08/20250819101732.png)

::right::

<br/>
<br/>

The rest (the code you want to demo/run):

<NoteCell class="w-full h-80">
```python
# Use the initialized data
print("Our dataset:")
print(df)
print(f"\nAverage age: {df['age'].mean():.1f}")
print(f"Average score: {df['score'].mean():.1f}")
```
</NoteCell>

Double click on the "runnable" button, there you go.

---

# Horizontal Layout

Use `layout="horizontal"` for side-by-side view:

<NoteCell layout="horizontal" outputWidth="60%" class="w-full h-80">
```python
import matplotlib.pyplot as plt
import seaborn as sns

# Create a more complex visualization
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

# Bar plot
ax1.bar(df['name'], df['age'])
ax1.set_title('Age by Person')
ax1.set_ylabel('Age')

# Scatter plot
ax2.scatter(df['age'], df['score'], s=100, alpha=0.7)
ax2.set_title('Age vs Score')
ax2.set_xlabel('Age')
ax2.set_ylabel('Score')

plt.tight_layout()
plt.show()
```
</NoteCell>

---

# Configuration Options

## Available Props:

- `init`: Run cell automatically on slide load
- `layout`: "vertical" (default) or "horizontal"
- `hideOutput`: Hide output initially
- `maxOutput`: Allow maximum output height
- `outputWidth`: Width of output area (horizontal layout)
- `scaleImg`: Scale images in output
- `color`: Text color for output
- `baseUrl`: Jupyter server base URL
- `token`: Authentication token
- `path`: Notebook file path

---

# Advanced Example

Combining multiple features:

<NoteCell 
  layout="horizontal" 
  outputWidth="55%" 
  scaleImg="80%" 
  color="#2563eb"
  class="w-full h-80"
>
```python
# Advanced data analysis
import plotly.graph_objects as go
import plotly.express as px

# Create interactive plot
fig = px.scatter(
    df, 
    x='age', 
    y='score', 
    size='age',
    color='name',
    title='Interactive Scatter Plot',
    hover_data=['name']
)

fig.update_layout(
    width=400,
    height=300,
    margin=dict(l=0, r=0, t=30, b=0)
)

fig.show()
```
</NoteCell>

---

# Thank You!

## Features Summary:

✅ **Interactive Code Execution** - Double-click to run  
✅ **Multiple Layouts** - Vertical and horizontal  
✅ **Initialization Cells** - Auto-run setup code  
✅ **Rich Output** - Plots, tables, and media  
✅ **Customizable Styling** - Colors, sizes, and spacing  
✅ **Presenter Mode** - Safe execution warnings  

<div class="pt-12">
  <span class="text-sm opacity-50">
    Powered by Thebe Core and Jupyter
  </span>
</div>
