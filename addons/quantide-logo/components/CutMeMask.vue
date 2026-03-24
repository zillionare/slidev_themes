<template>
  <div 
    v-if="showCutMask" 
    class="cut-me"
    :style="cutMeStyle"
  >
    <div class="cut-me-content">
      <div class="cut-me-icon">✂️</div>
      <div class="cut-me-text">Cut Me</div>
    </div>
  </div>
  
  <div 
    v-if="showPauseMask" 
    class="pause-mask"
  >
    <div class="pause-content">
      <div class="pause-icon">⏸️</div>
      <div class="pause-text">Paused</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

// 控制遮罩显示状态
const showCutMask = ref(false)
const showPauseMask = ref(false)

// Cut Me 遮罩样式
const cutMeStyle = computed(() => ({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(10px)'
}))

// 显示 Cut Me 遮罩
const showCutMe = () => {
  showCutMask.value = true
  showPauseMask.value = false
}

// 显示 Pause 遮罩
const showPause = () => {
  showPauseMask.value = true
  showCutMask.value = false
}

// 隐藏所有遮罩
const hideAllMasks = () => {
  showCutMask.value = false
  showPauseMask.value = false
}

// 暴露方法给父组件或全局使用
defineExpose({
  showCutMe,
  showPause,
  hideAllMasks
})

// 监听键盘事件（ESC 键隐藏遮罩）
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    hideAllMasks()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.cut-me {
  animation: fadeIn 0.3s ease-in-out;
}

.cut-me-content {
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  animation: pulse 2s infinite;
}

.cut-me-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: rotate 2s linear infinite;
}

.cut-me-text {
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.pause-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(15px);
  animation: fadeIn 0.3s ease-in-out;
}

.pause-content {
  text-align: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.pause-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: blink 1.5s infinite;
}

.pause-text {
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0.3;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .cut-me-content,
  .pause-content {
    font-size: 1.5rem;
  }
  
  .cut-me-icon,
  .pause-icon {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .cut-me-content,
  .pause-content {
    font-size: 1.2rem;
  }
  
  .cut-me-icon,
  .pause-icon {
    font-size: 2.5rem;
  }
}
</style>