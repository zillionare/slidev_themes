<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  url: string
  scale?: number
  width?: number
}>(), {
    width: 0.5
})

const scaleInvertPercent = computed(() => `${(1 / (props.scale || 1)) * 100}%`)
const leftPanelSpan = computed(() => {
    return `col-span-${Math.floor((1 - props.width) * 10)}`
})

const rightPanelSpan = computed(() => {
    return `col-span-${Math.floor(props.width * 10)}`
})
</script>

<template>
  <div class="grid grid-cols-10 w-full h-full">
    <div class="slidev-layout default" v-bind="$attrs" :class="leftPanelSpan">
      <slot />
    </div>
    <div class="slidev-layout" :class="rightPanelSpan" :style="{ width: scaleInvertPercent, height: scaleInvertPercent }" relative>
      <iframe
        id="frame" class="w-full h-full"
        :src="url"
        :style="scale ? { transform: `scale(${scale})`, transformOrigin: 'top left' } : {}"
      />
    </div>
  </div>
</template>
