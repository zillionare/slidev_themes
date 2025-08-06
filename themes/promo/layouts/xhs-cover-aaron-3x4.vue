<template>
    <div class="poster">
        <div class="light-cone"></div> <!-- 三角圆锥光束容器 -->
    </div>
    <div class="image-container">
        <img src="https://cdn.jsdelivr.net/gh/zillionare/images@main/images/hot/me-2.png">
        <div class="title">{{ $slidev.configs.title }}
        </div>
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
    filter: brightness(0.5);
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

/* 为图片添加轻微的光照高光效果，不影响清晰度 */
.image-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
        radial-gradient(ellipse 600px 900px at 50% -480px,
            rgba(255, 248, 220, 0.08) 0%,
            rgba(255, 248, 220, 0.04) 20%,
            rgba(255, 248, 220, 0.02) 40%,
            rgba(255, 248, 220, 0.01) 60%,
            transparent 80%);
    mix-blend-mode: soft-light;
    pointer-events: none;
    z-index: 3;
    opacity: 0.6;
}

/* .target-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 5px solid white;
    box-sizing: border-box;
} */

/* 三角圆锥光束容器 */
.light-cone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 4;
}

/* 三角圆锥光束主体 - 模拟真实舞台聚光灯效果 */
.light-cone::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1600px;
    height: 2400px;
    /* 使用多层径向渐变模拟真实光束的复杂衰减 */
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
    /* 使用clip-path创建三角形裁剪 */
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    filter: blur(12px);
    mix-blend-mode: screen;
    opacity: 0.7;
    z-index: 1;
}

/* 内层光束核心 - 模拟光源中心的强光 */
.light-cone::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 1600px;
    /* 内层更集中的暖色调光束 */
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
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    filter: blur(6px);
    mix-blend-mode: screen;
    opacity: 0.85;
}
</style>
