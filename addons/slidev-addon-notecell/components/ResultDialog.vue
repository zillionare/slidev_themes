<template>
  <div 
    v-if="visible"
    class="result-dialog-overlay"
    @click="handleOverlayClick"
  >
    <div 
      ref="dialogRef"
      :class="dialogClass"
      @click.stop
    >
      <div class="result-dialog-header">
        <h3>执行结果</h3>
        <div class="result-dialog-actions">
          <button 
            @click="toggleFullscreen" 
            class="result-dialog-btn"
            :title="isFullscreen ? '退出全屏' : '全屏显示'"
          >
            {{ isFullscreen ? '⤓' : '⤢' }}
          </button>
          <button 
            @click="closeDialog" 
            class="result-dialog-btn"
            title="关闭"
          >
            ✕
          </button>
        </div>
      </div>
      <div class="result-dialog-content">
        <pre v-html="formattedResult"></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useEventListener } from '@vueuse/core'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  result: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const isFullscreen = ref(false)
const dialogRef = ref(null)



// 格式化结果内容
const formattedResult = computed(() => {
  if (!props.result) {
    return ''
  }
  
  // 确保 result 是字符串类型
  const resultStr = typeof props.result === 'string' ? props.result : String(props.result)
  
  // 如果结果包含 HTML 标签，直接返回
  if (resultStr.includes('<')) {
    return resultStr
  }
  
  // 否则将纯文本转换为 HTML，保留换行
  return resultStr.replace(/\n/g, '<br>')
})

// 切换全屏模式
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  nextTick(() => {
    if (dialogRef.value) {
      if (isFullscreen.value) {
        dialogRef.value.focus()
      }
    }
  })
}

// 关闭对话框
const closeDialog = () => {
  isFullscreen.value = false
  emit('close')
}

// ESC键关闭
useEventListener('keydown', (e) => {
  if (e.key === 'Escape' && props.visible) {
    closeDialog()
  }
})

// 点击遮罩关闭
const handleOverlayClick = (e) => {
  if (e.target === e.currentTarget) {
    closeDialog()
  }
}

// 计算样式
const dialogClass = computed(() => {
  return {
    'result-dialog': true,
    'fullscreen': isFullscreen.value
  }
})
</script>

<style scoped>
.result-dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10002;
  backdrop-filter: blur(2px);
  pointer-events: all;
}

.result-dialog {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 80%;
  max-height: 80%;
  width: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: none !important;
  position: relative;
.result-dialog.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;
    border-radius: 0;
    z-index: 10001;
    transform: none !important;
  }
}

.result-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  flex-shrink: 0;
}

.result-dialog-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #374151;
}

.result-dialog-actions {
  display: flex;
  gap: 8px;
}

.result-dialog-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  color: #6b7280;
  font-size: 16px;
  line-height: 1;
  transition: all 0.2s;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-dialog-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.result-dialog-content {
  flex: 1;
  padding: 20px;
  overflow: auto;
  background: white;
  min-height: 0;
}

.result-dialog-content pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #374151;
}

.no-result {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding: 40px 20px;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .result-dialog {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .result-dialog-header {
    background: #111827;
    border-bottom-color: #374151;
  }
  
  .result-dialog-header h3 {
    color: #f9fafb;
  }
  
  .result-dialog-btn {
    color: #9ca3af;
  }
  
  .result-dialog-btn:hover {
    background: #374151;
    color: #f9fafb;
  }
  
  .result-dialog-content {
    background: #1f2937;
  }
  
  .result-dialog-content pre {
    color: #f9fafb;
  }
  
  .no-result {
    color: #6b7280;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .result-dialog {
    max-width: 95%;
    max-height: 90%;
    width: 95%;
  }
  
  .result-dialog-header {
    padding: 12px 16px;
  }
  
  .result-dialog-header h3 {
    font-size: 16px;
  }
  
  .result-dialog-content {
    padding: 16px;
  }
  
  .result-dialog-content pre {
    font-size: 13px;
  }
}
</style>