<script lang="ts" setup>
import { ref, onMounted, onUpdated, computed } from 'vue';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { deriveOptions } from 'markmap-view';

const text = ref('')
const transformer = new Transformer();
const mm = ref()
const svgRef = ref()
const props = defineProps({
    w: {
        type: String,
        default: "50%"
    },
    h: {
        type: String,
        default: "50%"
    },
    colorFreezeLevel: {
        type: Number,
        default: 3
    },
    duration: {
        type: Number,
        default: 200
    },
    maxWidth: {
        type: Number,
        default: 0
    },
    expandlevel: {
        type: Number,
        default: 0
    },
    zoom: {
        type: Boolean,
        default: true
    },
    pan: {
        type: Boolean,
        default: true
    }

})

const style = computed(() => {
    let style = {
        "width": props.w,
        "height": props.h
    }

    return style
})
const update = () => {
    const { root } = transformer.transform(text.value);
    mm.value.setData(root);
    mm.value.fit();
}

onUpdated(update);

onMounted(() => {
    // 初始化markmap思维导图
    const options = deriveOptions({
        "colorFreezeLevel": props.colorFreezeLevel,
        "duration": props.duration,
        "maxWidth": props.maxWidth,
        "initialExpandLevel": props.expandlevel,
        "zoom": props.zoom,
        "pan": props.pan,
    });
    mm.value = Markmap.create(svgRef.value, options);
    // mm.value = Markmap.create(svgRef.value);

    let selector = 'div.hide'
    text.value = document.querySelector(selector).textContent
    console.debug("text value is", text.value)
    setTimeout(update, 500)
})
</script>

<style scoped>
.hide {
    display: none;
}

.wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
<template>
    <div class="wrapper">
        <div class="hide">
            <slot></slot>
        </div>
        <svg ref="svgRef" :style="style" />
    </div>
</template>
