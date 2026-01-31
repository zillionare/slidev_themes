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
  }
})

</script>

<template>
  <div class="slidev-layout two-cols-header w-full h-full" :class="layoutClass">
    <div class="two-cols-container">
      <div class="col-left" :class="props.class">
        <slot name="default" />
      </div>
      <div class="col-right" :class="props.class">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-cols-header {
  padding: 0 !important;
}

.two-cols-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.col-left, .col-right {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
