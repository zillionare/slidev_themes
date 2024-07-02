<!--带标题的盒子-->
<!-- colors:

    Note: greyblue #DEE7FA
    hint: mint #DAEBE2
-->
<script setup>

import tinycolor from "tinycolor2";
import { computed } from 'vue';

const props = defineProps({
    color: {
        type: String,
        default: "rgb(223,248,251)"
    },
    title: {
        type: String,
        required: true
    },
    left: {
        type: String,
        default: "0"
    },
    top: {
        type: String,
        default: "0"
    },
    w: {
        type: String,
        default: "100%"
    },
    h: {
        type: String,
        default: "100%"
    },
    titleAlign: {
        type: String,
        default: "left"
    },
    contentAlign: {
        type: String,
        default: "justify",
    },
    gradientTitle: {
        type: Boolean,
        default: false
    }
})

const boxStyle = computed(() => {
    var borderColor = tinycolor(props.color).darken(20).toString();
    return {
        "position": "relative",
        "border-left": `.2rem solid ${borderColor}`,
        "top": props.top,
        "left": props.left,
        "width": props.w,
        "height": props.h,
        "margin": "1.5625em 0",
        "padding": "0 1.2rem 1rem 1.2rem",
        // "border-left": .4rem solid rgba(68, 138, 255, .8);
        "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .2)",
        "border-radius": ".2rem",
        "background-color": "rgba(255, 255, 255, 0.05)",
        "overflow": "auto"
    }
})

const titleStyle = computed(() => {
    var darkColor = tinycolor(props.color).darken(20).toString();
    var style = {
        "position": "relative",
        "background-color": props.color,
        "font-size": "20px",
        "font-weight": "bold",
        "margin": "0 -1.2rem",
        "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.2)",
        "padding": ".8rem 1.0rem .8rem 1rem",
        "text-align": props.titleAlign,
        // "mix-blend-mode": "difference",
    }
    if (props.gradientTitle == true) {
        style["background"] = `linear-gradient(to right, ${props.color} 0%, ${darkColor} 100%)`
        style["background-color"] = ""
    }
    return style
})

const mainStyle = computed(() => {
    return {
        "text-align": props.contentAlign
    }
})

</script>
<style scoped>
.title-box .main {
    margin-top: .8rem;
}
</style>
<template>
    <div class="title-box" v-motion v-bind="$attrs" :style="boxStyle">
        <p :style="titleStyle">{{ $props.title }}</p>
        <div class="main" :style="mainStyle">
            <slot></slot>
        </div>
    </div>
</template>
