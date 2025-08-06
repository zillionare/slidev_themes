<template>
    <div class="poster">
        <div class="light-cone vertical-light left-20"></div> <!-- 垂直光束 -->
        <div class="light-cone diagonal-light left--15 top--50"></div> 对角光束
    </div>
    <div class="image-container">
        <img src="https://cdn.jsdelivr.net/gh/zillionare/images@main/images/hot/me-2.png">
        <div class="title">{{ $slidev.configs.title }}</div>
    </div>
</template>

<style scoped>
.poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://images.unsplash.com/photo-1502675135487-e971002a6adb?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    filter: brightness(0.4);
    z-index: 1;
}

.image-container {
    position: absolute;
    top: 480px;
    left: 0;
    width: 100%;
    height: calc(100% - 480px);
    /* background-color: black; */
    overflow: hidden;
    z-index: 2;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 保持图片最清晰显示，仅添加轻微亮度增强 */
    filter: brightness(1.05) contrast(1.02);
}


/* 光束基础容器 - 可复用 */
.light-cone {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 4;
}

/* 垂直光束 - 从顶部中央向下的三角形光束 */
.vertical-light {
    --light-position-y: 0;
    --light-position-x: 50%;
    --light-transform: translateX(-50%);
    --light-width: 1600px;
    --light-height: 2400px;
    --light-clip: polygon(50% 0%, 0% 100%, 100% 100%);
    --light-blur-outer: 12px;
    --light-blur-inner: 6px;
    --inner-width: 800px;
    --inner-height: 1600px;
}

/* 对角光束 - 通过旋转垂直光束实现，从左上角朝右下 */
.diagonal-light {
    --light-position-y: 0;
    --light-position-x: 0;
    --light-transform: rotate(-30deg);
    --light-width: 1600px;
    --light-height: 2400px;
    --light-clip: polygon(50% 0%, 0% 100%, 100% 100%);
    --light-blur-outer: 12px;
    --light-blur-inner: 6px;
    --inner-width: 800px;
    --inner-height: 1600px;
    transform-origin: 0 0;
}

/* 光束外层效果 - 使用CSS变量实现可复用 */
.light-cone::before {
    content: "";
    position: absolute;
    top: var(--light-position-y, 0%);
    left: var(--light-position-x, 50%);
    transform: var(--light-transform, translateX(-50%));
    width: var(--light-width, 1600px);
    height: var(--light-height, 2400px);
    clip-path: var(--light-clip, polygon(50% 0%, 0% 100%, 100% 100%));
    filter: blur(var(--light-blur-outer, 12px));
    mix-blend-mode: screen;
    opacity: 0.7;
    z-index: 1;
}

/* 垂直光束的径向渐变背景 */
.vertical-light::before {
    background:
        radial-gradient(ellipse 1600px 2400px at 50% 0%,
            rgba(255, 248, 220, 0.15) 0%,
            rgba(255, 248, 220, 0.08) 20%,
            rgba(255, 248, 220, 0.04) 40%,
            rgba(255, 248, 220, 0.02) 60%,
            rgba(255, 248, 220, 0.01) 80%,
            transparent 100%),
        radial-gradient(ellipse 1200px 1800px at 50% 0%,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0.06) 30%,
            rgba(255, 255, 255, 0.02) 60%,
            transparent 100%);
}

/* 对角光束复用垂直光束的径向渐变背景 */
/* .diagonal-light::before {
    background:
        radial-gradient(ellipse 1600px 2400px at 50% 0%,
            rgba(255, 248, 220, 0.15) 0%,
            rgba(255, 248, 220, 0.08) 20%,
            rgba(255, 248, 220, 0.04) 40%,
            rgba(255, 248, 220, 0.02) 60%,
            rgba(255, 248, 220, 0.01) 80%,
            transparent 100%),
        radial-gradient(ellipse 1200px 1800px at 50% 0%,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0.06) 30%,
            rgba(255, 255, 255, 0.02) 60%,
            transparent 100%);
} */

/* 光束内层核心效果 - 使用CSS变量实现可复用 */
.light-cone::after {
    content: "";
    position: absolute;
    top: var(--light-position-y, 0%);
    left: var(--light-position-x, 50%);
    transform: var(--light-transform, translateX(-50%));
    width: var(--inner-width, var(--light-width, 800px));
    height: var(--inner-height, var(--light-height, 1600px));
    clip-path: var(--inner-clip, var(--light-clip, polygon(50% 0%, 0% 100%, 100% 100%)));
    filter: blur(var(--light-blur-inner, 6px));
    mix-blend-mode: screen;
    opacity: 0.85;
}

/* 垂直光束内层的径向渐变背景 */
.vertical-light::after {
    background:
        radial-gradient(ellipse 800px 1600px at 50% 0%,
            rgba(255, 250, 235, 0.25) 0%,
            rgba(255, 248, 220, 0.15) 15%,
            rgba(255, 245, 200, 0.08) 35%,
            rgba(255, 240, 180, 0.04) 55%,
            rgba(255, 235, 160, 0.02) 75%,
            transparent 100%),
        radial-gradient(ellipse 400px 800px at 50% 0%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.12) 25%,
            rgba(255, 255, 255, 0.04) 50%,
            transparent 100%);
}

/* 对角光束内层复用垂直光束的径向渐变背景 */
.diagonal-light::after {
    background:
        radial-gradient(ellipse 800px 1600px at 50% 0%,
            rgba(255, 250, 235, 0.25) 0%,
            rgba(255, 248, 220, 0.15) 15%,
            rgba(255, 245, 200, 0.08) 35%,
            rgba(255, 240, 180, 0.04) 55%,
            rgba(255, 235, 160, 0.02) 75%,
            transparent 100%),
        radial-gradient(ellipse 400px 800px at 50% 0%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.12) 25%,
            rgba(255, 255, 255, 0.04) 50%,
            transparent 100%);
}
</style>
