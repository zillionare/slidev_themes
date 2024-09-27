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
        default: 0.5
    },
    "q": {
        type: String,
        default: ""
    },
    "color": {
        type: String,
        default: "white"
    },
    "at": {
        type: Number,
        default: -1
    }
})

const rootStyle = computed(() => {
    return {
        'transform': `scale(${props.scale})`
    }
})
const play = () => {
    video.value.play()
    setTimeout(() => {
        root.value.style.display = 'none'
    }, props.count * 1000)
}

onMounted(() => {
    if (video.value) {
        video.value.currentTime = 29 - parseInt(props.count)
    }
})

const msg = computed(() => {
    if ($renderContext.value === 'presenter') {
        return "⚠️ 在演播界面中点击开始！ ⚠️ "
    } else {
        return props.q
    }
})

</script>
<template>
    <div v-if="props.at === $clicks" :class="[$attrs.class, 'wrapper']" ref="root" @click="play">
        <Device kind="apple-watch-ultra" :style="rootStyle" :scale="props.scale">
            <video ref="video" class="background-video"
                src="https://images.jieyu.ai/images/hot/countdown-timer-30.mp4" />
        </Device>
        <div :style="{ marginTop: '-4em', color: props.color, textAlign: 'center' }" v-html="msg"></div>
    </div>
</template>
<style scoped>
.wrapper {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: start;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

}

.background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
