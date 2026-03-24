<!-- 课程大纲，由一个mindmap图构成 -->

<script setup>
import { computed } from 'vue'
import TocComponent from '@slidev/client/builtin/Toc.vue'
import { handleBackground } from '../layoutHelper'

// 修改组件名为 QuantideToc 避免和内置的 Toc 产生潜在冲突
defineOptions({ name: 'QuantideTocLayout' })

const props = defineProps({
  image: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  imageOrder: {
    type: Number,
    default: 1
  }
})

// 兼容旧的 image 属性和新的 img 属性
const displayImg = computed(() => props.img || props.image || $frontmatter?.img || $frontmatter?.image)

const leftStyle = computed(() => {
  if (displayImg.value) {
    return handleBackground(displayImg.value, false)
  }
  return {}
})
</script>

<template>
  <div class="slidev-layout h-full w-full flex p-0">
    <!-- 左侧图片区 -->
    <div 
      v-if="displayImg" 
      class="w-1/2 h-full bg-cover bg-center bg-no-repeat" 
      :style="leftStyle"
    ></div>
    
    <!-- 右侧内容区 -->
    <div 
      class="h-full flex flex-col px-14 py-10 relative"
      :class="displayImg ? 'w-1/2' : 'w-full'"
    >
      <h1 class="text-center mt-0" style="margin: 50px">{{ $frontmatter.title || '课程内容' }}</h1>
      <hr class="w-full mb-8 border-t border-gray-300 dark:border-gray-600"/>
      
      <!-- 自动生成的目录结构 -->
      <div class="toc-container flex-1" style="overflow-y: hidden;">
        <TocComponent />
      </div>

      <div class="absolute inset-0 pointer-events-none">
          <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.toc-container {
  padding: 1rem 0;
  font-size: 1.2rem;
}
/* Slidev 内置的 <Toc /> 组件样式可能需要微调 */
:deep(.slidev-toc) {
  width: 100%;
}
:deep(.slidev-toc-item) {
  margin-bottom: 0.5rem;
}
:deep(.slidev-toc-item.level-1) {
  font-weight: bold;
  margin-top: 1rem;
}
</style>
