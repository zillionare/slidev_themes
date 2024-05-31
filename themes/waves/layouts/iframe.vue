<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    url: string
    scale?: number
    width?: number
}>(), {
    width: 0.66
})

const scaleInvertPercent = computed(() => `${(1 / (props.scale || 1)) * 100}%`)
const leftPanelStyle = computed(() => {
    return {
        "width": `${(1 - props.width) * 100}` + "%",
        "position": "absolute"
    }
})
const rightPanelStyle = computed(() => {
    return {
        "width": `${props.width * 100 + 8}` + "%",
        "position": "absolute",
        "top": "-13vh",
        "left": `${(1 - props.width) * 100}` + "%",
        "height": "130%"
    }
})


</script>

<template>
    <div class="w-full h-full">
        <div class="slidev-layout" :style="leftPanelStyle">
            <slot />
        </div>
        <div class="slidev-layout" :style="rightPanelStyle">
            <iframe id="frame" class="w-full h-full" allow="fullscreen" :src="url"
                :style="scale ? { transform: `scale(${scale})`, transformOrigin: 'top left' } : {}" />
        </div>
    </div>
</template>
