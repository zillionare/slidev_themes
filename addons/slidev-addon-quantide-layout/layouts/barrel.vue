<template>
  <div class="slidev-layout barrel-layout" :style="backgroundStyle">
    <!-- Hidden cards-container for screenshot - 隐藏的卡片容器用于截图 -->
    <div ref="cardsContainer" class="cards-container">
      <Card
        v-for="(card, index) in parsedCards"
        :key="index"
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

// 按照.ai/tasks/01.md的要求，使用html2canvas对真实的Card组件进行截图
const createCardTexture = async () => {
  const cards = parsedCards.value
  if (cards.length === 0) {
    console.error('❌ 没有解析到卡片数据')
    return null
  }
  
  console.log(`🎨 开始对 ${cards.length} 个Card组件进行截图...`)
  
  // 获取frontmatter配置
  const margin = $frontmatter.margin || 200
  const cardWidth = $frontmatter.width || 300
  const cardHeight = cardWidth * (5/3)  // 按照要求，高度是宽度的5/3倍
  
  console.log(`📏 卡片尺寸: ${cardWidth} x ${cardHeight} (5:3比例)`)
  
  // 等待Card组件渲染完成
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const cardImages = []
  
  // 从隐藏的cards-container中获取所有Card组件
  const cardElements = cardsContainer.value?.querySelectorAll('.card-wrapper, .card-container') || []
  
  if (cardElements.length === 0) {
    console.error('❌ 在cards-container中未找到Card组件')
    return null
  }
  
  console.log(`✅ 在cards-container中找到 ${cardElements.length} 个Card组件`)
  console.log(`📋 解析到 ${cards.length} 个卡片数据`)
  console.log(`🔄 将处理 ${Math.min(cardElements.length, cards.length)} 个卡片`)
  
  // 对每个Card组件进行截图
  for (let i = 0; i < Math.min(cardElements.length, cards.length); i++) {
    const cardElement = cardElements[i]
    const card = cards[i]
    
    if (!card) {
      console.warn(`⚠️ 卡片数据 ${i + 1} 不存在，跳过`)
      continue
    }
    
    try {
      console.log(`📷 正在截图卡片 ${i + 1}: "${card.title}"...`)
      
      // 临时显示元素以确保截图成功
      const originalVisibility = cardElement.style.visibility
      const originalPosition = cardElement.style.position
      const originalLeft = cardElement.style.left
      const originalTop = cardElement.style.top
      const originalZIndex = cardElement.style.zIndex
      
      // 设置为可见但仍然在屏幕外
      cardElement.style.visibility = 'visible'
      cardElement.style.position = 'absolute'
      cardElement.style.left = '-9999px'
      cardElement.style.top = '-9999px'
      cardElement.style.zIndex = '9999'
      
      // 等待样式应用
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 使用html2canvas对Card组件进行截图
      const canvas = await html2canvas(cardElement, {
        width: cardWidth,
        height: cardHeight,
        scale: 2,  // 2x DPI提高清晰度
        useCORS: true,
        allowTaint: true,
        backgroundColor: null  // 透明背景
      })
      
      // 恢复原始样式
      cardElement.style.visibility = originalVisibility
      cardElement.style.position = originalPosition
      cardElement.style.left = originalLeft
      cardElement.style.top = originalTop
      cardElement.style.zIndex = originalZIndex
      
      cardImages.push(canvas)
      
      // 为了调试，将截图下载到本地
      const link = document.createElement('a')
      link.download = `barrel-card-${i + 1}-${card.title.replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log(`✅ 卡片 ${i + 1} "${card.title}" 截图完成并已下载`)
      
    } catch (error) {
      console.error(`❌ 卡片 ${i + 1} 截图失败:`, error)
      // 直接失败，不创建备用
      const fallbackCanvas = document.createElement('canvas')
      fallbackCanvas.width = cardWidth * 2
      fallbackCanvas.height = cardHeight * 2
      const ctx = fallbackCanvas.getContext('2d')
      ctx.fillStyle = '#ff0000'
      ctx.fillRect(0, 0, fallbackCanvas.width, fallbackCanvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('截图失败', fallbackCanvas.width / 2, fallbackCanvas.height / 2)
      cardImages.push(fallbackCanvas)
    }
  }

  if (cardImages.length === 0) {
    console.error('❌ 没有成功截图任何卡片')
    return null
  }
  
  // 根据frontmatter.gendre决定创建圆柱体(circle)还是多面体(polygon) 
  const gendre = $frontmatter.gendre || 'circle'
  
  if (gendre === 'circle') {
    return createCircleTexture(cardImages, cardWidth, cardHeight, margin)
  } else if (gendre === 'polygon') {
    return createPolygonTexture(cardImages, cardWidth, cardHeight)
  } else {
    console.warn(`⚠️ 未知的gendre: ${gendre}，默认使用circle`)
    return createCircleTexture(cardImages, cardWidth, cardHeight, margin)
  }
}

// 创建circle风格的圆柱体纹理
const createCircleTexture = (cardImages, cardWidth, cardHeight, margin) => {
  console.log('🔵 创建circle风格圆柱体纹理...')
  
  // 按照01.md: 以 n * (cardWidth + margin) 为周长生成圆柱体
  const totalWidth = cardImages.length * (cardWidth * 2 + margin * 2)
  const totalHeight = cardHeight * 2
  
  const stitchCanvas = document.createElement('canvas')
  stitchCanvas.width = totalWidth
  stitchCanvas.height = totalHeight
  const stitchCtx = stitchCanvas.getContext('2d')
  
  console.log(`📐 拼接Canvas尺寸: ${totalWidth} x ${totalHeight}`)
  
  // 拼接所有卡片，每个卡片之间插入透明区域
  cardImages.forEach((cardCanvas, index) => {
    const x = index * (cardWidth * 2 + margin * 2)
    stitchCtx.drawImage(cardCanvas, x, 0)
    console.log(`✅ 卡片 ${index + 1} 已拼接到位置 ${x}`)
  })
  
  // 保存诊断截图
  const link = document.createElement('a')
  link.download = `barrel-circle-texture-${Date.now()}.png`
  link.href = stitchCanvas.toDataURL('image/png', 1.0)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  console.log('📷 Circle纹理诊断截图已保存')
  
  // 创建纹理
  const texture = new THREE.CanvasTexture(stitchCanvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  texture.premultiplyAlpha = false
  texture.format = THREE.RGBAFormat
  texture.magFilter = THREE.LinearFilter
  texture.minFilter = THREE.LinearFilter
  texture.generateMipmaps = false
  
  console.log('🎨 Circle圆柱体纹理创建完成')
  return texture
}

// 创建polygon风格的多面体纹理（暂时使用简化实现）
const createPolygonTexture = (cardImages, cardWidth, cardHeight) => {
  console.log('🔶 创建polygon风格多面体纹理...')
  // 暂时使用与circle相同的实现，后续可扩展
  return createCircleTexture(cardImages, cardWidth, cardHeight, 0)
}

// 创建带卡片的圆柱体
const createCylinderWithCards = () => {
  console.log('🎨 开始创建卡片圆柱体...')
  
  // 获取配置
  const diameter = $frontmatter.diameter || 600
  const gendre = $frontmatter.gendre || 'circle'
  
  // 创建几何体
  const radius = diameter / 2
  const geometry = gendre === 'circle' 
    ? new THREE.CylinderGeometry(radius, radius, 300, 64, 1)  // 圆柱体
    : new THREE.CylinderGeometry(radius, radius, 300, parsedCards.value.length, 1)  // 多面体
  
  // 先创建占位符圆柱体
  const placeholderMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xcccccc, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
  })
  cylinder = new THREE.Mesh(geometry, placeholderMaterial)
  scene.add(cylinder)
  
  console.log(`✅ ${gendre}风格占位符已添加，直径: ${diameter}px`)
  
  // 使用卡片数据创建纹理
  createCardTexture().then(texture => {
    if (texture) {
      console.log('🎯 卡片纹理创建成功')
      
      // 创建材质
      const sideMaterial = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        alphaTest: 0.1,
        side: THREE.DoubleSide
      })
      const capMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x555555,
        transparent: true,
        opacity: 0.8
      })
      
      // 更新圆柱体的材质
      cylinder.material = [sideMaterial, capMaterial, capMaterial]
      
      console.log('✅ Card组件纹理已应用到圆柱体')
      
    } else {
      console.log('❌ 卡片纹理创建失败，保持占位符')
    }
  }).catch(err => {
    console.error('❌ 卡片纹理创建错误:', err)
  })
}

// 初始化Three.js场景
const initThree = () => {
  console.log('🚀 开始初始化Three.js场景...')
  
  if (!threeContainer.value) {
    console.error('❌ Three.js容器不存在')
    return
  }

  // 1. 创建场景
  scene = new THREE.Scene()
  // 不设置背景色，保持透明以显示DOM背景

  // 2. 创建相机
  const container = threeContainer.value
  const aspect = container.clientWidth / container.clientHeight
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.set(0, 0, 500) // 根据直径调整相机距离

  // 3. 创建渲染器（设置为透明背景）
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  })
  renderer.setClearColor(0x000000, 0) // 设置清除颜色为透明
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  
  console.log(`📺 渲染器设置: ${container.clientWidth}x${container.clientHeight}`)
  container.appendChild(renderer.domElement)

  console.log('✅ Three.js基础设置完成')

  // 创建卡片圆柱体
  createCylinderWithCards()

  // 监听窗口大小变化事件
  window.addEventListener('resize', onWindowResize)
  
  // 添加鼠标交互事件
  container.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  
  console.log('🖱️ 鼠标交互已启用，可拖动旋转圆柱体')

  // 开始动画循环
  animate()
  
  console.log('🎉 Three.js初始化完成')
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
onMounted(() => {
  console.log('🔧 Vue组件已挂载，准备初始化Three.js...')
  
  // 首先解析slot内容
  if (slotRef.value) {
    slotContent.value = slotRef.value.innerHTML || slotRef.value.textContent || ''
    console.log('📝 Slot内容已获取')
  }
  
  // 等待一下确保DOM完全准备好
  setTimeout(() => {
    initThree()
  }, 100)
})

// Vue 组件卸载前，进行清理操作
onBeforeUnmount(() => {
  console.log('🧹 开始清理Three.js资源...')
  
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
  
  console.log('✅ Three.js资源清理完成')
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
  /* 使用位置隐藏而不是 visibility: hidden，以确保html2canvas能正常工作 */
  position: absolute;
  left: -9999px;
  top: -9999px;
}
</style>