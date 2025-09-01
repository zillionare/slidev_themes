<script setup lang="ts">
import { computed, onMounted } from 'vue'

const coverImg = computed(() => {
    var img = $slidev.configs.img || "https://images.jieyu.ai/images/hot/shanghai-extra-length.jpg"
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
    height: 100%;
    width: 90%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.subtitle {
    font-size: 4.5vw;
    color: #e0e0e0;
    margin: auto;
    left: 0;
    right: 0;
    width: 90%;
    text-align: center;
    mix-blend-mode: lighten;
}

.cover-image {
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.seq {
    @apply absolute top-50px w-42% left-10px text-2xl text-white bg-white h-50px rounded-full flex items-center justify-center color-black;
    background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.title-wrapper {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    left: 0;
    top: 60%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 1em 0;
}
</style>
<template>
    <div class="slidev-layout cover">
        <div class="cover-image" :style="coverImg" />
        <div class="seq">{{ $slidev.configs.seq }}</div>
        <div class="title-wrapper">
            <div class="title">
                <AutoFitText :modelValue="$slidev.configs.title" class="h-full" />
            </div>
            <div class="subtitle">{{ $slidev.configs.subtitle }}</div>
        </div>
        <div class="abstract">{{ $slidev.configs.abstract }}</div>
    </div>
</template>
