<template>
  <div class="slidev-layout barrel-layout" :style="backgroundStyle">
    <!-- Hidden cards-container for screenshot - 隐藏的卡片容器用于截图 -->
    <div ref="cardsContainer" class="cards-container">
      <Card
        v-for="(card, index) in parsedCards"
        :key="`card-${index}-${card.title}`"
        ref="cardRefs"
        :title="card.title"
        :icon="card.icon"
        :img="card.img"
        :orientation="card.orientation || 'portrait'"
        :frame="card.frame || 'rectangle'"
        :backgroundColor="card.backgroundColor"
        :borderColor="card.borderColor"
        :titleColor="card.titleColor"
        :textColor="card.textColor"
        :borderRadius="card.borderRadius"
        :shadow="card.shadow !== false"
        :width="$frontmatter.width || 300"
        :iconSize="card.iconSize"
        :iconColor="card.iconColor"
      >
        {{ card.content }}
      </Card>
    </div>
    
    <!-- Hidden div to capture slot content - 隐藏的slot内容捕获 -->
    <div ref="slotRef" style="display: none;">
      <slot />
    </div>
    
    <!-- Three.js container - 3D圆柱体容器 -->
    <div class="barrel-container">
      <div ref="threeContainer" class="three-container"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import * as THREE from 'three'
import html2canvas from 'html2canvas'
import { handleBackground } from '../layoutHelper'
// Card 组件已通过 slidev-addon-card 全局注册，无需手动导入

// Refs
const threeContainer = ref(null)
const slotRef = ref(null)
const cardsContainer = ref(null)
const cardRefs = ref([])
const slotContent = ref('')

// 背景样式处理
const backgroundStyle = computed(() => {
  const background = $frontmatter.background
  if (!background) return {}
  
  console.log(`🌈 设置背景: ${background}`)
  return handleBackground(background)
})

// Three.js objects
let scene, camera, renderer, cylinder
let animationFrameId
let isMouseDown = false
let mouseX = 0
let mouseY = 0
let targetRotationY = 0
let currentRotationY = 0

// 解析slot内容提取卡片配置（与cards.vue保持一致）
const parsedCards = computed(() => {
  if (!slotContent.value) {
    return []
  }
  
  console.log('📋 开始解析卡片内容...')
  
  const content = slotContent.value
  const cards = []
  
  // 按h2元素或##标题分割内容
  const sections = content.split(/<h2[^>]*>|^## /m).filter(section => section.trim())
  
  sections.forEach((section, index) => {
      // 从 h2 标签或纯文本中提取标题
      let title = ''
      let configText = section
      
      // 处理 h2 标签内容
      const h2Match = section.match(/^([^<]+)<\/h2>/)
      if (h2Match) {
        title = h2Match[1].trim()
        configText = section.replace(/^[^<]+<\/h2>/, '')
      } else {
        // 处理纯文本标题
        const lines = section.split('\n')
        title = lines[0].trim()
        configText = lines.slice(1).join('\n')
      }
      
      if (!title) {
        return
      }
      
      // 从列表项目中解析YAML格式的配置
      const config = { title }
      let content = ''
      
      // 查找 HTML 格式的列表项目 "<li>key: value</li>"
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
      console.log(`✅ 解析到卡片 ${index + 1}: ${title}`)
    })
  
  console.log(`📊 总共解析到 ${cards.length} 张卡片`)
  return cards
})

// Three.js核心函数（移植自test-refactored.html）

// 1. 初始化Three.js场景
const initThree = (container) => {
  // 创建场景
  scene = new THREE.Scene()
  // 透明背景以显示DOM背景
  
  // 创建相机
  const aspect = container.clientWidth / container.clientHeight
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.set(0, 0, 500) // 根据直径调整相机距离

  // 创建透明渲染器
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  })
  renderer.setClearColor(0x000000, 0) // 透明背景
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  
  container.appendChild(renderer.domElement)

  // 添加鼠标交互
  container.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  
  // 监听窗口大小变化
  window.addEventListener('resize', onWindowResize)

  // 开始动画循环
  animate()
}

// 2. 创建几何体的函数
const createGeometry = (type, radius, height, imageCount) => {
  let geometry
  let segments
  
  if (type === 'circle') {
    // 圆柱体：使用较多段数获得平滑效果
    segments = 64
    geometry = new THREE.CylinderGeometry(radius, radius, height, segments)
  } else if (type === 'polygon') {
    // 正n边形：段数等于图片数量，形成多面体
    segments = imageCount
    geometry = new THREE.CylinderGeometry(radius, radius, height, segments)
  } else {
    // 默认为圆柱体
    segments = 64
    geometry = new THREE.CylinderGeometry(radius, radius, height, segments)
  }
  
  return geometry
}

// 3. 贴图函数
const applyTexture = (geometry, textures) => {
  // 先创建占位符
  const placeholderMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xcccccc, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
  })
  cylinder = new THREE.Mesh(geometry, placeholderMaterial)
  scene.add(cylinder)

  try {
    // 创建拼接canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // 从 Canvas 元素获取尺寸
    const imageWidth = textures[0].width
    const imageHeight = textures[0].height
    
    canvas.width = imageWidth * textures.length
    canvas.height = imageHeight

    // 将图片并排绘制到canvas上
    textures.forEach((texture, index) => {
      ctx.drawImage(texture, index * imageWidth, 0, imageWidth, imageHeight)
    })

    // 从拼接好的canvas创建最终纹理
    const stitchedTexture = new THREE.CanvasTexture(canvas)
    stitchedTexture.colorSpace = THREE.SRGBColorSpace
    stitchedTexture.needsUpdate = true
    stitchedTexture.premultiplyAlpha = false
    stitchedTexture.format = THREE.RGBAFormat
    stitchedTexture.magFilter = THREE.LinearFilter
    stitchedTexture.minFilter = THREE.LinearFilter
    stitchedTexture.generateMipmaps = false

    // 创建材质
    const sideMaterial = new THREE.MeshBasicMaterial({ 
      map: stitchedTexture,
      transparent: true,
      alphaTest: 0.1,
      side: THREE.DoubleSide
    })
    const capMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x555555,
      transparent: true,
      opacity: 0.8
    })

    // 更新几何体材质 [侧面, 顶部, 底部]
    cylinder.material = [sideMaterial, capMaterial, capMaterial]

    return cylinder

  } catch (error) {
    console.error('❌ 纹理应用失败:', error)
    return cylinder // 返回占位符
  }
}

// 生成卡片截图的纹理数组
const createCardTextures = async () => {
  const cards = parsedCards.value
  if (cards.length === 0) {
    console.error('❌ 没有解析到卡片数据')
    return []
  }
  
  // 获取frontmatter配置
  const cardWidth = $frontmatter.width || 300
  const cardHeight = cardWidth * (5/3)  // 按照要求，高度是宽度的5/3倍
  
  // 等待Card组件渲染完成
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const cardTextures = []
  
  // 使用组件引用直接访问 Card 组件
  const cardComponents = cardRefs.value
  
  if (!cardComponents || cardComponents.length === 0) {
    console.error('❌ 未找到Card组件引用')
    return []
  }
  
  // 对每个Card组件进行截图
  for (let i = 0; i < Math.min(cardComponents.length, cards.length); i++) {
    const cardComponent = cardComponents[i]
    const card = cards[i]
    
    if (!card || !cardComponent) continue
    
    try {
      // 获取Card组件的DOM元素
      const cardElement = cardComponent.$el
      if (!cardElement) {
        console.error(`❌ 卡片 ${i + 1} DOM元素不存在`)
        continue
      }
      // 等待样式应用
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 使用html2canvas对Card组件进行截图
      const canvas = await html2canvas(cardElement, {
        // width: cardWidth,
        // height: cardHeight,
        scale: 2,  // 2x DPI提高清晰度
        useCORS: true,
        allowTaint: true,
        backgroundColor: null  // 透明背景
      })
      
      cardTextures.push(canvas)
      
    } catch (error) {
      console.error(`❌ 卡片 ${i + 1} 截图失败:`, error)
    }
  }

  return cardTextures
}

// 创建带卡片的圆柱体
const createCylinderWithCards = async () => {
  try {
    // 获取配置
    const diameter = $frontmatter.diameter || 600
    const gendre = $frontmatter.gendre || 'circle'
    
    // 1. 生成卡片截图纹理
    const cardTextures = await createCardTextures()
    if (cardTextures.length === 0) {
      console.error('❌ 无法获取卡片纹理')
      return
    }
    
    // 2. 创建几何体
    const radius = diameter / 2
    const geometry = createGeometry(gendre, radius, 300, cardTextures.length)
    
    // 3. 应用纹理
    applyTexture(geometry, cardTextures)
  } catch (error) {
    console.error('❌ 创建圆柱体失败:', error)
  }
}

// 初始化Three.js场景
const initThreeScene = async () => {
  if (!threeContainer.value) {
    console.error('❌ Three.js容器不存在')
    return
  }

  // 初始化Three.js核心组件
  initThree(threeContainer.value)
  
  // 创建卡片圆柱体
  await createCylinderWithCards()
}

// 动画循环函数
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)
  
  // 平滑的鼠标控制旋转
  if (cylinder) {
    currentRotationY += (targetRotationY - currentRotationY) * 0.05
    cylinder.rotation.y = currentRotationY
  }
  
  renderer.render(scene, camera)
}

// 鼠标事件处理
const onMouseDown = (event) => {
  isMouseDown = true
  mouseX = event.clientX
  mouseY = event.clientY
}

const onMouseMove = (event) => {
  if (!isMouseDown) return
  
  const deltaX = event.clientX - mouseX
  targetRotationY += deltaX * 0.01
  mouseX = event.clientX
  mouseY = event.clientY
}

const onMouseUp = () => {
  isMouseDown = false
}

// 处理窗口大小变化
const onWindowResize = () => {
  if (camera && renderer && threeContainer.value) {
    const width = threeContainer.value.clientWidth
    const height = threeContainer.value.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  }
}

// Vue 组件挂载后，初始化 Three.js 场景
onMounted(async () => {
  // 首先解析slot内容
  if (slotRef.value) {
    slotContent.value = slotRef.value.innerHTML || slotRef.value.textContent || ''
  }
  
  // 等待一下确保DOM完全准备好
  await new Promise(resolve => setTimeout(resolve, 100))
  initThreeScene()
})

// Vue 组件卸载前，进行清理操作
onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onWindowResize)
  
  // 清理鼠标事件监听器
  if (threeContainer.value) {
    threeContainer.value.removeEventListener('mousedown', onMouseDown)
  }
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.slidev-layout.barrel-layout {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.barrel-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

/* 在 barrel 布局中去除卡片的 box-shadow */
.barrel-layout .card,
.barrel-layout .slidev-card {
  box-shadow: none !important;
}

.three-container {
  width: 90vw;
  height: 70vh;
  max-width: 1200px;
  max-height: 600px;
  position: relative;
  background: transparent;
}

.three-container canvas {
  width: 100% !important;
  height: 100% !important;
  background: transparent !important;
  display: block;
}

/* 隐藏的卡片容器样式 - 使用位置隐藏而非 visibility */
.cards-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  position: absolute;
  left: -9999px;
  top: -9999px;
}
</style>