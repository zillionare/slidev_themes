<template>
    <div v-bind="$attrs">
        <div class="canvas">
            <div v-for="(heading, index) in parsedHeadings" :key="index"
                v-show="$clicks >= heading.start && $clicks <= heading.end">
                {{ heading.text }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const markdown = `
## 这是标题 @2-4
## 另一个标题 @3-5
`;

function parseMarkdownHeadings(markdown) {
    const headings = markdown.split('\n').filter(line => line.startsWith('## '));

    return headings.map(heading => {
        const match = heading.match(/## (.*) @(\d+)-(\d+)/);
        if (match) {
            const [, text, start, end] = match;
            return {
                text,
                start: parseInt(start, 10),
                end: parseInt(end, 10)
            };
        }
        return null;
    }).filter(heading => heading !== null);
}

const parsedHeadings = parseMarkdownHeadings(markdown);

</script>

<style scoped>
.slidev-layout {
    position: relative;
    width: 100%;
    height: 100%;
}

.slidev-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.v-motion {
    transition: opacity 0.5s ease;
    opacity: 0;
}

.v-motion.show {
    opacity: 1;
}
</style>
