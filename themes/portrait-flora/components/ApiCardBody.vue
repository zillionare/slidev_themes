<template>
    <div class="example-card">
        <h3 v-if="title" class="title">{{ title }}</h3>
        <div v-if="description || slots.description" class="description">
            <slot name="description">{{ description }}</slot>
        </div>
        <div v-if="notes || slots.notes" class="notes">
            <slot name="notes">{{ notes }}</slot>
        </div>
        <div v-if="example || slots.example" class="example">
            <slot name="example">{{ example }}</slot>
        </div>
        <div v-if="output || slots.output" class="output">
            <slot name="output">{{ output }}</slot>
        </div>
        <div v-if="slots.default">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { useSlots } from 'vue'
defineProps({
    title: String,
    description: String,
    notes: String,
    example: String,
    output: String
})

const slots = useSlots()
</script>

<style scoped>
.example-card {
    border: 2px solid #e74c3c;
    border-radius: 16px;
    padding: 24px;
    margin: 20px 0;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    width: 100%;
}

.title {
    color: #1f2937;
    font-size: 5vw;
    line-height: 1.5;
    font-weight: 600;
    margin: 0 0 4px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.description {
    font-size: 16px;
    color: #6b7280;
    margin: 20px 0;
    padding: 0 5px;
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
}

.notes {
    background: #fef3c7;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 2.8vw;
    color: #92400e;
    margin: 10px 0;
    border-left: 4px solid #f59e0b;
    white-space: pre-line;
}

.notes::before {
    content: "注意:";
    display: block;
    font-size: 2vw;
    color: #8a8e96;
    margin-bottom: 4px;
    font-weight: 500;
}

.example {
    /* background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); */
    color: #e0e7ff;
    border-radius: 12px;
    padding: 20px 0;
    font-size: 14px;
    margin: 20px 0;
}

.example :deep(pre) {
    margin: 0;
    padding: 0 0 0 20px !important;
    /* 为小圆点留出空间 */
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    position: relative;
}

.example :deep(code) {
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
}

.output {
    background: #f3f4f6;
    border-radius: 8px;
    padding: 12px 16px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 2.8vw;
    color: #374151;
    margin: 10px 0;
    border-left: 4px solid #10b981;
    white-space: pre-line;
}

.output::before {
    content: "输出结果:";
    display: block;
    font-size: 2vw;
    color: #8a8e96;
    margin-bottom: 4px;
    font-weight: 500;
}

/* 移除不需要小圆点的区域中 pre::before */
.example-card :deep(pre::before) {
    display: none !important;
}

.description :deep(pre::before),
.notes :deep(pre::before),
.output :deep(pre::before) {
    display: none !important;
}

.description :deep(pre),
.notes :deep(pre),
.output :deep(pre) {
    margin: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    font-size: inherit;
}

.description :deep(pre) {
    margin: 0px 0 20px 0;
}
</style>
