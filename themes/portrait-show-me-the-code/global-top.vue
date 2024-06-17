<template>
    <div class="lhfy-badge" v-if="show">
    </div>
</template>

<script setup>
import { computed } from 'vue'

const show = computed(() => {
    var layout = $slidev.nav.currentLayout
    return !['cover', 'prelude', 'prelude-brand-only'].includes(layout)

})
</script>

<style>
.lhfy-badge {
    width: 7vw;
    height: 7vw;
    position: absolute;
    top: 2vw;
    right: 2vw;
    background-image: url('https://images.jieyu.ai/images/2024/06/lhfy-badge.png');
    background-size: cover;
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.5));
    animation: flipY 8s ease-in-out forwards 3s infinite;
}

@keyframes flipY {
    0% {
        transform: rotateY(0);
        opacity: 1;
    }


    50% {
        transform: rotateY(180deg);
        opacity: 0;
    }


    100% {
        transform: rotateY(0deg);
        opacity: 1;
    }
}
</style>
