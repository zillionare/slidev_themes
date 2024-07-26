<script setup lang="ts">
import { computed, onMounted } from 'vue'

const imgList = [
    "https://images.jieyu.ai/images/hot/posts/img_0020.jpg",
    "https://images.jieyu.ai/images/hot/posts/img_0017.jpg",
    "https://images.jieyu.ai/images/hot/mybook/women-sweatshirt-indoor.jpg",
    "https://images.jieyu.ai/images/hot/posts/img_0016.jpg",
    "https://images.jieyu.ai/images/hot/course/course-screenshot.png",
    "https://images.jieyu.ai/images/hot/cheese-course-roadmap.png",
    "https://images.jieyu.ai/images/hot/posts/img_0019.jpg",
    "https://images.jieyu.ai/images/hot/mybook/girl-hold-book-face.jpg",
    "https://images.jieyu.ai/images/hot/posts/img_0014.jpg",

]


</script>
<style scoped>
/*layer-2 the content layer*/

.title-wrapper {
    @apply absolute top-30% flex flex-col items-center justify-center;
}

.title {
    width: 100%;
    font-size: 6vw;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.subtitle {
    font-size: 3vw;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    white-space: pre-wrap;
    overflow-wrap: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #303030;
}

.seq {
    position: fixed;
    top: 0;
    text-align: left;
    left: 0;
    border-left: 5px solid rgba(0, 0, 0, 0.2);
    border-right: 5px solid rgba(0, 0, 0, 0.2);
    background-color: aliceblue;
    padding: 5px 20px 5px 10px;
    border-radius: 0 20px 0 20px;
}

.gallery {
    position: absolute;
    height: 200px;
    left: 0%;
    bottom: -10%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    animation: slideRight 5s forwards;

    div {
        width: 120px;
        height: 100%;
        background-size: cover;
        margin: 0 10px;
        background-position: center;
    }

}

@keyframes slideRight {
    from {
        transform: translateX(-50%);
    }

    to {
        transform: translateX(0);
    }
}
</style>
<template>
    <div class="slidev-layout cover">
        <div class="seq">{{ $slidev.configs.seq }}</div>
        <div class="title-wrapper">
            <div class="title">{{ $slidev.configs.title }}</div>
            <div class="subtitle">
                {{ $slidev.configs.subtitle }}
            </div>
        </div>

        <div class="gallery">
            <div v-for="(src, i) in imgList" :key="i" :style="{ backgroundImage: `url(${src})` }"></div>
        </div>
    </div>
</template>
