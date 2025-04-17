<script setup lang="ts">
</script>

<style scoped>
.poster {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-image: url('https://images.jieyu.ai/images/hot/material/frame-blue.png');
    background-size: cover;
}

.header-container {
    position: relative;
    background-size: cover;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    padding-top: 2.5em;
}

.content {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
}

.left-content {
    flex: 1;
}

.title {
    color: #5991A9;
    font-size: 50px;
    font-weight: bold;
    margin: 1em 0 2em 1em;
    width: 80%;
}

.subtitle {
    color: #5991A9;
    position: absolute;
    opacity: 0.8;
    top: 300px;
    right: 50px;
    z-index: 10;
    width: 100%;
    text-align: right;
}

.features {
    display: flex;
    flex-direction: column;
    gap: 12px;
    transform: scale(1.2);
    transform-origin: 10%;
}

.feature-item {
    background: #5991A9;
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 16px;
    margin-left: 20px;
}

.teacher-image {
    width: 40%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.1)), url('https://images.jieyu.ai/images/hot/me-2025-2-7.jpg');
    background-size: cover;
}

.numpy {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    backdrop-filter: blur(10px);
    background: url('https://www.pythontutorial.net/wp-content/uploads/2022/08/numpy-tutorial.svg'), rgba(33, 114, 3, 0.034);
    background-size: cover;
    position: absolute;
    top: 18em;
    left: 30em;
    z-index: 1;
}
</style>
<template>
    <div class="poster">
        <div class="header-container">
            匡醍（Quantide）好课推荐
        </div>

        <div class="content">
            <div class="left-content">
                <div class="title">量化人的 Numpy/Pandas</div>
                <div class="subtitle">每个量化人都应该掌握的『母语』</div>
                <div class="subtitle mt-5 mr-2">—— by Wes Mckinney</div>

                <div class="features w-45% mt-200px">
                    <div class="feature-item">情景式教学，每一个示例都为完成KPI</div>
                    <div class="feature-item">拒做鹦鹉式教学 深入原理 知其然更知其所以然</div>
                    <div class="feature-item">面试高频问题复现 防挂控场秘籍</div>
                    <div class="feature-item">量化专用 API 精讲 20% 函数，覆盖 80% 场景</div>

                </div>

                <div>
                    <div class="abs mt-10 text-white left-40% text-2xl bottom-7.5rem">赠送《Python高效编程实践指南》</div>
                    <div class="abs bottom-4em flex flex-col color-white">
                        <div class="text-4xl">仅PDF</div>
                        <div class="text-7xl">0.99</div>
                    </div>
                    <div class="abs w-80% left-40% bottom-2rem text-3xl">PDF阅读版，适合电子书收藏复习</div>
                </div>
            </div>

            <div class="abs left-55% teacher-image mt-250px"> <img
                    src="https://images.jieyu.ai/images/hot/me-2025-02-07-transparent.png">
            </div>

        </div>
    </div>

</template>
