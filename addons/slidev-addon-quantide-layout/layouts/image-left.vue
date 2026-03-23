<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
    image: {
        type: String,
    }
})

const style = computed(() => handleBackground(props.image))
</script>

<template>
    <div class="grid grid-cols-2 w-full h-full auto-rows-fr">
        <div class="w-full w-full" :style="style" style="margin-top:56.25px;opacity:0.8" />
        <div class="slidev-layout image-left">
            <slot />
        </div>
    </div>
</template>
