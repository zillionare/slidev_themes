import { defineAppSetup } from '@slidev/types'
import { nextTick } from 'vue'
import CutMeMask from './components/CutMeMask.vue'
import { setupKeyboardHandler, setCutMeMaskRef } from './utils/keyboardHandler.js'

export default defineAppSetup(({ app, router }) => {
  // 注册 CutMeMask 组件
  app.component('CutMeMask', CutMeMask)
  
  // 设置键盘事件处理器
  nextTick(() => {
    setupKeyboardHandler()
    
    // 尝试获取 CutMeMask 组件实例
    const findCutMeMaskInstance = () => {
      const cutMeMaskElements = document.querySelectorAll('[data-component="CutMeMask"]')
      if (cutMeMaskElements.length > 0) {
        // 这里需要通过 Vue 实例获取组件引用
        // 在实际使用中，用户需要手动设置引用
        console.log('CutMeMask component found, please set reference manually')
      }
    }
    
    setTimeout(findCutMeMaskInstance, 1000)
  })
})

// 导出组件和工具函数供直接使用
export {
  CutMeMask
}

// 导出键盘处理函数供手动控制
export {
  setupKeyboardHandler,
  setCutMeMaskRef
} from './utils/keyboardHandler.js'