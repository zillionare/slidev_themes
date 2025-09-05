<template>
  <div class="slidev-layout barrel-layout" :style="backgroundStyle">
    <!-- Hidden div to capture slot content -->
    <div ref="slotRef" style="display: none;">
      <slot />
    </div>
    <!-- Title -->
    <div class="title">{{ $frontmatter.title || 'Three.js 圆柱体测试' }}</div>
    <!-- Three.js container -->
    <div class="barrel-container">
      <div ref="threeContainer" class="three-container"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import * as THREE from 'three'
import { handleBackground } from '../layoutHelper'

// Refs
const threeContainer = ref(null)
const slotRef = ref(null)
const slotContent = ref('')

// 背景样式处理
const backgroundStyle = computed(() => {
  const background = $frontmatter.background
  if (!background) return {}
  
  console.log(`🌈 设置背景: ${background}`)
  return handleBackground(background)
})

// Three.js objects
let scene, camera, renderer, cylinder, controls
let animationFrameId

// 图片URLs（直接使用随机图片，与test.html相同）
const imageUrls = [
  'https://picsum.photos/id/237/400/300',
  'https://picsum.photos/id/238/400/300', 
  'https://picsum.photos/id/239/400/300',
  'https://picsum.photos/id/240/400/300',
  'https://picsum.photos/id/241/400/300',
]

// Parse the slot content to extract card configurations (借鉴cards.vue)
const parsedCards = computed(() => {
  if (!slotContent.value) {
    return []
  }
  
  console.log('📝 开始解析卡片内容...')
  
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
          } else if (key !== 'width') {  // 在barrel中，忽略width设置
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

// 创建卡片纹理（将所有卡片拼接成一个纹理）- 500 DPI超高分辨率
const createCardTexture = async () => {
  const cards = parsedCards.value
  if (cards.length === 0) return null
  
  console.log(`🖼️ 开始创建 ${cards.length} 张卡片的超高分辨率拼接纹理 (500 DPI)...`)
  
  // 获取frontmatter配置
  const margin = $frontmatter.margin || 100
  
  // DPI倍数：从72 DPI提升到500 DPI
  const dpiScale = 500 / 72  // 约6.94倍
  
  // 基础卡片尺寸（逻辑尺寸）
  const baseCardWidth = 400
  const baseCardHeight = 300
  
  // 超高分辨率实际尺寸
  const cardWidth = Math.round(baseCardWidth * dpiScale)   // 约2778px
  const cardHeight = Math.round(baseCardHeight * dpiScale) // 约2083px
  const scaledMargin = Math.round(margin * dpiScale)
  
  console.log(`📐 超高分辨率尺寸: ${cardWidth} x ${cardHeight} (${dpiScale.toFixed(2)}x放大)`)
  
  // 创建一个 canvas 用于在内存中拼接卡片
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 计算总宽度：n张卡片 + n个margin带
  const totalWidth = cardWidth * cards.length + scaledMargin * cards.length
  
  canvas.width = totalWidth
  canvas.height = cardHeight
  
  // 启用高DPI渲染
  ctx.scale(dpiScale, dpiScale)
  
  // 设置canvas背景为透明
  ctx.clearRect(0, 0, canvas.width / dpiScale, canvas.height / dpiScale)
  
  console.log(`📐 拼接Canvas尺寸: ${canvas.width} x ${canvas.height} (500 DPI, 包含 ${cards.length}个 ${scaledMargin}px 间距带)`)
  
  // 绘制每张卡片（使用逻辑坐标系，自动放大到高DPI）
  cards.forEach((card, index) => {
    // 计算x位置（使用逻辑坐标）：每张卡片前面都有一个margin带
    const x = margin + index * (baseCardWidth + margin)
    
    // 绘制卡片背景
    ctx.fillStyle = card.backgroundColor || '#ffffff'
    ctx.fillRect(x, 0, baseCardWidth, baseCardHeight)
    
    // 绘制边框（调整线条宽度适应高DPI）
    ctx.strokeStyle = card.borderColor || '#e0e0e0'
    ctx.lineWidth = 1  // 逻辑宽度，会被自动放大
    ctx.strokeRect(x + 2, 2, baseCardWidth - 4, baseCardHeight - 4)
    
    // 绘制标题（使用逻辑字体大小）
    ctx.fillStyle = card.titleColor || '#333333'
    ctx.font = 'bold 32px Arial, sans-serif'  // 逻辑字体大小
    ctx.textAlign = 'center'
    ctx.fillText(card.title, x + baseCardWidth / 2, 60)
    
    // 绘制图标（简化表示）
    if (card.icon) {
      ctx.fillStyle = card.iconColor || '#4a90e2'
      ctx.font = '48px Arial'  // 逻辑字体大小
      ctx.fillText('⭐', x + baseCardWidth / 2, 140)
    }
    
    // 绘制内容
    if (card.content) {
      ctx.fillStyle = card.textColor || '#666666'
      ctx.font = '20px Arial, sans-serif'  // 逻辑字体大小
      ctx.textAlign = 'center'
      
      // 简单的换行处理（使用逻辑宽度）
      const content = card.content
      const words = content.split(' ')
      let line = ''
      let y = 200
      const maxWidth = baseCardWidth - 40  // 逻辑宽度
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x + baseCardWidth / 2, y)
          line = words[n] + ' '
          y += 30  // 逻辑行间距
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, x + baseCardWidth / 2, y)
    }
    
    console.log(`✅ 超高分辨率卡片 ${index + 1} "${card.title}" 绘制完成`)
  })
  
  // 从拼接好的 canvas 创建最终的纹理
  const stitchedTexture = new THREE.CanvasTexture(canvas)
  stitchedTexture.colorSpace = THREE.SRGBColorSpace
  stitchedTexture.needsUpdate = true
  
  // 关键：设置纹理支持透明度
  stitchedTexture.premultiplyAlpha = false
  stitchedTexture.format = THREE.RGBAFormat
  
  console.log('🎯 500 DPI 超高分辨率卡片纹理创建完成（支持透明度）')
  return stitchedTexture
}

// 创建带卡片的圆柱体
const createCylinderWithCards = () => {
  console.log('🎨 开始创建卡片圆柱体...')
  
  // 创建一个平滑的圆柱几何体（与test.html相同）
  const geometry = new THREE.CylinderGeometry(2, 2, 3, 64)
  
  // 先创建占位符圆柱体
  const placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
  cylinder = new THREE.Mesh(geometry, placeholderMaterial)
  scene.add(cylinder)
  
  console.log('✅ 占位符圆柱体已添加（无内部背景，实现真正透明）')
  
  // 使用卡片数据创建纹理
  createCardTexture().then(stitchedTexture => {
    if (stitchedTexture) {
      console.log('🎯 卡片纹理创建成功')
      
      // 创建侧面和顶/底部的材质（启用透明度）
      const sideMaterial = new THREE.MeshBasicMaterial({ 
        map: stitchedTexture,
        transparent: true,
        alphaTest: 0.1,
        side: THREE.DoubleSide
      })
      const capMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 })
      
      // 更新圆柱体的材质
      cylinder.material = [sideMaterial, capMaterial, capMaterial]
      
      console.log('✅ 卡片纹理已应用到圆柱体')
    } else {
      console.log('❌ 卡片纹理创建失败，保持占位符')
    }
  }).catch(err => {
    console.error('❌ 卡片纹理创建错误:', err)
  })
}

// 创建带图片的圆柱体（原始实现，作为备用）
const createCylinderWithImages = () => {
  console.log('🖼️ 使用默认图片创建圆柱体...')
  
  // 创建几何体
  const geometry = new THREE.CylinderGeometry(2, 2, 3, 64)
  const textureLoader = new THREE.TextureLoader()

  // 先创建一个占位符
  const placeholderMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
  cylinder = new THREE.Mesh(geometry, placeholderMaterial)
  scene.add(cylinder)

  console.log('✅ 占位符圆柱体已添加')

  const promises = imageUrls.map(url => textureLoader.loadAsync(url))

  Promise.all(promises).then(textures => {
    console.log('🖼️ 所有图片加载完成，开始拼接纹理...')
    
    // 创建一个 canvas 用于在内存中拼接图片
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // 假设所有图片尺寸相同
    const imageWidth = textures[0].image.width
    const imageHeight = textures[0].image.height
    
    canvas.width = imageWidth * textures.length
    canvas.height = imageHeight

    console.log(`📐 拼接Canvas尺寸: ${canvas.width} x ${canvas.height}`)

    // 将图片一张张并排绘制到 canvas 上
    textures.forEach((texture, index) => {
      // 绘制完成后，释放原始 GPU 纹理内存以优化性能
      texture.dispose()
      ctx.drawImage(texture.image, index * imageWidth, 0, imageWidth, imageHeight)
      console.log(`✅ 图片 ${index + 1} 已拼接`)
    })

    // 从拼接好的 canvas 创建最终的纹理
    const stitchedTexture = new THREE.CanvasTexture(canvas)
    stitchedTexture.colorSpace = THREE.SRGBColorSpace
    stitchedTexture.needsUpdate = true

    // 创建侧面和顶/底部的材质
    const sideMaterial = new THREE.MeshBasicMaterial({ map: stitchedTexture })
    const capMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 })

    // 更新圆柱体的材质
    cylinder.material = [sideMaterial, capMaterial, capMaterial]

    console.log('🎯 图片纹理已应用到圆柱体')

  }).catch(err => {
    console.error('❌ 加载纹理时出错:', err)
  })
}

// 初始化Three.js场景（完全复制test.html的逻辑）
const initThree = () => {
  console.log('🚀 开始初始化Three.js场景...')
  
  if (!threeContainer.value) {
    console.error('❌ Three.js容器不存在')
    return
  }

  // 1. 创建场景
  scene = new THREE.Scene()
  // 不设置背景色，保持透明以显示DOM背景
  // scene.background = new THREE.Color(0x111111) // 移除背景色

  // 2. 创建相机
  const container = threeContainer.value
  const aspect = container.clientWidth / container.clientHeight
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.set(0, 0, 5) // 将相机向后移动一点

  // 3. 创建渲染器（设置为透明背景）
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true  // 启用透明背景
  })
  renderer.setClearColor(0x000000, 0) // 设置清除颜色为透明
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  console.log('✅ Three.js基础设置完成')

  // 检查是否有解析到的卡片数据
  if (parsedCards.value.length === 0) {
    console.log('⚠️ 没有找到卡片数据，使用默认图片')
    createCylinderWithImages()
  } else {
    console.log(`🎴 找到 ${parsedCards.value.length} 张卡片，创建卡片圆柱体`)
    createCylinderWithCards()
  }

  // 监听窗口大小变化事件
  window.addEventListener('resize', onWindowResize)

  // 开始动画循环
  animate()
  
  console.log('🎉 Three.js初始化完成')
}

// 动画循环函数（与test.html相同）
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)
  
  // 简单的自动旋转
  if (cylinder) {
    cylinder.rotation.y += 0.01
  }
  
  renderer.render(scene, camera)
}

// 处理窗口大小变化的函数（与test.html相同）
const onWindowResize = () => {
  if (camera && renderer && threeContainer.value) {
    const width = threeContainer.value.clientWidth
    const height = threeContainer.value.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  }
}

// Vue 组件挂载后，初始化 Three.js 场景并开始动画
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

// Vue 组件卸载前，进行清理操作以防止内存泄漏
onBeforeUnmount(() => {
  console.log('🧹 开始清理Three.js资源...')
  
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onWindowResize)
  
  if (renderer) {
    renderer.dispose()
  }
  
  console.log('✅ Three.js资源清理完成')
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
  color: white;
  z-index: 100;
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
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 背景透明，让 DOM 背景显示 */
  background: transparent;
}

/* 在 barrel 布局中去除卡片的 box-shadow */
.barrel-layout .card,
.barrel-layout .slidev-card {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
}

/* 同样去除卡片内部元素的阴影 */
.barrel-layout .card *,
.barrel-layout .slidev-card * {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
}

.three-container {
  width: 100%;
  height: 100%;
  position: relative;
  /* 确保 Canvas 能透明显示 DOM 背景 */
  background: transparent;
}

.three-container canvas {
  background: transparent !important;
  /* 可选：设置低一点的 z-index 以确保不遮挡其他元素 */
  z-index: 1;
}

.three-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.three-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>