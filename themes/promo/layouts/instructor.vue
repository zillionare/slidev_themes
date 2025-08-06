<template>
    <div class="background">
        <!-- <div class="layer-2"></div> -->
        <div class="layer-3 text-8xl ml-8">AARON YANG 匡醍创始人</div>
    </div>
    <div class="teacher-img abs w-300 h-300 left-0 top-0">
    </div>
    <div class="teacher-title text-4xl ml-40">
        AARON YANG
    </div>
    <div class="abs text-white text-1xl w-50% h-50% top-75% left-50%">
        <div>匡醍（Quantide）创始人</div>
        <div>Former Global 500 Senior Manager</div>
        <div>量化开源框架 Zillionare 开发者</div>
        <div>Python技术专家、《Python高效编程实践指南》作者</div>
    </div>



</template>

<style scoped>
.background {
    position: relative;
    width: 100%;
    height: 100%;
    /* background: linear-gradient(to bottom, rgba(48, 50, 59), rgba(5, 6, 10)); */
    background: #C0c8c5;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-self: center;
}


/* .layer-2 {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 50% 50%,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0));
    filter: blur(50px);
    transform: rotate(-45deg);
} */

.layer-3 {
    position: absolute;
    height: 100px;
    width: 100%;
    color: #E2E0DB;
    overflow: hidden;
    white-space: nowrap;
}

.teacher-title {
    position: absolute;
    top: 50%;
    height: auto;
    width: 100%;
    color: black;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.teacher-img {
    background-image: url('https://images.jieyu.ai/images/hot/instructor/portrait-half-transparent.png');
    background-size: 70% 70%;
    background-position-y: -70px;
    background-position-x: 200px;
    background-repeat: no-repeat;
}
</style>
