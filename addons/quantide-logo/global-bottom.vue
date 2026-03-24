<template>
  <div>
    <!-- CutMe Mask Component -->
    <CutMeMask ref="cutMeMaskRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CutMeMask from './components/CutMeMask.vue'
import { setCutMeMaskRef, setupKeyboardHandler, cleanupKeyboardHandler } from './utils/keyboardHandler.js'

const cutMeMaskRef = ref(null)

onMounted(() => {
  // 设置 CutMeMask 引用
  setCutMeMaskRef(cutMeMaskRef.value)
  
  // 设置键盘事件处理器
  setupKeyboardHandler()
})

onUnmounted(() => {
  // 清理键盘事件处理器
  cleanupKeyboardHandler()
})
</script>