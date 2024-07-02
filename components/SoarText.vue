<script setup>
import { onMounted, watchEffect, ref, createVNode, nextTick, reactive } from 'vue';
import Anime from './Anime.vue';
import tinycolor from 'tinycolor2';

const text = ref(null)
const lines = ref([])
const animes = reactive([])
const duplicates = ref({})
const container = ref(null)
const backgrounds = {}

const props = defineProps({
    maxLines: {
        type: Number,
        default: 3
    },
    enter: {
        type: Array,
        default: [
            'bounceIn',
            'bounceInDown',
            'bounceInLeft',
            'bounceInRight',
            'bounceInUp',
            'fadeIn',
            'fadeInDown',
            'fadeInDownBig',
            'fadeInLeft',
            'fadeInLeftBig',
            'fadeInRight',
            'fadeInRightBig',
            'fadeInUp',
            'fadeInUpBig',
            'fadeInTopLeft',
            'fadeInTopRight',
            'fadeInBottomLeft',
            'fadeInBottomRight',
            'flipInX',
            'flipInY',
            'lightSpeedInLeft',
            'lightSpeedRight',
            'rotateIn',
            'rotateInDownLeft',
            'rotateInDownRight',
            'rotateInUpLeft',
            'rotateInUpRight',
            'rollIn',
            'zoomIn',
            'zoomInDown',
            'zoomInLeft',
            'zoomInRight',
            'zoomInUp',
            'slideInDown',
            'slideInLeft',
            'slideInRight',
            'slideInUp',
        ]
    },
    exit: {
        type: Array,
        default: [
            'backOutDown',
            'backOutUp',
            'backOutLeft',
            'backOutRight',
            'bounceOut',
            'bounceOutDown',
            'bounceOutLeft',
            'bounceOutRight',
            'bounceOutUp',
            'fadeOut',
            'fadeOutDown',
            'fadeOutDownBig',
            'fadeOutLeft',
            'fadeOutLeftBig',
            'fadeOutRight',
            'fadeOutRightBig',
            'fadeOutUp',
            'fadeOutUpBig',
            'fadeOutTopLeft',
            'fadeOutTopRight',
            'fadeOutBottomLeft',
            'fadeOutBottomRight',
            'flipOutX',
            'flipOutY',
            'lightSpeedOutRight',
            'lightSpeedOutLeft',
            'rotateOut',
            'rotateOutDownLeft',
            'rotateOutDownRight',
            'rotateOutUpLeft',
            'rotateOutUpRight',
            'rollOut',
            'slideOutUp',
            'slideOutDown',
            'slideOutLeft',
            'slideOutRight',
            'zoomOut',
            'zoomOutDown',
            'zoomOutLeft',
            'zoomOutRight',
            'zoomOutUp',
        ]
    },
    offsetY: {// 文字出现时，离底部的距离
        type: Number,
        default: 0
    },
    colorMix: {//文字与背景颜色混合模式
        type: String,
        default: "difference"
    }
})

onMounted(() => {
    if (text.value !== null && $renderContext.value === 'slide') {
        animes.values = []

        text.value.textContent.split("\n").forEach(function (line) {
            if (line === "")
                return

            let [subtitle, background] = line.split(" ")
            lines.value.push(subtitle)
            if (background) {
                console.log("background:", lines.value.length, background, line)
                backgrounds[lines.value.length - 1] = background
            }
        })
    }
})

watchEffect(() => {
    if ($renderContext.value !== 'slide')
        return

    if ($clicks.value === 0) {
        animes.values = []
        duplicates.value = {}
    }

    // set background
    let img = backgrounds[$clicks.value]
    if (img !== undefined) {
        container.value.style.background = `rgba(0,0,0, 0.2) url("${img}") no-repeat center / cover`
    }

    let text = lines.value[$clicks.value]
    if (text === undefined || $clicks.value in duplicates.value) {
        return
    }

    let root = document.querySelector("div.slidev-layout")
    let computed = window.getComputedStyle(root)
    let rect = root.getBoundingClientRect()
    let width = root.clientWidth - parseInt(computed.paddingLeft) - parseInt(computed.paddingRight)
    let fontSize = Math.round(width / text.length)
    let bottom = rect.height - parseInt(computed.paddingBottom)

    let enter_action = Math.floor(Math.random() * props.enter.length)
    let anime = {
        text: text,
        action: props.enter[enter_action],
        style: {
            left: 0,
            fontSize: fontSize * 0.9 + "px",
            textAlign: "center",
            position: "absolute",
            width: "100%",
            lineHeight: fontSize * 1.2 + "px",
            color: tinycolor.random().lighten(props.lightAdjust).toHexString(),
            "mix-blend-mode": props.colorMix,
        }
    }
    animes.push(anime)

    duplicates.value[$clicks.value] = {
        text: text,
        top: rect.height * 0.8,
        fontSize: fontSize
    }

    let cum = 0
    for (let i = animes.length - 1; i >= 0; i--) {
        if (animes.length - i > props.maxLines) {
            console.log(animes.length, i)
            let j = Math.floor(Math.random() * props.exit.length);
            animes[i].action = props.exit[j]
        }
        let item = duplicates.value[i]
        if (item === undefined) {
            console.warn(`${i}th item not found, ${lines[i]}`)
            continue
        }
        cum += item.fontSize + 10
        animes[i].style.top = bottom - cum - props.offsetY + "px"
    }

})

</script>

<template>
    <div style="opacity: 0" ref="text">
        <slot />
    </div>
    <div v-bind="$attrs" v-motion ref="container">
        <Anime v-for="(anime, index) in animes" :key="index" :action="anime.action" :style="anime.style">{{ anime.text
            }}</Anime>
    </div>
</template>
<style scoped></style>
