<!--
    显示一组数字。数字带方框，另可有一个label
-->

<template>
    <div v-bind="$attrs">
        <div v-if="labelPos === 'top'" class="label">{{ label }}</div>
        <table>
            <tbody>
                <tr>
                    <td v-for="(value, index) in props.data" :key="index" :style="{ textAlign: 'center' }">
                        {{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="labelPos === 'bottom'" class="label">{{ label }}</div>
        <div v-if="labelPos === 'left'" class="label left-label">{{ label }}</div>
        <div v-if="labelPos === 'right'" class="label right-label">{{ label }}</div>
    </div>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    labelPos: {
        type: String,
        default: 'top',
        validator: value => ['top', 'bottom', 'left', 'right'].includes(value),
    },
});
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 50%;
}

td {
    border: 1px solid #ccc;
    padding: 0.5em;
    min-width: 50px;
    /* 保证每个单元格的最小宽度 */
    text-align: center;
}

/* 设置所有列等宽 */
table td {
    box-sizing: border-box;
    width: calc(100% / var(--column-count));
}

.label {
    margin: 1em 0;
    text-align: center;
}

.left-label {
    position: absolute;
    left: -50px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    writing-mode: vertical-lr;
}

.right-label {
    position: absolute;
    right: -50px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    writing-mode: vertical-lr;
}
</style>
