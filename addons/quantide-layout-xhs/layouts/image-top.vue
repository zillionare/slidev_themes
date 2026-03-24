<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  image: {
    type: String,
  },
  img: {
    type: String,
  },
  class: {
    type: String,
  },
})

const style = computed(() => handleBackground(props.img || props.image))
</script>

<template>
  <div class="grid grid-rows-2 w-full h-full auto-cols-fr">
    <div class="w-full h-full" :style="style" />
    <div class="slidev-layout image-top" :class="props.class">
      <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
      <slot />
    </div>
  </div>
</template>
