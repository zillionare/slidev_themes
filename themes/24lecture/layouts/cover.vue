<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  background: {
    default: '/public/cover.png',
  }
})

const style = computed(() => handleBackground(props.background, false))
</script>
<style>
    .title {
        position: absolute;
        top: 10vh;
        font-size: 2rem;
        text-align: left;
        padding-left: 5%;
    }
</style>
<template>
  <div
    class="slidev-layout cover text-center"
    :style="style"
  >
    <div class="my-auto w-full title">
      {{ $slidev.nav.currentRoute.meta.title }}
    </div>
  </div>
</template>
