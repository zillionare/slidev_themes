---
theme: default
background: https://source.unsplash.com/1920x1080/?gradient
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Addon Array Examples
  
  Demonstration of the Array component with various configurations.
drawings:
  persist: false
transition: slide-left
title: Array Component Examples
addons:
  - slidev-addon-array
---

# Array Component Examples

Demonstrating the **slidev-addon-array** with various configurations

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# Basic Horizontal Array

Simple horizontal array with left label:

<Array 
  data="1,2,3,4,5" 
  label="Numbers" 
  class="mt-10"
/>

<br>

With custom styling:

<Array 
  data="A,B,C,D,E" 
  label="Letters" 
  labelPos="top"
  class="mt-10 text-2xl"
/>

---

# Vertical Arrays

Vertical layout with different label positions:

<div class="grid grid-cols-2 gap-8 mt-10">
  <div>
    <h3>Left Label</h3>
    <Array 
      data="10,20,30,40" 
      label="Values" 
      flag="vertical" 
      labelPos="left"
      class="mt-4"
    />
  </div>
  
  <div>
    <h3>Right Label</h3>
    <Array 
      data="α,β,γ,δ" 
      label="Greek" 
      flag="vertical" 
      labelPos="right"
      class="mt-4"
    />
  </div>
</div>

---

# Custom Styled Arrays

Using custom CSS classes and emojis:

<Array 
  data="🍎,🍌,🍊,🍇,🍓" 
  label="Fruits" 
  labelPos="bottom"
  class="mt-10 text-4xl"
/>

<br>

<Array 
  data="React,Vue,Angular,Svelte" 
  label="Frameworks" 
  labelPos="top"
  class="mt-10 font-mono text-sm"
/>

---

# Programming Examples

Data structures and algorithms:

<div class="space-y-8 mt-10">
  <div>
    <h3>Array Index Example</h3>
    <Array 
      data="arr[0],arr[1],arr[2],arr[3],arr[4]" 
      label="Array Access" 
      class="font-mono text-sm"
    />
  </div>
  
  <div>
    <h3>Stack Operations</h3>
    <Array 
      data="push(),pop(),peek(),isEmpty()" 
      label="Stack Methods" 
      flag="vertical" 
      labelPos="left"
      class="font-mono text-sm"
    />
  </div>
</div>

---

# Responsive Design

The arrays automatically adapt to different screen sizes:

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
  <Array 
    data="Mobile,Tablet,Desktop,TV" 
    label="Devices" 
    class="text-lg"
  />
  
  <Array 
    data="XS,SM,MD,LG,XL" 
    label="Breakpoints" 
    flag="vertical" 
    labelPos="right"
    class="text-lg"
  />
</div>

---

# Animation Demo

Arrays have built-in animations:

<div class="mt-10 space-y-8">
  <Array 
    data="Loading,Processing,Complete" 
    label="Status" 
    class="text-xl"
  />
  
  <Array 
    data="Step 1,Step 2,Step 3,Step 4" 
    label="Process" 
    labelPos="top" 
    class="text-lg"
  />
</div>

<div class="mt-8 text-sm opacity-75">
  Hover over the array elements to see the interaction effects!
</div>

---

# Thank You!

<div class="text-center mt-20">
  <h2>🎉 slidev-addon-array</h2>
  <p class="mt-4 text-lg opacity-75">
    A flexible and customizable array component for Slidev presentations
  </p>
  
  <div class="mt-8">
    <Array 
      data="Thank,You,For,Using,This,Addon!" 
      label="" 
      class="text-2xl"
    />
  </div>
</div>

<style>
h3 {
  @apply text-lg font-semibold mb-2 text-blue-600;
}
</style>