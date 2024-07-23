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
.title {
    position: absolute;
    top: 25%;
    margin: auto;
    width: 75%;
    left: 0;
    right: 0;
    font-size: 5vw;
    background-image: url("https://images.jieyu.ai/images/hot/shanghai-extra-length.jpg");
    background-size: contain;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    text-align: center;
    display: inline-block;
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

.subtitle {
    position: absolute;
    font-size: 3vw;
    background-color: cadetblue;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    background-size: 85%;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    margin: auto;
    left: 0;
    right: 0;
    top: 60%;
    width: 50%;
    text-align: center;
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
        <div class="title">{{ $slidev.configs.title }}</div>

        <div class="gallery">
            <div v-for="(src, i) in imgList" :key="i" :style="{ backgroundImage: `url(${src})` }"></div>
        </div>
    </div>
</template>
