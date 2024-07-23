<!--

电波动画。两个在8点钟方向相切的圆，向右上角缩放。可用在list item前面的圆点展开

-->
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
    animation: scaleAnimation 5s infinite;
    transform-origin: 30% 100%;
}

.large-circle {
    position: absolute;
    top: -25%;
    /* 调整top值使大圆向上偏移 */
    left: -4%;
    /* 调整left值使大圆向左偏移 */
    width: 130%;
    height: 130%;
    border-radius: 50%;
    background-color: var(--large-circle-color);
    animation: scaleAnimation 5s infinite;
    transform-origin: 30% 100%;
}

/* 定义动画 */
@keyframes scaleAnimation {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }
}
</style>

<template>
    <div class="circles-container"
        :style="{ '--small-circle-color': $attrs.smallCircle, '--large-circle-color': $attrs.bigCircle }">
        <div class="small-circle"></div>
        <div class="large-circle"></div>
    </div>
</template>
