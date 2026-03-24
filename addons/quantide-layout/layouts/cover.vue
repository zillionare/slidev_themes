<!--
default cover page, allow more customization, by using slot
-->
<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  background: {
    // random image from a curated Unsplash collection by Anthony
    default: 'https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/slidev/landscape/background/lab-mint.jpg',
  },
})

const style = computed(() => handleBackground(props.background, true))
</script>

<template>
  <div
    class="slidev-layout cover text-center"
    :style="style"
  >
    <div class="my-auto w-full">
      <slot />
    </div>
  </div>
</template>
