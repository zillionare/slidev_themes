
<template>
</template>

<script setup lang="ts">
import { computed, watchEffect, onBeforeUnmount } from 'vue'
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

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  const el = document.getElementById('slidev-custom-fonts')
  if (el) el.remove()
})
</script>
