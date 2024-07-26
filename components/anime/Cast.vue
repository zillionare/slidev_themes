<!--象演员表一样向上滚动

    通过perspective_origin来调节梯形的中心。
-->
<script setup>
import { onMounted } from 'vue'
import { computed } from 'vue'
import { parseRangeString } from '@slidev/parser/core'

const props = defineProps({
    at: {
        type: Number,
        required: true
    },
    left: {
        type: String,
        default: "60%"
    },
    top: {
        type: String,
        default: "0px"
    },
    w: {
        type: String,
        default: "40%",
    },
    h: {
        type: String,
        default: "80%",
    },
    perspective: {
        type: String,
        default: "400px",
    },
    perspective_origin: {
        type: String,
        default: "70%",
    },
    rx: {/*rotationX*/
        type: String,
        default: "45"
    },
    tyStart: {
        type: String,
        default: "50%"
    },
    tyEnd: {
        type: String,
        default: "-120%"
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
        type: Number,
        // 5 seconds
        default: 5
    },
    mask: {
        type: Boolean,
        default: false
    }
})

const show = computed(() => {
    var at = props.at
    if (at === undefined) {
        return true
    }

    if (!Number.isNaN(at)) {
        // console.log(`show cast at ${at}`)
        return $slidev.nav.clicks == at
    }

    var ranges = parseRangeString(at, $slidev.nav.clicksTotal)
    if (ranges.includes($clicks)) {
        return true
    } else {
        // console.log(`parsed ranges are ${ranges}, hiding casts`)
        return false
    }
})

const wrapperStyle = computed(() => {
    var alpha = props.mask ? 0.75 : 0
    var style_ = {
        "--test": "check wrapper",
        "perspective": props.perspective,
        "perspective-origin": props.perspective_origin,
        "z-index": parseInt(props.z),
        "position": "fixed",
        "color": "white",
        "background": `rgba(0,0,0,${alpha})`,
        "top": 0,
        "left": 0,
        "width": props.w,
        "height": props.h,
    }

    return style_
})

const childStyle = computed(() => {
    var style_ = {
        "transform": `rotateX(${props.rx}deg)`,
        "overflow": "hidden",
        "position": "relative",
        "top": props.top,
        "left": props.left,
        "width": props.w,
        "height": props.h,
    }

    return style_
})

const scrollable = computed(() => {
    return {
        "animation": `cast-motion ${props.dur}s linear 0s forwards`,
        "transform": `translateY(${props.tyStart})`,
        "position": "relative",
        "background": props.bg
    }
})

const slotWrapper = computed(() => {
    return {
        "mix-blend-mode": "difference"
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
                    opacity: 1;
                }
                80% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(${props.tyEnd});
                    opacity: 0;
                }
            }`
        document.head.appendChild(ss);
    }
})
</script>

<template>
    <div :style="wrapperStyle">
        <!--cast-->
        <!--wrapper-->
        <div :style="childStyle">
            <!--rotation child-->
            <div :style="scrollable">
                <!--scrollable-->
                <div :style="slotWrapper">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
