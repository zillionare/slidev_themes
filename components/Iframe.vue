<script setup>
import { computed } from 'vue'

const props = defineProps({
    url: {
        type: String,
        required: true,
    },
    scale: {
        type: Number,
        default: 1,
    },
    left: {
        type: String,
        default: 0
    },
    top: {
        type: String,
        default: "-16%"
    },
    w: {
        type: String,
        default: "75%"
    },
    h: {
        type: String,
        default: "120%"
    },
    at: {
        type: [Array, Number],
        default: -1
    }
})

const style = computed(() => {
    return {
        "position": "absolute",
        "top": props.top,
        "left": props.left,
        "width": props.w,
        "height": props.h
    }
})

const show = computed(() => {
    if (Array.isArray(props.at)) {
        return props.at.includes($slidev.nav.clicks)
    } else {
        return [-1, $slidev.nav.clicks].includes(props.at)
    }
})
</script>

<style scoped></style>

<template>
    <iframe id="frame" v-if="show" class="w-full h-full" allow="fullscreen" :src="url" :style="style" />
</template>
