<!--象演员表一样向上滚动-->
<script setup>
import { onMounted } from 'vue'
import { computed } from 'vue'
import { product, makeArr, choice } from '../tools'
import { parseRangeString } from '@slidev/parser/core'

const props = defineProps({
    at: {
        required: true
    },
    left: {
        type: String,
        default: "50%"
    },
    top: {
        type: String,
        default: "25%"
    },
    w: {
        type: String,
        default: "50%",
    },
    h: {
        type: String,
        default: "50%",
    },
    perspective: {
        type: String,
        default: "400px",
    },
    rx: {/*rotationX*/
        type: String,
        default: "45"
    },
    tyStart: {
        type: String,
        default: "100%"
    },
    tyEnd: {
        type: String,
        default: "-110%"
    },
    z: {
        type: String,
        default: "20"
    },
    bg: {
        type: String,
        default: "rgba(0, 0, 0, 0.75)"
    },
    dur: {
        type: String,
        // 5 seconds
        default: "5"
    }
})

const show = computed(() => {
    var at = props.at
    if (at === undefined) {
        return false
    }

    if (typeof (at) === "number") {
        at = String(at)
    }

    var ranges = parseRangeString(10, at)
    if (ranges.includes($slidev.nav.clicks)) {
        return true
    } else {
        return false
    }
})

const wrapperStyle = computed(() => {
    var style_ = {
        "left": props.left,
        "top": props.top,
        "width": props.w,
        "height": props.h,
        "perspective": props.perspective,
        "z-index": parseInt(props.z),
        "position": "absolute",
        "padding": "10% 0"
    }

    return style_
})

const childStyle = computed(() => {
    var style_ = {
        "transform": `rotateX(${props.rx}deg)`,
        "overflow-y": "hidden"
    }

    return style_
})

const scrollable = computed(() => {
    return {
        "animation": `cast-motion ${props.dur}s linear forwards`,
        "transform": `translateY(-${props.tyStart})`,
        "background": props.bg,
    }
})

onMounted(() => {
    const keyframesName = 'cast-motion';
    const existingKeyframes = Array.from(document.styleSheets).reduce((result, sheet) => {
        try {
            // 尝试访问sheet.cssRules，某些情况下可能抛出安全错误
            return [...result, ...Array.from(sheet.cssRules).filter(rule => rule.key && rule.key === `@keyframes ${keyframesName}`)];
        } catch (e) {
            return result;
        }
    }, []);

    if (existingKeyframes.length > 0) {
        // 如果keyframes已存在，则直接使用
        console.log('Keyframes already exists. Reusing it.');
    } else {
        var ss = document.createElement('style');
        ss.innerHTML = `
            @keyframes cast-motion {
                0% {
                    transform: translateY(${props.tyStart});
                }
                100% {
                    transform: translateY(${props.tyEnd});
                }
            }`
        document.head.appendChild(ss);
    }
})
</script>

<template>
    <div v-if="show" :style="wrapperStyle">
        <!--wrapper-->
        <div :style="childStyle">
            <!--rotation child-->
            <div :style="scrollable">
                <!--scrollable-->
                <slot></slot>
            </div>
        </div>
    </div>
</template>
