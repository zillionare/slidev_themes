<script setup lang="ts">
import { computed, onMounted } from 'vue'

const imgList = [
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0020.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0017.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0016.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0019.jpg",
    "https://images.jieyu.ai/images/hot/omega_arch.jpg",
    "https://images.jieyu.ai/images/hot/book-cover-no-author.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0021.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0014.jpg",

]

onMounted(() => {
    setTimeout(() => {
        var layout = $slidev.nav.currentLayout
        if (layout == "prelude")
            $slidev.nav.next()
    }, 3000)
})
</script>
<style scoped>
/*layer-0, image background fade out*/
.layer-0 {
    position: absolute;
    background-image: url('https://images.jieyu.ai/images/hot/shanghai-extra-wide.jpg');
    width: 100%;
    height: 100%;
    animation: layer-0-anime 5s linear 0s;
    background-size: auto 100%;
    background-position-x: left;
    opacity: 0;
}

@keyframes layer-0-anime {
    0% {
        background-position-x: left;
        opacity: 1;
    }

    80% {
        opacity: 0.8;
    }

    100% {
        background-position-x: right;
        opacity: 0;
    }
}

/*layer-1 presenter image fade out*/

.layer-1 {
    position: absolute;
    width: auto;
    height: 400px;
    left: 70%;
    top: 60%;
    animation: layer-1 5s 0s forwards;
    display: flex;
    flex-wrap: nowrap;

    img {
        margin-right: 4vw;
    }
}

@keyframes layer-1 {
    0% {
        transform: translateX(100%);
        opacity: 1;
    }

    100% {
        transform: translateX(-1500px);
    }
}


/*layer-2 the content layer*/
.title {
    position: absolute;
    top: 25%;
    left: 0;
    opacity: 1;
    width: 100%;
    padding: 2vw;
    text-align: center;
    margin: auto;
    font-size: 25vw;
    animation: 5s linear moveTitle 0s forwards;
    background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
    background-size: contain;
    color: transparent;
    background-clip: text;
}


.content {
    position: absolute;
    top: 20vh;
    left: 0;
    width: 100%;
    height: 100%;
}

@keyframes moveTitle {
    0% {
        transform: scaleX(0);
        opacity: 50%;
    }

    100% {
        transform: scaleX(1);
        opacity: 1;
    }
}
</style>
<template>
    <!-- <Audio :fadeOut=3 :src=welcome_audio></Audio> -->
    <div class="layer-0"></div>
    <div class="title">{{ $slidev.configs.title }}</div>
    <div class="layer-1">
        <img v-for="(src, i) in imgList" :key="i" :src="src">
    </div>
</template>
