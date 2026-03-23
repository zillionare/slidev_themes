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
        <div class="w-full h-full" :style="style" />
        <div class="slidev-layout image-left" :class="props.class">
            <slot />
        </div>
    </div>
</template>
