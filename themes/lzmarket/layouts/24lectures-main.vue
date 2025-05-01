<style scoped>
.poster {
    width: 100%;
    height: 100%;
    background-color: #AE2F33;
}

.arrow-wrapper {
    filter: drop-shadow(0 -4px 8px rgba(0, 0, 0, 0.5));
    width: 100%;
    height: 100%;
}

.arrow {
    width: 100%;
    height: 100%;
    clip-path: path('M0 0 L250 0 L700 450 L250 900 L0 900 Z');
    /* background: url('https://images.jieyu.ai/images/2025/03/suzhou.jpg') */
    background-image: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.1)), url('https://images.jieyu.ai/images/2025/03/suzhou.jpg');
    background-size: cover;
}

.teacher-img-wrapper {
    position: relative;
    top: -300px;
    left: 250px;
    width: 500px;
    height: 500px;
}

.teacher-img {
    position: absolute;
    width: 480px;
    height: 480px;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    background-image: url('https://images.jieyu.ai/images/hot/me-2025-02-07-transparent.png');
    background-size: 150%;
    background-position-x: 10%;
    background-position-y: 110%;
}

.teacher-img-frame {
    position: absolute;
    width: 325px;
    height: 325px;
    border: 5px #AE2F33 solid;
    transform: rotate(45deg);
    top: 95px;
    left: 78px
}

li {
    margin-top: 5px;
}
</style>
<template>
    <div class="poster">
        <div class="arrow-wrapper">
            <div class="arrow"> </div>
            <div class="teacher-img-wrapper">
                <div class="teacher-img" />
                <div class="teacher-img-frame" />
            </div>
        </div>

        <div class="abs top-10 w-50% left-50% h-full text-shadow-[1px_4px_4px_rgba(0,0,0,0.5)] text-center">
            <div class="text-5xl text-white mt-20">量化二十四课</div>
            <div class="text-1xl text-yellow-400 mt-2">匡醍(Quantide) 好课推荐</div>
        </div>
        <div class="abs top-70% w-50% left-50% h-full text-shadow-[1px_2px_4px_rgba(0,0,0,0.5)] text-1.5xl text-white">
            <li class="ml-30">量化交易全流程覆盖</li>
            <li class="ml-25">原创教程 七年量化经验全披露</li>
            <li class="ml-20">老师出身国际大厂、Python技术专家</li>
            <li class="ml-15">提供服务器+商业数据 在线运行 免自己搭环境</li>
            <li class="ml-10">24节课、40万字教材、461段超7000行代码及策略</li>
            <li class="ml-5">藤校学生、大厂码农、基金经理、独立量化交易者都在学</li>
        </div>
    </div>
</template>
