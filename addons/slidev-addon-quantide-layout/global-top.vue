
<template>
</template>

<script setup lang="ts">
import { computed, watchEffect, onBeforeUnmount, watch, ref } from 'vue'
import { getFontFamily } from './setup/fonts'
import './styles/font.css'

// 获取当前 frontmatter 的工具函数
const getFrontmatter = () => {
  const meta = $slidev.nav.currentSlideRoute?.meta || {}
  return meta.slide?.frontmatter || meta.frontmatter || {}
}

const cssContent = computed(() => {
  const frontmatter = getFrontmatter()
  let styles = ''

  // 1. 处理基础字体 (font) -> 作用于 body 和 CSS 变量
  const baseFont = frontmatter.font || frontmatter.fontFamily || $slidev.configs?.font || $slidev.configs?.fontFamily
  const baseFontFamily = getFontFamily(baseFont)
  
  if (baseFontFamily) {
    const ff = baseFontFamily.includes(' ') ? `'${baseFontFamily}'` : baseFontFamily
    styles += `
      :root {
        --slidev-theme-font-family: ${ff}, ui-sans-serif, system-ui, sans-serif;
      }
      body {
        font-family: ${ff}, ui-sans-serif, system-ui, sans-serif;
      }
    `
  }

  // 2. 处理标题字体 (headingFont 或具体的 h1, h2...)
  // 优先级：具体的 h1 > headingFont > 基础 font (继承)
  const headingFont = frontmatter.headingFont
  const hTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  
  hTags.forEach(tag => {
    const specificFont = frontmatter[tag] || headingFont
    const fontFamily = getFontFamily(specificFont)
    if (fontFamily) {
      const ff = fontFamily.includes(' ') ? `'${fontFamily}'` : fontFamily
      styles += `
      :root {
        --slidev-font-${tag}: ${ff}, var(--slidev-theme-font-family);
      }
      .slidev-layout ${tag} {
        font-family: var(--slidev-font-${tag});
      }
      `
    } else {
      // 如果没有指定，则变量回退到基础字体
      styles += `
      :root {
        --slidev-font-${tag}: var(--slidev-theme-font-family);
      }
      `
    }
  })

  // 3. 处理语义化字体变量 (fontTitle, fontMono, fontSerif)
  const semanticFonts = {
    title: frontmatter.fontTitle || frontmatter.h1 || headingFont || baseFont,
    mono: frontmatter.fontMono || frontmatter.codeFont || $slidev.configs?.codeFont,
    serif: frontmatter.fontSerif
  }

  Object.entries(semanticFonts).forEach(([key, value]) => {
    const fontFamily = getFontFamily(value)
    if (fontFamily) {
      const ff = fontFamily.includes(' ') ? `'${fontFamily}'` : fontFamily
      styles += `
      :root {
        --font-${key}: ${ff}, var(--slidev-theme-font-family);
      }
      `
    } else if (key === 'title') {
      // title 默认回退到 h1 的变量
      styles += `
      :root {
        --font-title: var(--slidev-font-h1);
      }
      `
    }
  })

  return styles
})

watchEffect(() => {
  if (typeof document === 'undefined') return
  let el = document.getElementById('slidev-custom-fonts')
  if (!el) {
    el = document.createElement('style')
    el.id = 'slidev-custom-fonts'
    document.head.appendChild(el)
  }
  el.innerHTML = cssContent.value
})

// 自动播放逻辑
const timers = ref<any[]>([])

const clearTimers = () => {
  timers.value.forEach(t => clearTimeout(t))
  timers.value = []
}

// 核心播放逻辑：基于 data-duration 动态提取
watch(() => [$slidev.nav.currentPage, $slidev.nav.clicks], ([newPage, newClicks], oldVal) => {
  const oldPage = oldVal ? oldVal[0] : undefined
  const oldClicks = oldVal ? oldVal[1] : undefined
  
  // 无论是换页还是点击步数变化，都清理旧定时器，防止计时重叠
  if (newPage !== oldPage || newClicks !== oldClicks) {
    clearTimers()
  }
  
  if (newPage !== oldPage) {
    console.log(`[AutoPlay] 自动播放初始化成功 - 第 ${newPage} 页`)
  }
  
  const frontmatter = getFrontmatter()
  if (frontmatter.autoPlay === true) {
    // 延迟等待 Slidev 完成 DOM 状态更新
    const t = setTimeout(() => {
      if ($slidev.nav.currentPage !== newPage || $slidev.nav.clicks !== newClicks) return
      
      // 情况 1：刚进入页面 (clicks === 0)
      if (newClicks === 0) {
        // 检查页面中是否存在任何以 data-duration 开头的属性
        const hasDurationConfig = Array.from(document.querySelectorAll('*')).some(el => 
          el.getAttributeNames().some(name => name.startsWith('data-duration'))
        )
        
        if (hasDurationConfig) {
          console.log(`[AutoPlay] 第 ${newPage} 页: 检测到动画时长配置，立即发起第一次跳转 (进入 Click 1)`)
          $slidev.nav.next()
          return
        }
      }

      // 情况 2：在某个 click 步骤中 (newClicks > 0)
      const attrName = `data-duration-${newClicks}`
      
      // 查找当前步数对应的时长属性
      const elements = document.querySelectorAll(`[${attrName}]`)
      
      let maxDuration = 0
      elements.forEach(el => {
        const d = parseFloat(el.getAttribute(attrName) || '0')
        if (d > maxDuration) maxDuration = d
      })

      // 兜底逻辑：如果没找到 data-duration-n，尝试查找通用的 data-duration（针对当前激活的元素）
      if (maxDuration === 0) {
        const legacyElements = document.querySelectorAll(`.slidev-vclick-current[data-duration], [data-click="${newClicks}"][data-duration]`)
        legacyElements.forEach(el => {
          const d = parseFloat((el as HTMLElement).dataset.duration || '0')
          if (d > maxDuration) maxDuration = d
        })
      }

      if (maxDuration > 0) {
        console.log(`[AutoPlay] 第 ${newPage} 页, 当前步数 ${newClicks}: 保持 ${maxDuration}s 后跳转到下一步`)
        const jumpTimer = setTimeout(() => {
          if ($slidev.nav.currentPage === newPage && $slidev.nav.clicks === newClicks) {
            $slidev.nav.next()
          }
        }, maxDuration * 1000)
        timers.value.push(jumpTimer)
      } else {
        // 诊断日志：如果页面上有其他的 data-duration-n 但不匹配当前 clicks
        const allDurationAttrs = Array.from(document.querySelectorAll('*'))
          .flatMap(el => el.getAttributeNames())
          .filter(name => name.startsWith('data-duration-'))
        
        if (allDurationAttrs.length > 0) {
          console.log(`[AutoPlay] 第 ${newPage} 页, 当前步数 ${newClicks}: 未找到匹配的 ${attrName}。`)
        }
      }
    }, 150)
    timers.value.push(t)
  }
}, { immediate: true })

onBeforeUnmount(() => {
  clearTimers()
  if (typeof document === 'undefined') return
  const el = document.getElementById('slidev-custom-fonts')
  if (el) el.remove()
})
</script>
