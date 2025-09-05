<template>
  <div class="slidev-layout barrel-layout">
    <!-- Hidden div to capture slot content -->
    <div ref="slotRef" style="display: none;">
      <slot />
    </div>
    <!-- Title -->
    <div class="title">{{ $frontmatter.title }}</div>
    <!-- Three.js barrel container -->
    <div
      class="barrel-container"
      :style="{
        marginTop: ($frontmatter.top !== undefined && $frontmatter.top !== null)
          ? (typeof $frontmatter.top === 'number' ? `${$frontmatter.top}px` : String($frontmatter.top))
          : '2.5rem'
      }"
    >
      <!-- Three.js canvas will be mounted here -->
      <div ref="threeContainer" class="three-container"></div>
      <!-- Card overlays positioned over Three.js scene -->
      <div class="card-overlays">
        <div
          v-for="(card, index) in parsedCards"
          :key="'card-' + index"
          class="card-overlay"
          :class="{ 'card-active': index === activeCardIndex }"
          :style="getCardOverlayStyle(index)"
          :ref="el => setCardRef(el, index)"
        >
          <Card
            :title="card.title"
            :icon="card.icon"
            :img="card.img"
            :orientation="card.orientation || 'landscape'"
            :frame="card.frame || 'rectangle'"
            :backgroundColor="card.backgroundColor"
            :borderColor="card.borderColor"
            :titleColor="card.titleColor"
            :textColor="card.textColor"
            :borderRadius="card.borderRadius"
            :shadow="card.shadow !== false"
            :width="card.width || '300px'"
            :iconSize="card.iconSize"
            :iconColor="card.iconColor"
          >
            {{ card.content }}
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as THREE from 'three'

// In Slidev, we need to parse the slot content
const slotContent = ref('')
const slotRef = ref(null)
const threeContainer = ref(null)
const cardRefs = ref([])

// Three.js scene objects
let scene, camera, renderer, cylinderMesh
let animationId = null
const cardPositions = ref([])
const cardRotationAngles = ref([])

const activeCardIndex = computed(() => {
  // Use Slidev's native $clicks variable for reveal mechanism (same as cards.vue)
  const clicks = typeof $clicks !== 'undefined' ? $clicks : 0
  const index = Math.max(0, Math.min(parsedCards.value.length - 1, clicks))
  return index
})

// Parse the slot content to extract card configurations
const parsedCards = computed(() => {
  if (!slotContent.value) {
    return []
  }
  
  const content = slotContent.value
  const cards = []
  
  // Split content by h2 elements or ## headers
  const sections = content.split(/<h2[^>]*>|^## /m).filter(section => section.trim())
  
  sections.forEach((section, index) => {
      // Extract title from h2 tag or plain text
      let title = ''
      let configText = section
      
      // Handle h2 tag content
      const h2Match = section.match(/^([^<]+)<\/h2>/)
      if (h2Match) {
        title = h2Match[1].trim()
        configText = section.replace(/^[^<]+<\/h2>/, '')
      } else {
        // Handle plain text title
        const lines = section.split('\n')
        title = lines[0].trim()
        configText = lines.slice(1).join('\n')
      }
      
      if (!title) {
        return
      }
      
      // Parse YAML-like configuration from list items
      const config = { title }
      let content = ''
      
      // Look for list items in HTML format "<li>key: value</li>"
      const listItems = configText.match(/<li>([^<]+)<\/li>/g) || []

      listItems.forEach(item => {
        const match = item.match(/<li>(\w+):\s*([^<]+)<\/li>/)
        if (match) {
          const [, key, value] = match
          if (key === 'content') {
            content = value.trim()
          } else {
            config[key] = value.trim()
          }
        }
      })
      
      if (content) {
        config.content = content
      }
      
      cards.push(config)
    })
  
  return cards
})

// Set card ref
function setCardRef(el, index) {
  if (el) {
    cardRefs.value[index] = el
  }
}

// Add light source for better 3D effect
function addLights() {
  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  
  // Directional light for shadows and depth
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)
  
  // Point light for additional highlights
  const pointLight = new THREE.PointLight(0xffffff, 0.6)
  pointLight.position.set(0, 0, 500)
  scene.add(pointLight)
}

// Initialize Three.js scene
function initThree() {
  if (!threeContainer.value) {
    console.warn('Three container not available')
    return
  }
  
  // Clear previous scene if exists
  if (renderer) {
    threeContainer.value.removeChild(renderer.domElement)
  }
  
  // Scene setup with perspective
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)
  
  // Camera setup
  const containerRect = threeContainer.value.getBoundingClientRect()
  const width = containerRect.width || 800
  const height = containerRect.height || 600
  
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 0, 500)
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setClearColor(0xf8f8f8, 1)
  threeContainer.value.appendChild(renderer.domElement)
  
  // Ensure canvas is visible
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  
  // Add lights for 3D effect
  addLights()
  
  // Create cylinder
  createCylinder()
  
  // Calculate card positions on cylinder surface
  calculateCardPositions()
  
  // Start render loop
  animate()
  
  // Initial render
  renderer.render(scene, camera)
}

// Create cylinder
function createCylinder() {
  const total = parsedCards.value.length
  if (total === 0) return
  
  // Remove previous cylinder if exists
  if (cylinderMesh) {
    scene.remove(cylinderMesh)
  }
  
  // Create a cylinder with proper dimensions
  const radius = 200
  const height = 100
  const radialSegments = Math.max(8, total)
  
  const geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments, 1, true)
  
  // Use MeshPhongMaterial instead of MeshBasicMaterial for better 3D effect
  const material = new THREE.MeshPhongMaterial({ 
    color: 0x4a90e2,
    wireframe: false,
    transparent: true,
    opacity: 0.7,
    shininess: 30
  })
  
  cylinderMesh = new THREE.Mesh(geometry, material)
  scene.add(cylinderMesh)
}

// Calculate positions for cards on cylinder surface
function calculateCardPositions() {
  const total = parsedCards.value.length
  if (total === 0) return
  
  cardPositions.value = []
  cardRotationAngles.value = []
  
  const radius = 220 // Slightly larger than cylinder radius
  
  for (let i = 0; i < total; i++) {
    const angle = (i / total) * Math.PI * 2
    cardRotationAngles.value.push(angle)
    
    // Calculate 3D position
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = 0
    
    cardPositions.value.push({
      angle,
      world: { x, y, z }
    })
  }
}

// Animation loop
function animate() {
  if (!renderer || !scene || !camera) return
  
  animationId = requestAnimationFrame(animate)
  
  // Rotate cylinder slowly
  if (cylinderMesh) {
    cylinderMesh.rotation.y += 0.01
  }
  
  // Update card positions based on cylinder rotation
  updateCardScreenPositions()
  
  renderer.render(scene, camera)
}

// Update card screen positions based on current cylinder rotation
function updateCardScreenPositions() {
  if (!camera || !threeContainer.value || !cylinderMesh) return
  
  const containerWidth = threeContainer.value.clientWidth
  const containerHeight = threeContainer.value.clientHeight
  
  cardPositions.value.forEach((pos, index) => {
    // Apply current rotation to world position
    const rotatedAngle = pos.angle + cylinderMesh.rotation.y
    const radius = 220
    const x = Math.cos(rotatedAngle) * radius
    const z = Math.sin(rotatedAngle) * radius
    
    // Project to screen coordinates
    const vector = new THREE.Vector3(x, 0, z)
    vector.project(camera)
    
    // Convert from normalized device coordinates to screen coordinates
    const screenX = (vector.x * 0.5 + 0.5) * containerWidth
    const screenY = (-vector.y * 0.5 + 0.5) * containerHeight
    
    // Update the position in our reactive array
    if (!pos.screen) {
      pos.screen = {}
    }
    pos.screen.x = screenX
    pos.screen.y = screenY
    
    // Update the actual DOM element position if it exists
    if (cardRefs.value[index]) {
      cardRefs.value[index].style.left = `${screenX}px`
      cardRefs.value[index].style.top = `${screenY}px`
      
      // Calculate z-depth for layering
      const normalizedAngle = ((rotatedAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
      const frontDistance = Math.abs(normalizedAngle - Math.PI)
      const zIndex = Math.round((1 - frontDistance / Math.PI) * 100)
      
      // Update z-index and scale based on position
      const isActive = index === activeCardIndex.value
      cardRefs.value[index].style.zIndex = isActive ? 200 : zIndex
      cardRefs.value[index].style.opacity = isActive ? '1' : '0.7'
      cardRefs.value[index].style.transform = `translate(-50%, -50%) scale(${isActive ? 1.1 : 0.9})`
    }
  })
}

// Get card overlay positioning style
function getCardOverlayStyle(index) {
  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: index === activeCardIndex.value ? 1 : 0.7,
    zIndex: index === activeCardIndex.value ? 200 : 50,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents: index === activeCardIndex.value ? 'auto' : 'none'
  }
}

// Handle window resize
function handleResize() {
  if (!renderer || !camera || !threeContainer.value) return
  
  const containerRect = threeContainer.value.getBoundingClientRect()
  camera.aspect = containerRect.width / containerRect.height
  camera.updateProjectionMatrix()
  renderer.setSize(containerRect.width, containerRect.height)
  
  // Recalculate card positions
  updateCardScreenPositions()
}

// Extract content from the default slot
onMounted(async () => {
  if (slotRef.value) {
    slotContent.value = slotRef.value.innerHTML || slotRef.value.textContent || ''
  }
  
  // Wait for next tick to ensure DOM is ready
  await nextTick()
  
  // Wait a bit more to ensure the container has dimensions
  setTimeout(() => {
    initThree()
  }, 100)
  
  // Add resize listener
  window.addEventListener('resize', handleResize)
})

// Watch parsedCards to ensure they're loaded
watch(parsedCards, (newCards) => {
  if (newCards.length > 0) {
    // Reinitialize Three.js when cards are loaded
    nextTick(() => {
      setTimeout(() => {
        if (threeContainer.value) {
          createCylinder()
          calculateCardPositions()
        }
      }, 100)
    })
  }
}, { immediate: true })

// Cleanup
onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.title {
    position: fixed;
    top: 2px;
    height: 2.2rem;
    text-align: left;
    left: 0;
    background-color: var(--primary);
    padding: 0.3rem 1.5rem 0.3rem 1.5rem;
    border-radius: 0 2rem 0 2rem;
}

.slidev-layout.barrel-layout {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0;
}

.barrel-container {
  width: 100%;
  height: 70vh;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.three-container {
  width: 100%;
  height: 100%;
  min-width: 800px;
  min-height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.three-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.card-overlays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}

.card-overlay {
  position: absolute;
  transition: all 0.3s ease;
  pointer-events: none;
  will-change: transform, opacity, z-index;
}

.card-overlay.card-active {
  pointer-events: auto;
  z-index: 100 !important;
}

/* Card hover effects for active card */
.card-overlay.card-active :deep(.card-container) {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
}

.card-overlay.card-active :deep(.card-container):hover {
  transform: scale(1.1);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3) !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .barrel-container {
    height: 60vh;
  }
  
  .card-overlay {
    transform: translate(-50%, -50%) scale(0.8) !important;
  }
  
  .card-overlay.card-active {
    transform: translate(-50%, -50%) scale(0.9) !important;
  }
}

@media (max-width: 480px) {
  .barrel-container {
    height: 50vh;
  }
  
  .card-overlay {
    transform: translate(-50%, -50%) scale(0.6) !important;
  }
  
  .card-overlay.card-active {
    transform: translate(-50%, -50%) scale(0.7) !important;
  }
}
</style>