<!--
    
一个三角形、黑白对比模块

使用者提供两段文本，一段显示在右上角，一段显示在左下角

-->
<script setup>
import { onMounted, ref, useSlots } from 'vue'

const left = ref()
const right = ref()
const slots = useSlots()


onMounted(() => {
    let leftDivContent = '';
    let rightDivContent = '';

    // 遍历插槽中的所有元素
    slots.default?.().forEach((element, index) => {
        console.log(element.type, element)
        // 如果当前元素是<div>且尚未找到对应的位置
        if (element.type === 'div') {
            if (!leftDivContent) {
                // 第一个<div>元素，赋值给left
                leftDivContent = (element.children && element.children) ?? '';
                return
            }

            else if (!rightDivContent) {
                // 第二个<div>元素，赋值给right，之后可以提前终止循环
                rightDivContent = (element.children && element.children) ?? '';
                return;
            }
        }
    });

    // 将提取的内容赋值给ref
    left.value = leftDivContent;
    right.value = rightDivContent;

    // 如果没有找到正确的<div>数量，打印警告
    if (!leftDivContent || !rightDivContent) {
        console.warn("Slot did not contain exactly two <div> elements.");
    }
})
</script>

<style scoped>
.container {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 0;
    right: 0;
    opacity: 0;
}

.box-1 {
    width: 100%;
    height: 100%;
    position: relative;
    color: black;
}

.box-2 {
    width: 100%;
    height: 100%;
    position: relative;
    top: -100%;
    clip-path: polygon(0 0, 100% 0%, 100% 100%);
    color: white;
}

.triangle-right {
    text-align: left;
    width: 100%;
    height: 100%;
    background-color: black;
    float: right;
    shape-outside: polygon(0 0, 100% 0, 100% 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    margin-left: 1rem;
}

.triangle-left {
    float: left;
    shape-outside: polygon(0 0, 100% 100%, 0% 100%);
    clip-path: polygon(0 0, 100% 100%, 0% 100%);
    width: 100%;
    height: 100%;
    background-color: white;
    margin-right: 1rem;
}

/* .text-left {
    color: black;
    padding: 1rem;
}

.text-right {
    color: white;
    padding: 1rem;
} */
</style>
<template>
    <div class="container">
        <div class="box-1">
            <div class="triangle-right" />
            <div class="text-left" v-html="left">
            </div>
        </div>
        <div class="box-2">
            <div class="triangle-left" />
            <div class="text-right" v-html="right">
            </div>
        </div>
        <slot />
    </div>
</template>
