<!--
  Usage:
```md
---
layout: two-cols
---

# Left
This shows on the left
::right::
# Right
This shows on the right
```
-->

<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  class: {
    type: String,
  },
  layoutClass: {
    type: String,
  },
  leftSize: {
    type: String,
    default: '1fr',
  }
})

const gridStyle = computed(() => {
  const left = props.leftSize === '1fr' ? '1fr' : props.leftSize
  return {
    gridTemplateColumns: `${left} 1fr`
  }
})
</script>

<template>
  <div class="slidev-layout two-cols-header w-full h-full" :class="layoutClass">
    <div class="two-cols-container" :style="gridStyle">
      <div class="col-left" :class="props.class">
        <slot name="default" />
        <slot name="left" />
      </div>
      <div class="col-right" :class="props.class">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-cols-container {
  display: grid;
  gap: 40px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-items: start;
}

.col-left, .col-right {
  height: 100%;
  width: 100%;
  position: relative;
}

.col-left > :deep(*:first-child),
.col-right > :deep(*:first-child) {
  margin-top: 0 !important;
}
</style>
