import { ref, nextTick } from 'vue'

// 全局状态管理
const metaKeyPressCount = ref(0)
const metaKeyTimer = ref(null)
const cutMeMaskRef = ref(null)

// Meta 键连击检测配置
const META_KEY_TIMEOUT = 500 // 500ms 内的连击才算有效
const DOUBLE_CLICK_THRESHOLD = 2
const TRIPLE_CLICK_THRESHOLD = 3

// 设置 CutMeMask 组件引用
export const setCutMeMaskRef = (ref) => {
  cutMeMaskRef.value = ref
}

// Meta 键处理函数
const handleMetaKeyPress = () => {
  metaKeyPressCount.value++
  
  // 清除之前的定时器
  if (metaKeyTimer.value) {
    clearTimeout(metaKeyTimer.value)
  }
  
  // 设置新的定时器
  metaKeyTimer.value = setTimeout(() => {
    const clickCount = metaKeyPressCount.value
    
    // 根据点击次数执行不同操作
    if (clickCount === DOUBLE_CLICK_THRESHOLD) {
      // 连按两次：显示 Cut Me 遮罩
      if (cutMeMaskRef.value && cutMeMaskRef.value.showCutMe) {
        cutMeMaskRef.value.showCutMe()
        console.log('Meta key double-clicked: Showing Cut Me mask')
      }
    } else if (clickCount === TRIPLE_CLICK_THRESHOLD) {
      // 连按三次：显示 Pause 遮罩
      if (cutMeMaskRef.value && cutMeMaskRef.value.showPause) {
        cutMeMaskRef.value.showPause()
        console.log('Meta key triple-clicked: Showing Pause mask')
      }
    }
    
    // 重置计数器
    metaKeyPressCount.value = 0
    metaKeyTimer.value = null
  }, META_KEY_TIMEOUT)
}

// 键盘事件监听器
const handleKeyDown = (event) => {
  // 检测 Meta 键（Mac 的 Cmd 键，Windows 的 Win 键）
  // keyCode 224 是 Mac 上的 Cmd 键，keyCode 91/92 是 Windows 上的 Win 键
  if (event.keyCode === 224 || event.keyCode === 91 || event.keyCode === 92 || event.metaKey) {
    event.preventDefault()
    handleMetaKeyPress()
  }
  
  // ESC 键隐藏所有遮罩
  if (event.key === 'Escape' || event.keyCode === 27) {
    if (cutMeMaskRef.value && cutMeMaskRef.value.hideAllMasks) {
      cutMeMaskRef.value.hideAllMasks()
    }
  }
}

// 设置键盘事件监听器
export const setupKeyboardHandler = () => {
  // 确保在客户端环境中运行
  if (typeof window !== 'undefined') {
    // 移除可能存在的旧监听器
    document.removeEventListener('keydown', handleKeyDown)
    
    // 添加新的监听器
    document.addEventListener('keydown', handleKeyDown)
    
    console.log('Keyboard handler setup completed')
    
    // 返回清理函数
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (metaKeyTimer.value) {
        clearTimeout(metaKeyTimer.value)
        metaKeyTimer.value = null
      }
      metaKeyPressCount.value = 0
    }
  }
  
  return () => {}
}

// 手动触发功能（用于测试或其他用途）
export const triggerCutMe = () => {
  if (cutMeMaskRef.value && cutMeMaskRef.value.showCutMe) {
    cutMeMaskRef.value.showCutMe()
  }
}

export const triggerPause = () => {
  if (cutMeMaskRef.value && cutMeMaskRef.value.showPause) {
    cutMeMaskRef.value.showPause()
  }
}

export const hideAllMasks = () => {
  if (cutMeMaskRef.value && cutMeMaskRef.value.hideAllMasks) {
    cutMeMaskRef.value.hideAllMasks()
  }
}

// 获取当前状态（用于调试）
export const getKeyboardHandlerState = () => {
  return {
    metaKeyPressCount: metaKeyPressCount.value,
    hasTimer: !!metaKeyTimer.value,
    hasCutMeMaskRef: !!cutMeMaskRef.value
  }
}