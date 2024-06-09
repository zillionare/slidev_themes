<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps({

})


</script>
<style scoped>
/*layer-2 the content layer*/
.title {
    position: absolute;
    top: 10%;
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
</style>
<template>
    <div class="slidev-layout cover">
        <div class="title">{{ $slidev.configs.title }}</div>
        <div class="subtitle">{{ $slidev.configs.subtitle }}</div>
    </div>
</template>
