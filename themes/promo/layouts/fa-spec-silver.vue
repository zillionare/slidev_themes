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
}

.left-content {
    flex: 1;
}

.title {
    color: #4E7F98;
    font-size: 50px;
    font-weight: bold;
    margin: 1em 0;
    width: 100%;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


.features {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.feature-row {
    display: flex;
    align-items: center;
}

.feature-row-icon {
    width: 50px;
    height: 50px;
    background-color: #4E7F98;
    border-radius: 50%;
    color: white;
    font-size: 2em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;
}

.feature-item {
    border: 2px solid #4E7F989a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    /* background-color: #1d681760; */
    color: #4E7F98;
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
                <div class="title">实战菁英套餐</div>

                <div class="features w-80% mt-30 ml-25%">
                    <div class="feature-row">
                        <div class="feature-row-icon">1</div>
                        <div class="feature-item">社区答疑 适合自学</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">2</div>
                        <div class="feature-item font-bold">包含课件、代码、数据、视频</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">3</div>
                        <div class="feature-item font-bold">共享云端环境 课件代码可在线运行</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">4</div>
                        <div class="feature-item">可随时升级到高阶课程 原价抵扣新课学费</div>
                    </div>

                </div>

                <div>
                    <div class="abs mt-10 text-white left-40% text-2xl bottom-8.5rem">限时秒杀 随时下架</div>
                    <div class="abs bottom-60px ml-10px flex flex-col color-white">
                        <div class="text-4xl">实战菁英</div>
                        <div class="text-6xl underline">1699</div>
                    </div>
                    <div class="abs w-120% bottom-1.8rem text-1xl text-center">
                        套餐包含文本、代码、数据、视频和社区答疑<br><b>不含第19课价格预测模型</b>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>
