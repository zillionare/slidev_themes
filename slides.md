---
title: 简洁的文案 非凡的表达
lineNumbers: true
drawings:
  persist: false
  syncAll: true
addons:
  - slidev-addon-card
  - slidev-addon-notecell
  - slidev-addon-array
  - slidev-addon-interactive-table
  - slidev-addon-mouse-trail-pen
---

---

# NoteCell
 
如何运行 Python 代码并得到结果？我们需要使用 NoteCell 这个 addon。

<NoteCell class="w-full h-80" baseUrl="http://127.0.0.1:8080/course/fa/aaron/">

```python
print("Hello from Jupyter!")
print("This is an interactive code cell")
# Simple calculation
result = 2 + 2
print(f"2 + 2 = {result}")
```
</NoteCell>

---

# Basic Usage

Double-click the code cell to execute:

<NoteCell class="w-full h-80" baseUrl="http://127.0.0.1:8080/course/fa/aaron/">

```python
print("Hello from Jupyter!")
print("This is an interactive code cell")

# Simple calculation
result = 2 + 2
print(f"2 + 2 = {result}")
```
</NoteCell>

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

# Initialization Cell

Use `init` prop for setup code (runs automatically):

<NoteCell class="w-full h-80">
```python
# This cell runs automatically when the slide loads
import pandas as pd
import numpy as np

# Create sample dataset
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'score': [85, 92, 78, 96]
}
df = pd.DataFrame(data)
print("Dataset initialized!")
```
</NoteCell>

<NoteCell class="w-full h-80">
```python
# Use the initialized data
print("Our dataset:")
print(df)
print(f"\nAverage age: {df['age'].mean():.1f}")
print(f"Average score: {df['score'].mean():.1f}")
```
</NoteCell>

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
