<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps({

})

const coverImg = computed(() => {
    return {
        backgroundImage: `url("${$slidev.configs.img}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
})

</script>
<style scoped>
/*layer-2 the content layer*/
.title {
    position: absolute;
    top: 40%;
    margin: auto;
    width: 100%;
    left: 0;
    right: 0;
    padding: 2vw;
    font-size: 20vw;
    background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
    background-size: cover;
    color: transparent;
    background-clip: text;
    text-align: center
}

.cover-image {
    position: absolute;
    top: 0%;
    left: 0;
    height: 500px;
    width: 100%;
}

.abstract {
    position: absolute;
    font-size: 6vw;
    background-color: #000;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    background-size: 85%;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    margin: auto;
    left: 0;
    right: 0;
    top: 75%;
    width: 80%;
    text-align: center;
    padding: 0 4vw;
}
</style>
<template>
    <div class="slidev-layout cover">
        <div class="cover-image" :style="coverImg" />
        <div class="title">{{ $slidev.configs.title }}</div>
        <div class="abstract">{{ $slidev.configs.abstract }}</div>
    </div>
</template>
