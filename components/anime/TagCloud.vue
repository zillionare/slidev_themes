<template>
    <div class="container">
        <div class="ellipse-window">
            <div v-for="word in words" :key="word.text" class="word"
                :style="{ transform: `translate(${word.x}px, ${word.y}px)` }">
                {{ word.text }}
            </div>
        </div>
    </div>
    <button @click="toggleShape">Toggle Shape</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const words = [
    { text: 'Vue', weight: 100, x: 0, y: 0 },
    { text: 'JavaScript', weight: 150, x: 0, y: 0 },
    // 更多词汇...
];

const isEllipse = ref(false);

onMounted(() => {
    words.forEach((word) => {
        setTimeout(() => {
            const randomPosition = getRandomPosition();
            word.x = randomPosition.x;
            word.y = randomPosition.y;
        }, Math.random() * 2000); // 随机延迟，模拟单词的随机出现
    });
});

const toggleShape = () => {
    isEllipse.value = !isEllipse.value;
};

// 获取随机位置的辅助函数
function getRandomPosition() {
    const container = document.querySelector('.word-cloud-container');
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    return { x: Math.random() * width, y: Math.random() * height };
}
</script>

<style scoped>
.container {
    perspective: 1000px;
    /* 设置透视距离，增强3D效果 */
    width: 400px;
    height: 400px;
    margin: 50px auto;
    position: relative;
    overflow: hidden;
    /* 隐藏超出边界的子元素内容 */
}

.ellipse-window {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    /* 可替换为图片或其他背景 */
    border-radius: 50%;
    /* 创建圆形，结合3D变换形成椭圆 */
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: center center;
    /* 设置变换中心点 */
    transform: rotateY(30deg) rotateX(20deg);
    /* 3D旋转，调整这两个值可以改变椭圆的倾斜角度 */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    /* 添加阴影增强立体感 */
}

/* 可选：增加内部内容的3D效果 */
.content {
    transform: rotateY(-30deg) rotateX(-20deg);
    /* 内容反向旋转，模拟深度效果 */
    text-align: center;
    padding-top: 50px;
    color: #333;
}

.word-cloud-container {
    position: relative;
    width: 800px;
    height: 600px;
    overflow: hidden;
}

.word {
    position: absolute;
    font-size: 1em;
    /* 根据单词权重调整字体大小 */
    transition: all 2s ease-in-out;
    animation: move 5s infinite linear alternate;
}

.ellipse {
    border-radius: 50%;
}

@keyframes move {
    0% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(-10%, -10%);
    }

    100% {
        transform: translate(0, 0);
    }
}
</style>
