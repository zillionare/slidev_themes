<!--

电波动画。两个在8点钟方向相切的圆，向右上角缩放。可用在list item前面的圆点展开

-->
<script setup>
const colors = {
    "yellow": ["#ffc107", "#ffc107"],
    "blue": ["#0d6efd", "#0d6efd"],
    "green": ["#F1FFCC", "#F8FFE3"],
    "red": ["#19875420", "#dc354580"],
    "pink": ["#FFC3DB20", "##FFC3DB20"],
    "white": ["#ffffffa0", "#fcfcfca0"]
}
</script>

<style scoped>
.circles-container {
    position: relative;
    width: 200px;
    height: 200px;
}

.small-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--small-circle-color);
    animation: scaleSmall 5s infinite;
    animation-delay: 1s;
    transform-origin: 30% 100%;
    box-shadow: -2px -5px 50px rgba(0, 0, 0, 0.1);
}

.big-circle {
    position: absolute;
    top: -25%;
    /* 调整top值使大圆向上偏移 */
    left: -4%;
    /* 调整left值使大圆向左偏移 */
    width: 130%;
    height: 130%;
    border-radius: 50%;
    background-color: var(--large-circle-color);
    animation: scaleBig 5s infinite;
    transform-origin: 30% 100%;
    box-shadow: -2px -5px 100px rgba(0, 0, 0, 0.1);
}

@keyframes scaleBig {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }
}

@keyframes scaleSmall {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}
</style>

<template>
    <div class="circles-container"
        :style="{ '--small-circle-color': colors[$attrs.color][0], '--large-circle-color': colors[$attrs.color][1] }">
        <div class="small-circle"></div>
        <div class="big-circle"></div>
    </div>
</template>
