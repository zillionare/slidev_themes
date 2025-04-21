<script setup lang="ts">
import { computed } from 'vue'

const computedTitle = computed(() => {
    let title = $slidev.configs.title
    const strong = $slidev.configs.strong

    if (!strong) return title

    // 处理strong是数组的情况
    const strongWords = Array.isArray(strong) ? strong : [strong]

    // 对每个需要强调的词进行处理
    strongWords.forEach(word => {
        const regex = new RegExp(word, 'gi')
        // 添加带有SVG的包装器
        title = title.replace(regex, `
            <span class="rough-highlight">
                <svg class="rough-ellipse" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <ellipse class="rough-path-1" cx="50" cy="50" rx="48" ry="45" />
                    <ellipse class="rough-path-2" cx="50" cy="50" rx="48" ry="45" />
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
    padding: 0.2em 0.4em;
    color: var(--slidev-theme-secondary);
}

:deep(.rough-ellipse) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

:deep(.rough-path-1),
:deep(.rough-path-2) {
    fill: none;
    stroke: var(--slidev-theme-secondary);
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
}

:deep(.rough-path-1) {
    opacity: 0.3;
    transform-origin: center;
    transform: scale(1.02) rotate(1deg);
}

:deep(.rough-path-2) {
    opacity: 0.2;
    transform-origin: center;
    transform: scale(0.98) rotate(-1deg);
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
