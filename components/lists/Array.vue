<!--
<Array data="1,2,3,...,5,6,7" class="mt-10 w-90px h-400px" label="hello" labelPos="left" cell="page-30-cell" flag="vertical"/>
-->
<template>
    <div :class="['container', `direct-${props.labelPos}`]">
        <div :class="[`${props.flag}-cells`, 'cells']">
            <span v-for="(item, index) in arrayData" :key="index" :class="[props.cell, 'cell']">{{ item }}</span>
        </div>
        <div v-if="labelPos === 'top'" :class="props.labelPos">{{ label }}</div>
        <div v-if="labelPos === 'bottom'" :class="props.labelPos">{{ label }}</div>
        <div v-if="labelPos === 'left'" :class="props.labelPos">{{ label }}</div>
        <div v-if="labelPos === 'right'" :class="props.labelPos">{{ label }}</div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    data: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        default: 'horizontal'
    },
    labelPos: {
        type: String,
        default: 'left'
    },
    cell: {
        type: String,
        default: 'cellStyle'
    }
});

const arrayData = computed(() => props.data.split(',').map(item => item.trim()));
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
}

.direct-top {
    flex-direction: column-reverse;
}

.direct-left {
    flex-direction: row-reverse;
}

.direct-right {
    flex-direction: row;
}

.direct-bottom {
    flex-direction: column;
}

.top,
.bottom,
.left,
.right {
    margin: 10px;
}


.cells {
    display: grid;
    grid-auto-rows: minmax(40px, auto);
    /* 设置最小行高 */
    gap: 8px;
    /* 单元格之间的间距 */
    width: 100%;
}

.cell {
    display: flex;
    text-align: center;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
    border: 1px solid #ccc;
    box-sizing: border-box;
    /* 确保内边距不会影响宽度 */
}

.horizontal-cells {
    grid-auto-flow: column;
    grid-auto-columns: minmax(auto, 1fr);
}

.vertical-cells {
    grid-auto-flow: row;
    grid-auto-rows: minmax(auto, 1fr);
}
</style>
