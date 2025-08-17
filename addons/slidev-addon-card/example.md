---
theme: default
title: Card Addon Examples
info: |
  ## Slidev Card Addon
  
  Beautiful cards with images, titles, and content
components:
  Card: './components/Card.vue'
---

# Card Addon Examples

Demonstrating various card styles and configurations

---

# Basic Landscape Card

<Card :width="400"
  title="Beautiful Landscape" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg">
  
This is a basic landscape card with a rectangular frame. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

</Card>

---

# Portrait Card

<Card width="250"
  title="Portrait Style" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  orientation="portrait">
  
This card uses portrait orientation, perfect for vertical images and content. The layout automatically adjusts to show the image on top.

</Card>

---

# Circle Frame

<Card width="400"
  title="Circular Image" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  frame="circle">
  
This card features a circular image frame, great for profile pictures or artistic presentations.

</Card>

---

# Circle Frame Portrait

<Card :width="250"
  title="Circular Image" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  orientation="portrait"
  frame="circle">
  
This card features a circular image frame, great for profile pictures or artistic presentations.

</Card>
---

# Diamond Frame

<Card 
  title="Diamond Shape" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  frame="diamond"
  backgroundColor="#f8f9fa"
  borderColor="#6c757d">
  
A diamond-shaped frame adds geometric interest to your presentations. Custom colors make it stand out.

</Card>

---

# Ellipse Frame

<Card 
  title="Elliptical Design" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  frame="ellipse"
  titleColor="#007bff"
  textColor="#495057">
  
Elliptical frames provide a softer alternative to circles, with customizable title and text colors.

</Card>

---

# Lens Frame

<Card 
  title="Lens Effect" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  frame="lens"
  titleColor="#6f42c1"
  textColor="#6c757d">
  
The lens frame creates an adaptive oval shape that follows the container's proportions, like a camera lens.

</Card>

---

# Gem Frame (Random)

<Card 
  title="Unique Gem Shape" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  frame="gem"
  backgroundColor="#fff3cd"
  borderColor="#ffc107">
  
The gem frame creates a unique, irregular shape that's different every time. Perfect for adding visual interest!

</Card>

---

# maple leaf

<Card 
  title="mapleleaf Shape"
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  frame="mapleleaf">

Lorem ipsum Swimmer used a Quick Ball to catch Pikachu. Weezing is a Poison Gas Pokémon. Team Aqua Grunt used a Dream Ball to catch Wartortle. Bulbasaur evolved into Ivysaur. Baker gave a Yache Berry to Seel. 
</Card>

---

# teardrop

<Card 
  title="teardrop Shape"
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  frame="teardrop">

Lorem ipsum Swimmer used a Quick Ball to catch Pikachu. Weezing is a Poison Gas Pokémon. Team Aqua Grunt used a Dream Ball to catch Wartortle. Bulbasaur evolved into Ivysaur. Baker gave a Yache Berry to Seel. 
</Card>

---

# Custom Styling

<Card 
  title="Styled Card" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg"
  backgroundColor="#f0f8ff"
  borderColor="#4169e1"
  titleColor="#191970"
  textColor="#483d8b"
  borderRadius="20px"
  :width="400"
  :height="240">
  This card has custom colors and styling with specific dimensions.
</Card>

---

# Custom Size Card

<Card 
  title="Custom Size" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg" 
  width="500"
  backgroundColor="#f0f8ff"
  titleColor="#2c3e50"
  textColor="#34495e">
  This card demonstrates custom sizing with width prop. The height is automatically calculated based on the fixed aspect ratio.
</Card>

---

# Different Size Cards Grid

<div class="grid grid-cols-3 gap-4">
  <Card 
    title="Small" 
    img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg" 
    width="300">
    Small card (300px width)
  </Card>
  
  <Card 
    title="Medium" 
    img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg" 
    width="450">
    Medium card (450px width)
  </Card>
  
  <Card 
    title="Large" 
    img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg" 
    width="600">
    Large card (600px width)
  </Card>
</div>

---

# Portrait Cards with Different Sizes

<div class="grid grid-cols-3 gap-4">
  <Card 
    title="Small Portrait" 
    img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg" 
    orientation="portrait"
    width="200">
    Small portrait (200px width)
  </Card>
  
  <Card 
    title="Medium Portrait" 
    img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg" 
    orientation="portrait"
    width="300">
    Medium portrait (300px width)
  </Card>
  
  <Card 
    title="Large Portrait" 
    img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg" 
    orientation="portrait"
    width="400">
    Large portrait (400px width)
  </Card>
</div>

---

# Multiple Cards Layout

<div style="display: flex; gap: 20px; flex-wrap: wrap;">

<Card 
  title="Card 1" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg?random=8"
  frame="circle"
  style="flex: 1; min-width: 250px;">
  
First card in a multi-card layout.

</Card>

<Card 
  title="Card 2" 
  img="https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg?random=9"
  frame="diamond"
  style="flex: 1; min-width: 250px;">
  
Second card with different styling.

</Card>

</div>

---

# Card Properties

| Property          | Type    | Default     | Description                                        |
| ----------------- | ------- | ----------- | -------------------------------------------------- |
| `title`           | String  | Required    | Card title                                         |
| `img`             | String  | Required    | Image URL                                          |
| `orientation`     | String  | `landscape` | `landscape` or `portrait`                          |
| `frame`           | String  | `rectangle` | `rectangle`, `circle`, `ellipse`, `diamond`, `gem` |
| `backgroundColor` | String  | `#ffffff`   | Card background color                              |
| `borderColor`     | String  | `#e0e0e0`   | Border color                                       |
| `titleColor`      | String  | `#333333`   | Title text color                                   |
| `textColor`       | String  | `#666666`   | Content text color                                 |
| `borderRadius`    | String  | `12px`      | Border radius                                      |
| `shadow`          | Boolean | `true`      | Enable/disable shadow                              |

---

# Thank You!

Enjoy using the Card addon in your Slidev presentations! 🎉
