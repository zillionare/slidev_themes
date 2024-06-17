<script setup lang="ts">
import { computed, onMounted } from 'vue'

const coverImg = computed(() => {
    var img = $slidev.configs.img || "https://images.jieyu.ai/images/hot/shanghai-extra-wide.jpg"
    return {
        backgroundImage: `url("${img}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
})

</script>
<style scoped>
/*layer-2 the content layer*/
.title {
    width: 100%;
    font-size: 8vw;
    background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
    background-size: cover;
    color: transparent;
    background-clip: text;
    text-align: center;
}

.cover-image {
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.abstract {
    position: absolute;
    font-size: 4vw;
    color: #fff;
    margin: auto;
    left: 0;
    right: 0;
    width: 80%;
    text-align: center;
    mix-blend-mode: lighten;
}

.title-wrapper {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 25vw;
    left: 0;
    top: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<template>
    <div class="slidev-layout cover">
        <div class="cover-image" :style="coverImg" />
        <div class="title-wrapper">
            <div class="title">{{ $slidev.configs.title }}</div>
        </div>
        <div class="abstract">{{ $slidev.configs.abstract }}</div>
    </div>
</template>
