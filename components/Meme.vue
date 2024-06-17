<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
    at: {
        type: [Number, Array],
        default: 0
    },
    name: {
        type: String,
        required: true
    },
    top: {
        type: String,
        default: '50%'
    },
    left: {
        type: String,
        default: '50%'
    },
    h: {
        type: String,
        default: 'auto'
    },
    w: {
        type: String,
        default: 'auto'
    },
    delay: {
        type: Number,
        default: 0
    },
    dur: {
        type: Number,
        default: 3000
    }
})

const style = computed(() => {
    return {
        top: props.top,
        left: props.left,
        height: props.h,
        width: props.w,
    }
})

const memes = {
    "goodbye-1": "https://images.jieyu.ai/images/hot/goodby.gif",
    "doyouhavequestions": "https://images.jieyu.ai/images/hot/do-you-have-questions.gif",
    "enenen": "https://images.jieyu.ai/images/hot/enenen.gif",
    "nice": "https://images.jieyu.ai/images/hot/enenen.gif",
    "crow": "https://images.jieyu.ai/images/hot/crow.gif",
    "turtle": "https://images.jieyu.ai/images/hot/turtle.gif",
    "anticipation": "https://images.jieyu.ai/images/hot/anticipation.gif",
    // "so-broken": "https://images.jieyu.ai/images/hot/so-broken.gif",
    "so-broken": "https://images.jieyu.ai/images/hot/anticipation.gif",
}

const url = computed(() => {
    return memes[props.name]
})

const show = computed(() => {
    if (Array.isArray(props.at)) {
        return props.at.includes($slidev.nav.clicks)
    } else {
        return [-1, $slidev.nav.clicks].includes(props.at)
    }
})

const Id = computed(() => {
    console.info(`${props.name}-${props.at}-${props.dur}`)
    return `${props.name}-${props.at}-${props.dur}`
})

onMounted(() => {
    setTimeout(() => {
        var el = document.getElementById(Id.value)
        var clz = el.getAttribute("class")
        clz = clz.concat(" animate__animated animate__fadeOut")
        el.setAttribute("class", clz)
    }, props.delay + props.dur)
})
</script>
<style scoped></style>

<template>
    <div v-if="show" class="abs" :id="Id" :style="style">
        <Audio :at="props.at" :name="props.name" :delay="props.delay" />
        <img :src="url" />
    </div>
</template>
