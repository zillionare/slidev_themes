<script setup lang="ts">
import { computed } from 'vue'

</script>
<style>
.flex {
    /*Flexbox for containers*/
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.waves {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0vh;
    height: 15vh;
    /* transform: rotateX(180deg) scaleY(1.5); */
}

/* Animation */
.parallax>use {
    animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax>use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}

.parallax>use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}

.parallax>use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}

.parallax>use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }

    100% {
        transform: translate3d(85px, 0, 0);
    }
}
</style>
<template>
    <!--Waves-->
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(209,68,245,0.7)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(169,105,240,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(105,240,240,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(27,176,245,0.3)" />
        </g>
    </svg>
    <!--Waves end-->
</template>
