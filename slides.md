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
title: NoteCell
layout: two-cols
---


如何运行 Python 代码并得到结果？

````md
<NoteCell>

```python
print("Hello from Jupyter!")
print("This is an interactive code cell")
# Simple calculation
result = 2 + 2
print(f"2 + 2 = {result}")
```
</NoteCell>
````

::right::

<NoteCell class="w-full h-80">

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

