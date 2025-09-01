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
.wechat-frame {
    position: absolute;
    height: 100%;
    width: 560px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    display: flex;
    flex-flow: column;
    align-items: center;
}

.title-wrapper {
    margin-top: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    padding: 1em 0;
    display: flex;
    flex-flow: column;
    align-items: center;
}

/*layer-2 the content layer*/
.title {
    color: white;
    width: 100%;
    padding: 1em;
}

.subtitle {
    @apply text-xl;
    color: #e0e0e0;
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
    @apply w-70% text-2xl mt-20px text-white bg-white h-40px rounded-full flex items-center justify-center color-black;
    background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}
</style>
<template>
    <div class="slidev-layout cover">
        <div class="cover-image" :style="coverImg" />
        <div class="wechat-frame">
            <div class="seq">{{ $slidev.configs.seq }}</div>
            <div class="title-wrapper">
                <div class="title">
                    <AutoFitText :modelValue="$slidev.configs.title" />
                </div>
                <div class="subtitle">{{ $slidev.configs.subtitle }}</div>
            </div>
            <div class="abstract">{{ $slidev.configs.abstract }}</div>
        </div>
    </div>
</template>
