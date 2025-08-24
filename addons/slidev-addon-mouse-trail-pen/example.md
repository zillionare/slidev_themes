---
theme: default
background: '#0a0a0a'
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: Mouse Trail Pen Demo
mdc: true
mouseTrail:
  preset: rainbow
  lineWidth: 3
  maxPoints: 50
---

# Mouse Trail Pen Demo

<div data-mouse-trail-preset="ink" style="display: none;"></div>

Move your mouse around to see the **blue pen trail** effect!

---

# Green Trail

<div data-mouse-trail-preset="green" style="display: none;"></div>

This page uses a **green trail**. Notice how the color changes!

---

# Rainbow Trail

<div data-mouse-trail-preset="rainbow" style="display: none;"></div>

Experience the **rainbow trail** with multiple colors!

---

# Fire Trail

<div data-mouse-trail-preset="fire" style="display: none;"></div>

Feel the heat with this **fire-themed trail**!

---

# Ocean Trail

<div data-mouse-trail-preset="ocean" style="display: none;"></div>

Dive into the **ocean depths** with blue gradients!

---

# Ink Trail

<div data-mouse-trail-preset="ink" style="display: none;"></div>

Experience the **classic ink pen** with black and white gradients!

---

# Custom Configuration

<div data-mouse-trail-config='{"maxPoints": 80, "lineWidth": 5, "fadeDuration": 1500, "colors": ["rgba(255, 0, 255, 0)", "rgba(0, 255, 255, 0.8)", "rgba(255, 255, 0, 1)"]}' style="display: none;"></div>

This page uses **custom settings**:
- More trail points (80)
- Thicker lines (5px)
- Longer fade duration (1.5s)
- Custom magenta-cyan-yellow gradient

---

# Available Presets

You can use these preset colors:

- `blue` - Classic blue trail
- `green` - Vibrant green
- `purple` - Royal purple
- `red` - Bold red
- `orange` - Warm orange
- `pink` - Bright pink
- `rainbow` - Multi-color rainbow
- `fire` - Orange-red fire effect
- `ocean` - Blue ocean depths
- `ink` - Classic black and white ink pen

