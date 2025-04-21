<script setup lang="ts">
import { computed } from 'vue'

// 生成带噪声的路径点
function noisePoint(x: number, y: number, noise = 2) {
    return `${x + (Math.random() - 0.5) * noise},${y + (Math.random() - 0.5) * noise}`
}

// 生成手绘风格的圆角矩形路径
function generateRoughPath(width = 100, height = 100, radius = 20) {
    // 定义主要的控制点
    const points = [
        // 右上角
        `M ${noisePoint(width - radius, 0)}`,
        `Q ${noisePoint(width, 0)} ${noisePoint(width, radius)}`,
        // 右边
        `L ${noisePoint(width, height - radius)}`,
        `Q ${noisePoint(width, height)} ${noisePoint(width - radius, height)}`,
        // 底边
        `L ${noisePoint(radius, height)}`,
        `Q ${noisePoint(0, height)} ${noisePoint(0, height - radius)}`,
        // 左边
        `L ${noisePoint(0, radius)}`,
        `Q ${noisePoint(0, 0)} ${noisePoint(radius, 0)}`,
        // 顶边
        `L ${noisePoint(width - radius, 0)}`,
    ].join(' ')

    return points
}

const computedTitle = computed(() => {
    let title = $slidev.configs.title
    const strong = $slidev.configs.strong

    if (!strong) return title

    const strongWords = Array.isArray(strong) ? strong : [strong]

    strongWords.forEach(word => {
        const regex = new RegExp(word, 'gi')
        // 生成两条稍微不同的路径
        const path1 = generateRoughPath(100, 50, 20, 10)
        const path2 = generateRoughPath(100, 50, 20, 10)

        title = title.replace(regex, `
            <span class="rough-highlight">
                <svg class="rough-rect" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path class="rough-path-1" d="${path1}" />
                    <path class="rough-path-2" d="${path2}" />
                </svg>
                <span class="word">${word}</span>
            </span>
        `)
    })

    return title
})
</script>

<template>
    <div class="poster">
        <div class="title" v-html="computedTitle"></div>
        <div class="logo" />
    </div>
</template>

<style scoped>
.poster {
    font-family: 'PangMenChuShuTi', Courier, monospace;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
            rgba(255, 236, 179, 0.1),
            rgba(255, 224, 130, 0.3),
            rgba(255, 213, 79, 0.8));
    position: relative;
    overflow: hidden;
    padding: 10% 5%;
    border-left: 20px #ab0000 solid;
    border-top: 20px #ab0000 solid;
    border-bottom: 20px #ab0000 solid;
}

.title {
    font-size: 15vw;
    color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    position: absolute;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.rough-highlight) {
    position: relative;
    display: inline-block;
    padding: 0.1em 0.2em;
    color: var(--slidev-theme-secondary);
}

:deep(.rough-rect) {
    position: absolute;
    transform: translateY(10%) translateX(-10%);
    width: calc(100% + 0.2em);
    height: calc(100% + 0.2em);
    z-index: -1;
}

:deep(.rough-path-1),
:deep(.rough-path-2) {
    fill: none;
    stroke: var(--slidev-theme-secondary);
    stroke-width: 5;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
}

:deep(.rough-path-1) {
    opacity: 0.4;
    transform-origin: center;
    transform: scale(1.02) rotate(0.5deg);
}

:deep(.rough-path-2) {
    opacity: 0.3;
    transform-origin: center;
    transform: scale(0.98) rotate(-0.5deg);
}

:deep(.word) {
    position: relative;
    z-index: 1;
}

.logo {
    background-image: url('https://images.jieyu.ai/images/hot/logo/quantide.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    height: 120px;
    width: 120px;
    right: 0;
    bottom: 0;
}
</style>
