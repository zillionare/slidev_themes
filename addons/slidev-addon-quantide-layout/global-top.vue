
<template>
</template>

<script setup lang="ts">
import { computed, watchEffect, onBeforeUnmount } from 'vue'
import { getFontFamily } from './setup/fonts'
import './styles/font.css'

// Use the global $slidev object which is available in Slidev components
const fontFamily = computed(() => {
  // 1. 获取当前幻灯片的 frontmatter
  // Slidev 的 frontmatter 可能在 meta.frontmatter 或 meta.slide.frontmatter
  const meta = $slidev.nav.currentSlideRoute?.meta || {}
  const currentFrontmatter = meta.slide?.frontmatter || meta.frontmatter || {}
  
  // 2. 优先级：当前页 font > 当前页 fontFamily > 全局 configs.font > 全局 configs.fontFamily
  const f = currentFrontmatter.font || 
            currentFrontmatter.fontFamily || 
            $slidev.configs?.font || 
            $slidev.configs?.fontFamily
            
  return getFontFamily(f)
})

const codeFontFamily = computed(() => {
  const meta = $slidev.nav.currentSlideRoute?.meta || {}
  const currentFrontmatter = meta.slide?.frontmatter || meta.frontmatter || {}
  
  const f = currentFrontmatter.codeFont || 
            currentFrontmatter.codeFontFamily || 
            $slidev.configs?.codeFont || 
            $slidev.configs?.codeFontFamily
            
  return getFontFamily(f)
})

const cssContent = computed(() => {
  let styles = ''
  if (fontFamily.value) {
    // For font names without spaces, quotes are optional. 
    // For names with spaces, they are required.
    // We'll use the name directly if no spaces, otherwise wrap in single quotes.
    const ff = fontFamily.value.includes(' ') ? `'${fontFamily.value}'` : fontFamily.value
    styles += `
      :root {
        --slidev-theme-font-family: ${ff}, ui-sans-serif, system-ui, sans-serif !important;
      }
      /* 强制作用于所有幻灯片内容相关的元素 */
      html, body, #app, #slide-container, #slide-content, .slidev-layout, .slidev-content, .slidev-page,
      .slidev-layout h1, .slidev-layout h2, .slidev-layout h3, .slidev-layout p, .slidev-layout li, .slidev-layout span {
        font-family: ${ff}, ui-sans-serif, system-ui, sans-serif !important;
      }
    `
  }
  if (codeFontFamily.value) {
    const cff = codeFontFamily.value.includes(' ') ? `'${codeFontFamily.value}'` : codeFontFamily.value
    styles += `
      :root {
        --slidev-code-font-family: ${cff}, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
      }
      .slidev-layout code, .slidev-layout kbd, .slidev-layout samp, .slidev-layout pre, .slidev-code {
        font-family: ${cff}, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
      }
    `
  }
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
