<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// 状态存储
const isVisible = ref(false)
const isAutoPlayEnabled = ref(false)

// 同步状态到全局，供 autoPlay 逻辑检测
watch([isVisible, isAutoPlayEnabled], ([visible, autoPlay]) => {
  if (typeof window !== 'undefined') {
    // 逻辑调整：由 isAutoPlayEnabled 开关决定是否禁用自动播放
    const isDisabled = !autoPlay
    ;(window as any).__slidev_autoplay_disabled = isDisabled
    window.dispatchEvent(new CustomEvent('slidev-autoplay-toggle', { detail: { disabled: isDisabled } }))
  }
}, { immediate: true })
const sessionStartTime = ref(Date.now())
const allRecords = ref<Record<number, { durations: number[], audioStart: number, wpm?: number }>>({})
const lastTimestamp = ref(Date.now())

// 切换面板显示
const togglePanel = () => {
  isVisible.value = !isVisible.value
}

// 记录逻辑
watch(() => [$slidev.nav.currentPage, $slidev.nav.clicks], ([newPage, newClicks], oldVal) => {
  const now = Date.now()
  const delta = (now - lastTimestamp.value) / 1000
  lastTimestamp.value = now

  const oldPage = oldVal ? oldVal[0] : undefined
  const oldClicks = oldVal ? oldVal[1] : undefined

  // 1. 处理回退逻辑 (Back Navigation)
  if (oldPage !== undefined && (newPage < oldPage || (newPage === oldPage && newClicks < oldClicks))) {
    console.log('[Rehearsal] Back navigation detected.')
    
    // 如果是同页回退或跨页回退，尝试弹出上一项时长
    const record = allRecords.value[newPage]
    if (record && record.durations.length > 0) {
      const popped = record.durations.pop()
      console.log(`[Rehearsal] Popped last duration: ${popped}s. Remaining: ${record.durations.length}`)
      
      // 回退后，如果是跨页，可能需要重新计算 audioStart
      if (newPage < oldPage) {
        recalculateAllAudioStarts()
      }
      
      // 静默保存更新后的状态
      savePageRecord(newPage, true)
    }
    return
  }

  // 2. 初始化当前页记录
  if (!allRecords.value[newPage]) {
    let initialAudioStart = 0
    // 如果不是第一页，尝试从前一页计算累加值
    if (newPage > 1) {
      const prevPageRecord = allRecords.value[newPage - 1]
      if (prevPageRecord) {
        const prevTotal = prevPageRecord.durations.reduce((a, b) => a + b, 0)
        initialAudioStart = prevPageRecord.audioStart + Math.round(prevTotal * 1000)
      } else {
        // 如果前一页没记录，回退到基于 session 开始时间的计算 (兜底)
        initialAudioStart = now - sessionStartTime.value
      }
    }

    allRecords.value[newPage] = {
      durations: [],
      audioStart: initialAudioStart,
      wpm: $slidev.nav.slides[newPage - 1]?.frontmatter?.wordsPerMinute || $slidev.configs.wordsPerMinute || 300
    }
  }

  if (oldPage === undefined) return

  // 3. 正常前进记录
  if (newPage !== oldPage) {
    // 跨页：记录上一页最后一步到翻页的时间
    allRecords.value[oldPage].durations.push(Number(delta.toFixed(2)))
    
    // 更新新页面的 audioStart，确保它等于上一页 audioStart + 上一页所有 durations 之和
    const prevRecord = allRecords.value[oldPage]
    const totalDuration = prevRecord.durations.reduce((a, b) => a + b, 0)
    allRecords.value[newPage].audioStart = prevRecord.audioStart + Math.round(totalDuration * 1000)
    
  } else if (newClicks !== oldClicks) {
    // 同页内点击
    allRecords.value[oldPage].durations.push(Number(delta.toFixed(2)))
  }
}, { immediate: true })

// 重新计算特定页面的音频开始时间
const recalculateAudioStart = (pageNum: number) => {
  recalculateAllAudioStarts()
}

// 修改保存逻辑，支持双击复制为 YAML 片段
const savePageRecord = (page: number, quiet = false) => {
  const record = allRecords.value[page]
  if (!record) return
  
  const durations = [...record.durations]
  const audioStartValue = record.audioStart
  const wpmValue = record.wpm || $slidev.configs.wordsPerMinute || 300

  // 1. 同步到内存 (即时生效)
  const slide = $slidev.nav.slides[page - 1]
  if (slide) {
    if (slide.meta && slide.meta.slide) {
      slide.meta.slide.frontmatter.audioStart = audioStartValue
      slide.meta.slide.frontmatter.autoPlay = durations
      slide.meta.slide.frontmatter.wordsPerMinute = wpmValue
    }
    if (slide.frontmatter) {
      slide.frontmatter.audioStart = audioStartValue
      slide.frontmatter.autoPlay = durations
      slide.frontmatter.wordsPerMinute = wpmValue
    }
  }

  // 2. 构造 YAML 片段并复制到剪贴板
  let yamlLines = []
  
  // autoPlay (必须包含)
  yamlLines.push(`autoPlay: [${durations.join(', ')}]`)
  
  // audioStart (如果不为0)
  if (audioStartValue !== 0) {
    yamlLines.push(`audioStart: ${audioStartValue}`)
  }
  
  // wordsPerMinute (如果与全局配置不同)
  const globalWpm = $slidev.configs.wordsPerMinute || 300
  if (wpmValue !== globalWpm) {
    yamlLines.push(`wordsPerMinute: ${wpmValue}`)
  }

  const yamlText = yamlLines.join('\n')
  
  // 3. 仅在非 quiet 模式下复制到剪贴板并弹出提示 (通常用于双击标题)
  if (!quiet && typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(yamlText).then(() => {
        console.log(`[Rehearsal] Page ${page} synced and YAML copied:\n${yamlText}`)
        alert('已复制！\n\n' + yamlText)
      }).catch(err => {
        console.error('[Rehearsal] Failed to copy YAML:', err)
        alert('复制失败，请查看控制台日志')
      })
  } else {
    console.log(`[Rehearsal] Page ${page} synced to memory (quiet)`)
  }
}

const estimateDurationsFromDOM = () => {
  console.log('[Rehearsal] Starting estimateDurations from DOM...')
  
  // 查找 Presenter 视图中的 Notes 容器
  const notesContainer = document.querySelector('.slidev-note.prose') || document.querySelector('.prose')
  
  if (!notesContainer) {
    console.error('[Rehearsal] Could not find notes container in DOM. Please ensure you are in Presenter View.')
    alert('未能找到 Notes 容器。请确保您处于演讲者模式（Presenter View），且右侧备注栏已显示。')
    return
  }

  const pageNum = $slidev.nav.currentPage
  const wpm = allRecords.value[pageNum]?.wpm || $slidev.configs.wordsPerMinute || 300
  
  // 获取所有子元素
  const children = Array.from(notesContainer.children)
  let segments: string[] = []
  let currentSegmentText = ''

  children.forEach(el => {
    // 检查当前元素是否是 [click] 标记，或者包含标记
    const clickMark = el.classList.contains('slidev-note-click-mark') 
      ? el 
      : el.querySelector('.slidev-note-click-mark')
    
    if (clickMark) {
      // 遇到 [click]
      // 1. 如果 [click] 所在的元素除了标记外还有文本，我们需要把文本提取出来
      // 克隆一份，移除标记，拿剩下的文本
      const clone = el.cloneNode(true) as HTMLElement
      const markInClone = clone.classList.contains('slidev-note-click-mark')
        ? clone
        : clone.querySelector('.slidev-note-click-mark')
      
      if (markInClone) markInClone.remove()
      const remainingText = clone.innerText.trim()

      // 2. 将当前累积的文本保存为一段
      segments.push(currentSegmentText.trim())
      
      // 3. 将 [click] 元素内剩余的文本作为下一段的开始
      currentSegmentText = remainingText + ' '
    } else {
      // 累积文本内容
      currentSegmentText += el.innerText + ' '
    }
  })
  
  // 别忘了最后一段
  segments.push(currentSegmentText.trim())

  console.log(`[Rehearsal] DOM segments found: ${segments.length}`, segments)

  const durations = segments.map(text => calculateDuration(text, wpm))

  if (!allRecords.value[pageNum]) {
    allRecords.value[pageNum] = { durations: [], audioStart: 0, wpm: wpm }
  }
  allRecords.value[pageNum].durations = durations
  
  recalculateAllAudioStarts()
  savePageRecord(pageNum, true) // 预估后静默同步到内存
  console.log(`[Rehearsal] Page ${pageNum} estimated from DOM:`, JSON.stringify(durations))
}



// 辅助函数：格式化显示，不带 []
const formatDurationsDisplay = (durations: number[]) => {
  return durations.join(', ')
}

// 辅助函数：解析用户输入的逗号分隔字符串
const parseDurationsInput = (input: string) => {
  return input.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v))
}

const calculateDuration = (text: string, wpm: number) => {
  // 1. 移除内部的 [duration: xxx] 标签，避免计入字数
  let cleanText = text.replace(/\[\s*duration\s*:\s*[\d.]+\s*\]/gi, '')
  
  // 2. 移除 HTML 标签
  cleanText = cleanText.replace(/<[^>]+>/g, '')

  const trimmedText = cleanText.trim()
  if (trimmedText.length === 0) return 0 // 空台词（通常是连续 [click] 或开头 [click]）时间为 0
  
  // 权重统计逻辑
  let weightedLength = 0
  for (const char of trimmedText) {
    if (/\s/.test(char)) continue // 忽略空白符
    
    if (char === '，' || char === ',') {
      weightedLength += 1
    } else if (char === '。' || char === '.' || char === '？' || char === '?' || char === '！' || char === '!') {
      weightedLength += 2
    } else if (char === '：' || char === ':') {
      weightedLength += 1
    } else {
      // 普通字符算1个权重 (汉字、字母等)
      weightedLength += 1
    }
  }
  
  const buffer = $slidev.configs.rehearsalBuffer ?? 0.5
  const duration = (weightedLength / wpm) * 60
  return parseFloat((duration + buffer).toFixed(2))
}

const recalculateAllAudioStarts = () => {
  let currentTotal = 0
  const sortedPages = Object.keys(allRecords.value).map(Number).sort((a, b) => a - b)
  
  sortedPages.forEach(page => {
    allRecords.value[page].audioStart = currentTotal
    const pageTotal = allRecords.value[page].durations.reduce((a, b) => a + b, 0)
    currentTotal += Math.round(pageTotal * 1000)
  })
}

// 清空记录
const clearCurrentRecord = () => {
    const pageNum = $slidev.nav.currentPage
    if (allRecords.value[pageNum]) {
      allRecords.value[pageNum] = { durations: [], audioStart: 0 }
      console.log(`[Rehearsal] Cleared record for Page ${pageNum}`)
    }
  }

  const clearRecords = () => {
  allRecords.value = {}
  sessionStartTime.value = Date.now()
  lastTimestamp.value = Date.now()
}

// 快捷键支持 (Alt + R 切换面板)
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'r') {
      togglePanel()
    }
  })
})
</script>

<template>
  <!-- 仅在 Presenter 模式下显示 -->
  <template v-if="$slidev.nav.isPresenter">
    <!-- 悬浮按钮 -->
    <div 
      class="fixed bottom-4 left-4 z-[9999] cursor-pointer bg-blue-600/80 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors slidev-rehearsal-ui"
      title="彩排记录器 (Alt+R)"
      @click="togglePanel"
    >
      <div class="i-carbon-timer w-6 h-6" />
    </div>

    <!-- 结果面板 -->
    <div 
      v-if="isVisible"
      class="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-[10000] p-6 overflow-y-auto border-r border-gray-200 text-sm font-sans slidev-rehearsal-ui"
      style="color: #333;"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold flex items-center gap-2">
          <div class="i-carbon-report w-6 h-6 text-blue-600" />
          彩排记录
        </h2>
        <div class="flex items-center gap-3">
          <!-- 自动播放开关 -->
          <button 
            @click="isAutoPlayEnabled = !isAutoPlayEnabled"
            class="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold transition-all border"
            :class="isAutoPlayEnabled ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'"
            :title="isAutoPlayEnabled ? '自动播放已开启' : '自动播放已关闭'"
          >
            <div :class="isAutoPlayEnabled ? 'i-carbon-play-filled' : 'i-carbon-pause-outline'" class="w-3 h-3" />
            {{ isAutoPlayEnabled ? 'AUTO' : 'MANUAL' }}
          </button>
          
          <button @click="isVisible = false" class="hover:text-red-500 transition-colors">
            <div class="i-carbon-close w-6 h-6" />
          </button>
        </div>
      </div>

      <div v-if="Object.keys(allRecords).length === 0" class="text-gray-400 italic text-center py-10">
        暂无记录，请开始演示...
      </div>

      <div v-for="(record, page) in allRecords" :key="page" 
        class="mb-4 group p-2 rounded-lg transition-all border border-transparent hover:border-blue-100 bg-gray-50/30"
        title="双击标题保存到 Frontmatter"
      >
        <div class="flex justify-between items-baseline border-b border-gray-100 pb-1 mb-2 cursor-pointer" @dblclick="savePageRecord(Number(page))">
          <span class="font-bold text-blue-700">Slide {{ page }}</span>
          <span class="text-[10px] text-gray-400 uppercase tracking-widest">{{ record.durations.length }} Clicks</span>
        </div>
        
        <!-- autoPlay 配置 (支持编辑) -->
        <div class="space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono text-gray-500">autoPlay</span>
            <span class="text-[10px] text-gray-400">s</span>
          </div>
          <div 
            class="font-mono text-sm bg-gray-50/50 p-1.5 rounded border border-gray-200 min-h-[28px] focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
            contenteditable="true"
            @blur="(e) => {
              const val = parseDurationsInput((e.target as HTMLElement).innerText);
              allRecords[Number(page)].durations = val;
              savePageRecord(Number(page), true);
            }"
            @keydown.enter.prevent="(e) => (e.target as HTMLElement).blur()"
          >{{ formatDurationsDisplay(record.durations) }}</div>
        </div>
        
        <!-- audioStart 和 语速 (WPM) 配置 -->
        <div class="grid grid-cols-2 gap-2 mt-2">
          <!-- audioStart -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-gray-500">audioStart</span>
              <span class="text-[10px] text-gray-400">ms</span>
            </div>
            <input 
              type="number" 
              v-model.number="record.audioStart"
              @change="savePageRecord(Number(page), true)"
              class="w-full font-mono text-sm bg-gray-50/50 p-1.5 rounded border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
            />
          </div>
          
          <!-- WPM (支持编辑) -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-gray-500">语速</span>
              <span class="text-[10px] text-gray-400">words/min</span>
            </div>
            <input 
              type="number" 
              v-model.number="record.wpm"
              @change="savePageRecord(Number(page), true)"
              class="w-full font-mono text-sm bg-gray-50/50 p-1.5 rounded border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-gray-300"
            />
          </div>
        </div>
      </div>

      <div class="mt-8">
        <button 
          @click="estimateDurationsFromDOM"
          class="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          title="基于当前页面 DOM 渲染内容生成预估时间"
        >
          <div class="i-carbon-flash w-4 h-4" />
          时间预估
        </button>
      </div>
    </div>
  </template>
</template>

<style scoped>
/* 确保面板内的样式不受幻灯片全局样式干扰 */
.font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
.font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }

/* 关键：使用 print 媒体查询在打印/导出 PDF 时隐藏 */
@media print {
  .slidev-rehearsal-ui {
    display: none !important;
  }
}

/* 针对 Slidev 导出模式的特殊处理 */
:global(.slidev-export) .slidev-rehearsal-ui {
  display: none !important;
}

/* 针对 Presenter 模式以外的遮挡处理 */
:global(.slidev-presenter) .slidev-rehearsal-ui {
  z-index: 99999;
}
</style>
