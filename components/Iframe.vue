<script setup>
import { computed } from 'vue'

const props = defineProps({
    url: {
        type: String,
        required: true,
    },
    w: {
        type: String,
        default: "75%"
    },
    h: {
        type: String,
        default: "120%"
    }
})

const style = computed(() => {
    return {
        "top": props.top,
        "left": props.left
    }
})

</script>

<style scoped></style>

<template>
    <iframe id="frame" v-motion allow="fullscreen" :src="url" :width="props.w" :height="props.h"
        :class="$attrs.class" />
</template>
