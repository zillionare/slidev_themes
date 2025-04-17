<style scoped>
.poster {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    /* border-radius: 20px; */
    background: white;
    position: absolute;
    z-index: -1;
}

.inner-frame {
    width: 960px;
    height: 880px;
    margin: 90px 20px 30px 20px;
    background: #202020;
    border-radius: 60px;
    position: relative;
    z-index: 1;
}


.inner-frame::before,
.inner-frame::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    transform: rotate(45deg);
}

.inner-frame::before {
    opacity: 0.5;
    transform: rotate(45deg) translate(-50%, -50%);
}

.inner-frame::after {
    opacity: 0.3;
    transform: rotate(45deg) translate(-25%, -25%);
}

/* 第三个光线 */
.inner-frame::after {
    opacity: 0.3;
    transform: rotate(45deg) translate(-25%, -25%);
}

/* 第三个光线（通过额外伪元素实现） */
.inner-frame::after {
    opacity: 0.3;
    transform: rotate(45deg) translate(-25%, -25%);
}

.inner-frame::third {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: rotate(45deg) translate(0%, 0%);
}

.header-container {
    position: relative;
    overflow: hidden;
    color: white;
    background-image: url('https://images.jieyu.ai/images/hot/material/diamond.png');
    filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.8));
    background-size: 300px;
    background-repeat: no-repeat;
    background-position: center center;
    top: -100px;
    width: 100%;
    height: 300px;
    z-index: 2;
}

.diamon-wrapper {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 240px 180px 0 180px;
    border-color: white transparent transparent transparent;
    z-index: 1;
}

.content {
    flex: 1;
    margin-top: -2em;
}

.title {
    color: white;
    font-size: 50px;
    font-weight: bold;
    /* margin: 1em 0; */
    width: 100%;
    text-align: center;
    text-shadow: 0 2px 2px rgba(255, 255, 255, 0.2);
}


.features {
    display: flex;
    flex-direction: column;
    gap: 12px;
    transform: scale(1.4);
}

.feature-row {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    left: 270px;
}

.feature-row-icon {
    width: 48px;
    height: 48px;
    background-color: #303030;
    border-radius: 50%;
    color: white;
    font-size: 2em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);

    display: flex;
    justify-content: center;
    align-items: center;
}

.feature-item {
    /* border: 2px solid #303030; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
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
    bottom: -18px;
    right: -18px;
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
    height: 200px;
    background-image: url('https://images.jieyu.ai/images/hot/material/red-left-banner.png');
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
    background-size: 100% 100%;
    z-index: 2;
}

.brand {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    padding: 5px 25px;
    background: black;
    border-radius: 25px;
}
</style>
<template>
    <div class="poster">
        <div class="inner-frame">
            <div class="abs text-2xl text-white right-10 mt-10 brand">
                匡醍好课</div>

            <div class="header-container text-center flex flex-col justify-center items-center">
            </div>
            <div class="diamon-wrapper abs top--20px left-300px"></div>
            <div class="content">
                <div class="title">尊享私课套餐</div>

                <div class="features w-100% mt-20">
                    <div class="feature-row">
                        <div class="feature-row-icon">1</div>
                        <div class="feature-item font-bold">尊享私课 每月限购</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">2</div>
                        <div class="feature-item font-bold">匡醍证书 研学证明 实习推荐</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">3</div>
                        <div class="feature-item">专享云端环境 独立环境 尊贵体验</div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">4</div>
                        <div class="feature-item">MacM4 Pro 强悍计算能力 卓越机器学习性能</div>
                    </div>
                </div>

                <div class="lesson19 text-white text-2xl">含19<br>20课</div>
                <div>
                    <div class="abs price bottom-1em ml--47px flex flex-row color-white pl-4em items-center">
                        <div class="text-4xl mr-20px">限时特惠</div>
                        <div class=" text-3xl underline">7299</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
