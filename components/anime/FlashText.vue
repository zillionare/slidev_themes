<script setup lang="ts">
import { computed } from 'vue'

// const props = defineProps({
//     fontSize: {
//         type: String,
//         default: '5vw'
//     }
// })

// const style = computed(() => {
//     return {
//         "fontSize": props.fontSize
//     }
// })
</script>
<style>
.janestreet-text {
    position: absolute;
    right: 2vw;
    background-image: linear-gradient(-225deg,
            #231557 0%,
            #44107a 29%,
            #ff1361 67%,
            #fff800 100%);
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    color: transparent;
    animation: textclip 2s linear infinite;
}

@keyframes textclip {
    to {
        background-position: 200% center;
    }
}
</style>
<template>
    <div :class="[$attrs.class, 'janestreet-text']">
        <slot></slot>
    </div>
</template>
