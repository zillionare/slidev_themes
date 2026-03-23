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
  <div class="grid grid-cols-2 w-full h-full auto-rows-fr">
    <div class="slidev-layout image-right" :class="props.class">
      <slot />
    </div>
    <div class="w-full h-full" :style="style" />
  </div>
</template>
