<script setup lang="ts">
</script>

<style scoped>
.poster {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-image: url('https://images.jieyu.ai/images/hot/material/frame_silver.png');
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
}

.left-content {
    flex: 1;
}

.title {
    color: #68676D;
    font-size: 50px;
    font-weight: bold;
    margin: 1em 0;
    width: 100%;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
    color: #BDBCBF;
    position: absolute;
    opacity: 0.8;
    top: 250px;
    right: 50px;
    z-index: 10;
    width: 100%;
    text-align: right;
}

.features {
    display: flex;
    flex-direction: column;
    gap: 12px;
    transform: scale(1.5);
    transform-origin: 25%;
}

.feature-row {
    display: flex;
    align-items: center;
}

.feature-row-icon {
    width: 50px;
    height: 50px;
    background-color: #BDBCBF;
    border-radius: 50%;
    color: white;
    font-size: 2em;

    display: flex;
    justify-content: center;
    align-items: center;
}

.feature-item {
    border: 2px solid #56555A;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    /* background-color: #1d681760; */
    color: #56555A;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 16px;
    margin-left: 20px;
}
</style>
<template>
    <div class="poster">
        <div class="header-container">
            匡醍（Quantide）好课推荐
        </div>

        <div class="content">
            <div class="left-content">
                <div class="title">匡铁初遇套餐</div>

                <div class="features w-80% mt-30 ml-25%">
                    <div class="feature-row">
                        <div class="feature-row-icon">1</div>
                        <div class="feature-item">适合学生党 职场新人 低成本尝鲜</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">2</div>
                        <div class="feature-item">一元钱 掌握量化策略的核心逻辑</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">3</div>
                        <div class="feature-item">高清视频课程 无须开电脑 手机即可全天候学习</div>
                    </div>
                </div>

                <div>
                    <div class="abs mt-10 text-white left-40% text-2xl bottom-9.2rem">限时秒杀 随时下架</div>
                    <div class="abs bottom-60px ml-20px flex flex-col color-white">
                        <div class="text-4xl">仅视频</div>
                        <div class="text-7xl underline">0.99</div>
                    </div>
                    <div class="abs w-80% left-40% bottom-2.5rem text-1.5xl">本商品仅提供课程视频、不包含代码、文本和数据<br>不含第19/20课预测模型
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>
