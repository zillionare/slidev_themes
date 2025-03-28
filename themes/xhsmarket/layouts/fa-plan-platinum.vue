<style scoped>
.poster {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    /* border-radius: 20px; */
    background: #9B1E14;
    position: absolute;
    z-index: -1;
}

.inner-frame {
    width: 960px;
    height: 880px;
    margin: 40px 20px 80px 20px;
    background: white;
    border-radius: 60px;
    position: relative;
    z-index: 1;
}

.header-container {
    position: relative;
    overflow: hidden;
    color: white;
    background-image: url('https://images.jieyu.ai/images/hot/material/top-red-banner.png');
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.7));
    background-size: 50%;
    background-position: center -36px;
    background-repeat: no-repeat;
    top: -36px;
    width: 100%;
    height: 300px;
    z-index: 2;
}

.content {
    flex: 1;
}

.title {
    color: #A82217;
    font-size: 50px;
    font-weight: bold;
    /* margin: 1em 0; */
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
    width: 100%;
    position: relative;
    left: 270px;
}

.feature-row-icon {
    width: 50px;
    height: 50px;
    background-color: #A82217;
    border-radius: 50%;
    color: white;
    font-size: 2em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;
}

.feature-item {
    border: 2px solid #A82217;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    color: #303030;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 16px;
    margin-left: 20px;
}

.lesson19 {
    background: url('https://images.jieyu.ai/images/hot/material/red-sticker.png');

    background-size: cover;
    width: 180px;
    height: 180px;
    position: absolute;
    bottom: -3em;
    right: -20px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1;
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.7));
    transform: rotate(-45deg);
    transform-origin: center;
}

.price {
    width: 400px;
    height: 120px;
    background-image: url('https://images.jieyu.ai/images/hot/material/left-red-banner-arrow.png');
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.7));
    background-size: 100% 100%;
    z-index: 2;
}
</style>
<template>
    <div class="poster">
        <div class="inner-frame">
            <div class="header-container text-center flex flex-col justify-center items-center">
                <div class="text-5xl mb-5 mt--10">匡 醍 </div>
                <div class="text-2xl">好课推荐</div>
            </div>

            <div class="content">
                <div class="title">量化英豪套餐</div>

                <div class="features w-100% mt-20">
                    <div class="feature-row">
                        <div class="feature-row-icon">1</div>
                        <div class="feature-item">全部资料</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">2</div>
                        <div class="feature-item font-bold">独享云端环境 性能保障 策略保密</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">3</div>
                        <div class="feature-item font-bold">提供Tushare高级账号 实现数据自由</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">4</div>
                        <div class="feature-item">可随时升级到高阶课程 原价抵扣新课学费</div>
                    </div>
                </div>

                <div class="lesson19 text-white text-2xl">含19<br>20课</div>
                <div>
                    <div class="abs price bottom-1em ml--43px flex flex-row color-white pl-4em items-center">
                        <div class="text-4xl mr-20px">限时特惠</div>
                        <div class=" text-3xl underline">4499</div>
                    </div>
                    <div class="abs w-full text-shadow bottom--2.2em text-2xl text-center text-white">
                        套餐包含全部课程文本、代码、数据、视频、习题和社区答疑<br></div>
                </div>
            </div>
        </div>
    </div>
</template>
