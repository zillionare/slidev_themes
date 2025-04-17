<script setup lang="ts">
</script>

<style scoped>
.poster {
    width: 1000px;
    height: 1000px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
}

.top-banner-wrapper {
    /*for shadow only*/
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
}

.top-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: #2E7D32;
    clip-path: path('M0,0 L1000,0 L1000,80 Q500,100 0,80 Z');
    color: white;
}

.bottom-banner-wrapper {
    /*for shadow only*/
    filter: drop-shadow(0 -4px 8px rgba(0, 0, 0, 0.5));
    position: absolute;
    width: 100%;
    height: 100px;
    bottom: 0px;
    left: 0;
}

.bottom-banner {
    width: 100%;
    height: 100px;
    background: linear-gradient(to right, #F5D0A1, #F5D0A1);
    clip-path: path('M0,20 Q250,0 500,20 T1000,20 L1000,100 L0,100 Z');
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
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
}

.left-content {
    flex: 1;
}

.title {
    color: #2E7D32;
    font-size: 50px;
    font-weight: bold;
    margin: 3.5em 0 2em 1em;
}

.subtitle {
    color: #2E7D32;
    position: absolute;
    opacity: 0.7;
    top: 300px;
    z-index: 10;
}

.features {
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: absolute;
    top: 480px;
    left: 30px;
    transform: scale(1.4);
}

.feature-item {
    background: #2E7D32;
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 16px;
    margin-left: 20px;
}

.teacher-image {
    width: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.1)), url('https://images.jieyu.ai/images/hot/me-2025-2-7.jpg');
    background-size: cover;
    margin-top: 380px;
}

.numpy {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    backdrop-filter: blur(10px);
    background: url('https://www.pythontutorial.net/wp-content/uploads/2022/08/numpy-tutorial.svg'), rgba(33, 114, 3, 0.034);
    background-size: cover;
    position: absolute;
    top: 1em;
    left: 1em;
    z-index: 1;
}
</style>

<template>
    <div class="poster">
        <div class="top-banner-wrapper">
            <div class="top-banner text-3xl text-center pt-5">匡醍（Quantide）好课推荐</div>
        </div>
        <div class="content">
            <div class="numpy"></div>

            <div class="title text-center w-full">量化人的 Numpy/Pandas</div>
            <div class="subtitle text-right w-90%">每个量化人都应该掌握的『母语』</div>
            <div class="subtitle text-right w-89% mt-5">—— by Wes Mckinney</div>
            <div class="abs left-450px mt-5 w-500px">
                <div class="features w-80%">
                    <div class="feature-item">情景式教学，每一个示例都只为完成KPI</div>
                    <div class="feature-item">拒做鹦鹉式教学 深入原理 知其然更知其所以然</div>
                    <div class="feature-item">面试高频问题复现 防挂控场秘籍</div>
                    <div class="feature-item">量化专用 API 精讲 20% 函数，覆盖 80% 场景</div>

                </div>
            </div>

            <div class="abs top-300px w-550px">
                <div>
                    <img src="https://images.jieyu.ai/images/hot/me-2025-02-07-transparent.png">
                </div>

                <div class="flex flex-col mt-5 ml--50px items-center justify-center text-gray-500">
                    <div>匡醍(Quantide)创始人</div>
                    <div>《Python高效编程实践指南》作者</div>
                    <div>Former Senior Software Manager / Global 500</div>
                </div>
            </div>


        </div>
        <div class="bottom-banner-wrapper">
            <div class="bottom-banner"></div>
        </div>
    </div>

</template>
