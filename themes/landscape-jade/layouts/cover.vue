<script setup lang="ts">
import { computed, onMounted } from 'vue'

const imgList = [
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0020.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0017.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0016.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0019.jpg",
    "https://images.jieyu.ai/images/hot/book-cover-no-author.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0021.jpg",
    "https://images.jieyu.ai/images/hot/show-me-the-code-image-list/img_0014.jpg",

]

const props = defineProps({

})


</script>
<style scoped>
/*layer-2 the content layer*/
.title {
    position: absolute;
    top: 20%;
    margin: auto;
    width: 50%;
    left: 0;
    right: 0;
    font-size: 6vw;
    background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
    background-size: cover;
    color: transparent;
    background-clip: text;
    text-align: center
}

.seq {
    position: fixed;
    top: 0;
    text-align: left;
    left: 0;
    border-left: 5px solid cadetblue;
    border-right: 5px solid cadetblue;
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
    display: flex;
    height: 200px;
    left: 0%;
    bottom: -10%;
    display: flex;
    /* flex-wrap: nowrap; */
    align-items: flex-start;

    img {
        margin-right: 4vw;
        flex: 1;
    }

}
</style>
<template>
    <div class="slidev-layout cover">
        <div class="seq">{{ $slidev.configs.seq }}</div>
        <div class="title">{{ $slidev.configs.title }}</div>

        <div class="gallery">
            <img v-for="(src, i) in imgList" :key="i" :src="src">
        </div>
    </div>
</template>
