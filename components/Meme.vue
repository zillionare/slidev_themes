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
    delay: {
        type: Number,
        default: 0
    },
    dur: {
        type: Number,
        default: 3000
    }
})


const memes = {
    "goodbye-1": "https://images.jieyu.ai/images/hot/meme/goodby.gif",
    "doyouhavequestions": "https://images.jieyu.ai/images/hot/meme/do-you-have-questions.gif",
    "enenen": "https://images.jieyu.ai/images/hot/meme/enenen.gif",
    "nice": "https://images.jieyu.ai/images/hot/meme/enenen.gif",
    "crow": "https://images.jieyu.ai/images/hot/meme/crow.gif",
    "turtle": "https://images.jieyu.ai/images/hot/meme/turtle.gif",
    "anticipation": "https://images.jieyu.ai/images/hot/meme/anticipation.gif",
    "so-broken": "https://images.jieyu.ai/images/hot/meme/so-broken.gif",
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

// onMounted(() => {
//     setTimeout(() => {
//         var el = document.getElementById(Id.value)
//         var clz = el.getAttribute("class")
//         clz = clz.concat(" animate__animated animate__fadeOut")
//         el.setAttribute("class", clz)
//     }, props.delay + props.dur)
// })
</script>
<style scoped></style>

<template>
    <div v-if="show" :id="Id" v-bind="$attrs">
        <Audio :at="props.at" :name="props.name" :delay="props.delay" />
        <img :src="url" />
    </div>
</template>
