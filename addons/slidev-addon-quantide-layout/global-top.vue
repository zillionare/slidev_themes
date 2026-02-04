
<template>
  <!-- 自动播放倒计时进度条 -->
  <div 
    v-if="currentCountdown.total > 0" 
    class="fixed bottom-0 left-0 h-1 bg-blue-500/50 z-[99999] transition-all duration-100 ease-linear"
    :style="{ width: `${currentCountdown.progress}%` }"
  ></div>
</template>

<script setup lang="ts">
import { computed, watchEffect, onBeforeUnmount, watch, ref, onMounted } from 'vue'
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
const currentCountdown = ref({ progress: 0, total: 0 })
let countdownInterval: any = null

const clearTimers = () => {
  timers.value.forEach(t => clearTimeout(t))
  timers.value = []
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
  currentCountdown.value = { progress: 0, total: 0 }
}

const startCountdown = (durationSeconds: number, onComplete: () => void) => {
  if (durationSeconds <= 0) {
    onComplete()
    return
  }

  const totalMs = durationSeconds * 1000
  const start = Date.now()
  currentCountdown.value = { progress: 0, total: durationSeconds }

  countdownInterval = setInterval(() => {
    const elapsed = Date.now() - start
    const progress = Math.min((elapsed / totalMs) * 100, 100)
    currentCountdown.value.progress = progress

    if (elapsed >= totalMs) {
      clearInterval(countdownInterval)
      countdownInterval = null
      onComplete()
    }
  }, 50) // 50ms 更新一次进度条，保证流畅
}

const runAutoPlay = (page: number, clicks: number) => {
  const frontmatter = getFrontmatter()
  const autoPlay = frontmatter.autoPlay

  if (Array.isArray(autoPlay)) {
    // 检查自动播放是否被手动禁用 (通过彩排面板中的开关)
    if (typeof window !== 'undefined' && (window as any).__slidev_autoplay_disabled) {
      console.log(`[AutoPlay] 自动播放当前处于手动模式 (MANUAL)，已暂停。`)
      return
    }

    // 延迟等待 Slidev 完成 DOM 状态更新
    const t = setTimeout(() => {
      if ($slidev.nav.currentPage !== page || $slidev.nav.clicks !== clicks) return
      
      // 情况 1：刚进入页面 (clicks === 0)
      if (clicks === 0) {
        const firstDuration = autoPlay[0]
        if (typeof firstDuration === 'number' && firstDuration > 0) {
          console.log(`[AutoPlay] 第 ${page} 页: 首页进入，检测到首个时长 ${firstDuration}s，开始计时跳转 (进入 Click 1)`)
          startCountdown(firstDuration, () => {
            if ($slidev.nav.currentPage === page && $slidev.nav.clicks === 0) {
              $slidev.nav.next()
            }
          })
        } else {
          // 如果数组第一个值不是有效时长，则立即跳转 (保持原逻辑兼容)
          console.log(`[AutoPlay] 第 ${page} 页: 首页进入，未发现有效首个时长，立即发起跳转`)
          $slidev.nav.next()
        }
        return
      }

      // 情况 2：在某个 click 步骤中 (newClicks > 0)
      // autoPlay[newClicks] 对应当前 Click 完成后的等待时间
      const duration = autoPlay[clicks]
      
      if (typeof duration === 'number' && duration >= 0) {
        if (duration === 0) {
          console.log(`[AutoPlay] 第 ${page} 页, 当前步数 ${clicks}: 时长为 0，微延迟后执行跳转`)
          const jumpTimer = setTimeout(() => {
            if ($slidev.nav.currentPage === page && $slidev.nav.clicks === clicks) {
              $slidev.nav.next()
            }
          }, 100) // 给 100ms 缓冲，防止瞬间连跳
          timers.value.push(jumpTimer)
        } else {
          console.log(`[AutoPlay] 第 ${page} 页, 当前步数 ${clicks}: 数组配置时长 ${duration}s，将在 ${duration}s 后跳转`)
          startCountdown(duration, () => {
            if ($slidev.nav.currentPage === page && $slidev.nav.clicks === clicks) {
              $slidev.nav.next()
            }
          })
        }
      } else {
        console.log(`[AutoPlay] 第 ${page} 页, 当前步数 ${clicks}: 数组中未找到对应的有效时长配置，自动播放停止。`)
      }
    }, 150)
    timers.value.push(t)
  }
}

// 核心播放逻辑
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
  
  runAutoPlay(newPage, newClicks)
}, { immediate: true })

onMounted(() => {
  window.addEventListener('slidev-autoplay-toggle', (e: any) => {
    const { disabled } = e.detail
    if (disabled) {
      clearTimers()
      console.log(`[AutoPlay] 切换至手动模式，已清除所有计时器。`)
    } else {
      console.log(`[AutoPlay] 切换至自动模式，尝试恢复播放...`)
      clearTimers()
      runAutoPlay($slidev.nav.currentPage, $slidev.nav.clicks)
    }
  })
})

onBeforeUnmount(() => {
  clearTimers()
  if (typeof document === 'undefined') return
  const el = document.getElementById('slidev-custom-fonts')
  if (el) el.remove()
})
</script>
