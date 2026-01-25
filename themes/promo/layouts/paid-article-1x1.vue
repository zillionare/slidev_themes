<script setup>
import { computed } from 'vue'

// 从frontmatter获取配置，如果没有则使用默认值
const title = computed(() => $frontmatter.title || '限时特惠商品')
const subtitle = computed(() => $frontmatter.subtitle || '')
const price = computed(() => $frontmatter.price || '¥99')
const description = computed(() => {
    if (!$frontmatter.description) return ''
    return $frontmatter.description
        .split('|')
        .map(item => `<li>${item.trim()}</li>`)
        .join('')
})
const qrcode = computed(() => $frontmatter.qrcode || 'https://images.jieyu.ai/images/hot/quantfans.png')
const bgImage = computed(() => $frontmatter.bgImg || 'https://cdn.jsdelivr.net/gh/zillionare/images@main/images/hot/gallery/4x3/blog.jpg')
const imageSource = computed(() => $frontmatter.imageSource || '')
</script>

<style scoped>
.poster {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    font-family: 'PangMenChuShuTi', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 背景图片层 */
.bg-image-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center top;
    background-repeat: no-repeat;
    z-index: 1;
}

/* 渐变遮罩层 - 从上到下减少透明度 */
.gradient-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 20%,
            rgba(255, 255, 255, 0.3) 40%,
            rgba(255, 255, 255, 0.7) 70%,
            rgba(255, 255, 255, 0.9) 100%);
    z-index: 2;
}



/* 几何装饰元素 */
.geometric-shape {
    position: absolute;
    z-index: 2;
}

.shape-1 {
    top: 10%;
    left: 5%;
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    border-radius: 20px;
    transform: rotate(15deg);
    opacity: 0.8;
}

.shape-2 {
    bottom: 15%;
    right: 8%;
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, #48cae4, #023e8a);
    border-radius: 50%;
    opacity: 0.7;
}

.shape-3 {
    top: 60%;
    left: 2%;
    width: 40px;
    height: 40px;
    background: linear-gradient(45deg, #f72585, #b5179e);
    transform: rotate(45deg);
    opacity: 0.6;
}

/* 主要内容区域 */
.main-content {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 50px 40px;
}

/* 标题区域 */
.title-section {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
}

.main-title {
    font-size: 96px;
    font-weight: 900;
    color: #0A8B7B;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
    letter-spacing: 2px;
    font-family: 'PangMenChuShuTi', sans-serif;
}

.subtitle {
    font-size: 24px;
    color: #303030;
    width: 60%;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
    line-height: 1.4;
    margin: 60px auto 20px auto;
    font-family: 'AlimamaFangYuanTiVF-Thin', sans-serif;
}

/* 价格区域 */
.price-section {
    text-align: center;
    margin: 40px 0;
}

.price-container {
    display: inline-block;
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    padding: 20px 40px;
    border-radius: 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transform: rotate(-2deg);
}

.price-text {
    font-size: 64px;
    font-weight: 900;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    margin: 0;
    font-family: 'OPPOSans-Bold', sans-serif;
}

/* 描述区域 */
.description-section {
    text-align: center;
    width: 100%;
    height: 300px;
    position: absolute;
    bottom: 0px;
    left: 0;
}

.description-text {
    font-size: 36px;
    color: #20B2AA;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    width: 80%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px 40px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.95);
    text-align: left;
    list-style-type: disc;
    display: inline-block;
    font-family: 'AlimamaFangYuanTiVF-Thin', sans-serif;
}

/* 底部区域 */
.bottom-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 30px;
}

.qr-section {
    display: none;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 20px;
    /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); */
}

.qr-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
}

.qr-image {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 装饰性文字 */
.decorative-text {
    position: absolute;
    right: 60px;
    bottom: 60px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    transform: rotate(-5deg);
    font-weight: 600;
}

/* 图片来源说明 */
.image-source {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    /* text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); */
    /* background: rgba(0, 0, 0, 0.3); */
    padding: 4px 8px;
    border-radius: 4px;
    backdrop-filter: blur(5px);
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
    z-index: 15;
}

.price-container {
    animation: pulse 3s ease-in-out infinite;
}
</style>

<template>
    <div class="poster">
        <!-- 背景图片层 -->
        <div class="bg-image-layer" :style="{ backgroundImage: `url(${bgImage})` }"></div>

        <!-- 渐变遮罩层 -->
        <div class="gradient-mask"></div>

        <!-- 背景装饰 -->
        <div class="bg-decoration"></div>

        <!-- 几何装饰元素 -->
        <div class="geometric-shape shape-1"></div>
        <div class="geometric-shape shape-2"></div>
        <div class="geometric-shape shape-3"></div>

        <!-- 主要内容 -->
        <div class="main-content">
            <!-- 标题区域 -->
            <div class="title-section">
                <h1 class="main-title">{{ title }}</h1>
                <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
            </div>

            <div class="description-section">
                <ul class="description-text" v-html="description"></ul>
            </div>

            <!-- 底部区域 -->
            <div class="bottom-section">
                <!-- 客服微信二维码 -->
                <div class="qr-section">
                    <div class="qr-title">客服微信</div>
                    <img :src="qrcode" alt="客服微信" class="qr-image" />
                </div>

                <!-- 装饰性文字 -->
                <div class="decorative-text">
                    限时优惠 · 机不可失
                </div>
            </div>
        </div>

        <!-- 图片来源说明 -->
        <div v-if="imageSource" class="image-source">
            图片来源： {{ imageSource }}
        </div>

        <!-- 插槽用于额外内容 -->
        <slot />
    </div>
</template>
