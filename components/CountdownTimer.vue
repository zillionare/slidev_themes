<!-- 

    <CountdownTimer :count=5 class="abs top-10% left-350px z-1"/>

-->
<script setup>

import { ref, onMounted, computed } from 'vue'


const video = ref(null)
const root = ref(null)
const props = defineProps({
    "count": {
        type: Number,
        default: 29
    },
    "scale": {
        type: Number,
        default: 0.6
    },
    "msg": {
        type: String,
        default: ""
    },
    "color": {
        type: String,
        default: "red"
    }
})

const rootStyle = computed(() => {
    return {
        'transform': `scale(${props.scale})`,
        'display': 'flex',
        'flex-flow': 'column',
        'align-items': 'center'
    }
})
const play = () => {
    video.value.play()
}


onMounted(() => {
    video.value.currentTime = 29 - parseInt(props.count)
})

</script>
<template>
    <div class="$attrs.class" ref="root" :style="rootStyle" @click="play">
        <Device kind="apple-watch-ultra" :scale="props.scale">
            <video ref="video" class="background-video"
                src="https://images.jieyu.ai/images/hot/countdown-timer-30.mp4" />
        </Device>
        <div :style="{ marginTop: '-4em', color: props.color }">{{ props.msg }}</div>
    </div>
</template>
<style>
.background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
