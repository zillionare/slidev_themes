---
theme: default
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: Mouse Trail Pen Demo
mdc: true
mouseTrail:
  preset: rainbow
  lineWidth: 10
  maxPoints: 50
  triggerKey: none  # 可选值: none, alt, ctrl, shift, meta, 或任意键名
---

Move your mouse around while holding **Alt** key to see the pen trail effect!

**Trigger Key Options:**
- `alt` (default): Hold Alt key to draw
- `ctrl`: Hold Ctrl key to draw  
- `shift`: Hold Shift key to draw
- `meta`: Hold Cmd/Win key to draw
- `none`: Always draw (no key required)
- Any key name: e.g., `space`, `a`, `1`, etc.

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

# Always On Trail (No Key Required)

<div data-mouse-trail-config='{"triggerKey": "none", "preset": "fire"}' style="display: none;"></div>

This page has **always-on trail** - no key press required!
Just move your mouse to see the fire trail.

---

# Ctrl Key Trigger

<div data-mouse-trail-config='{"triggerKey": "ctrl", "preset": "ocean"}' style="display: none;"></div>

Hold **Ctrl** key and move mouse to see the ocean trail!

---

# Space Key Trigger

<div data-mouse-trail-config='{"triggerKey": "space", "preset": "purple"}' style="display: none;"></div>

Hold **Space** key and move mouse to see the purple trail!

---

# Explosion Animation Demo

<div data-mouse-trail-config='{"explosionEnabled": true, "explosionParticles": 12, "explosionDuration": 1000, "explosionSize": 30, "preset": "fire", "fadeDuration": 2000}' style="display: none;"></div>

Watch the **explosion effects** when trail points disappear!
- Enhanced particle count (12 particles)
- Longer explosion duration (1s)
- Larger explosion size (30px)
- Extended trail fade time (2s)

---

# Subtle Explosion Effect

<div data-mouse-trail-config='{"explosionEnabled": true, "explosionParticles": 6, "explosionDuration": 600, "explosionSize": 15, "preset": "ocean"}' style="display: none;"></div>

A more **subtle explosion** with fewer particles and shorter duration.

---

# No Explosion Mode

<div data-mouse-trail-config='{"explosionEnabled": false, "preset": "rainbow"}' style="display: none;"></div>

Trail points **fade away smoothly** without explosion effects.

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

## Explosion Animation Options

- `explosionEnabled` - Enable/disable explosion effects (default: true)
- `explosionParticles` - Number of particles per explosion (default: 8)
- `explosionDuration` - How long explosions last in ms (default: 800)
- `explosionSize` - Size of explosion particles (default: 20)

