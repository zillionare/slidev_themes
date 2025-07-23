<template>
    <div class="qstats-card">
        <h1 v-if="category" class="category">{{ category }}</h1>
        <h3 v-if="title" class="title">{{ title }}</h3>
        <div v-if="description || slots.description" class="description">
            <slot name="description">{{ description }}</slot>
        </div>
        <div v-if="signature || slots.signature" class="signature">
            <slot name="signature">{{ signature }}</slot>
            <div v-if="paramsBlock || slots.params" class="params">
                <slot name="params">{{ paramsBlock }}</slot>
            </div>
            <div v-if="returns || slots.returns" class="returns">
                <slot name="returns">{{ returns }}</slot>
            </div>
        </div>
        <div v-if="example || slots.example" class="example">
            <slot name="example">{{ example }}</slot>
        </div>
        <div v-if="slots.default">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { useSlots } from 'vue'

const props = defineProps({
    category: String,
    title: String,
    description: String,
    signature: String,
    returns: String,
    paramsBlock: String,
    example: String
})

const slots = useSlots()
</script>

<style scoped>
.qstats-card {
    border: 2px solid #e74c3c;
    border-radius: 16px;
    padding: 24px;
    margin: 20px 0;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    width: 100%;
}

.category {
    background: #e74c3c;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 3vw;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 24px;
    margin-top: 20px;
}

.title {
    color: #1f2937;
    font-size: 5vw;
    line-height: 1.5;
    font-weight: 600;
    margin: 0 0 4px 0;
    /* border-bottom: 3px solid #3b82f6; */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.description {
    color: #6b7280;
    font-size: 3.5vw;
    margin: 30px 0;
    padding: 0 5px;
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
}

.signature {
    background: #f3f4f6;
    border-radius: 8px;
    padding: 12px 16px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 2.8vw;
    color: #7c3aed;
    margin-bottom: 20px;
    border-left: 4px solid #7c3aed;
}

.returns {
    color: #059669;
    font-size: 2.8vw;
    margin-bottom: 20px;
    padding: 0 12px;
}

.returns::before {
    content: "返回值:";
    display: block;
    font-size: 2vw;
    color: #8a8e96;
    margin-bottom: 8px;
    font-weight: 500;
}

.params {
    /* background: #f9fafb; */
    border-radius: 8px;
    padding: 8px 16px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 2.8vw;
    color: #374151;
    margin: 10px 0;
    /* border-left: 4px solid #d1d5db; */
    white-space: pre-line;
}

.params::before {
    content: "参数:";
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
    margin-top: 20px;
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
    margin: 0;
    width: 100%;
}

/* 移除所有区域中 pre::before 的小圆点 */
.qstats-card :deep(pre::before) {
    display: none !important;
}

.description :deep(pre::before),
.signature :deep(pre::before),
.returns :deep(pre::before),
.params :deep(pre::before) {
    display: none !important;
}

.description :deep(pre) {
    margin: 0px 0 20px 0;
}

.signature :deep(pre),
.returns :deep(pre),
.params :deep(pre) {
    margin: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
}

pre.params {
    padding: 0px 16px;
}
</style>
