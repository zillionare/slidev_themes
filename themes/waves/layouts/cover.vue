<script setup lang="ts">
import { computed } from 'vue'

</script>
<style>
.title {
    position: absolute;
    top: 20vh;
    font-size: 6vw;
    font-family: "WenQuanYi Micro Hei";
    color: #146a8ce0;
    padding-left: 5%;
    text-align: center;
    width: 100%;
}

.title::after {
    content: ' ';
    display: block;
    width: 98%;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, white 0%, #146a8c80 50%, white 100%) 1;
}

.subtitle {
    position: absolute;
    top: 40vh;
    left: 25%;
    width: 50%;
    height: 6vw;
    font-style: italic;
}

.brand {
    position: absolute;
    left: 0;
    width: 18vw;
    height: 5vh;
    top: 2vh;
    text-align: left;
    padding-left: 2vw;
    /* font-family: "Business Penmanship"; */
    background-color: rgba(27, 176, 245, 0.1);
    border-radius: 0 20px 20px 0;
    padding: 5px 20px 5px 10px;
    border-left: 5px solid rgba(209, 68, 245, 0.5);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.presenter {
    position: absolute;
    right: 0;
    width: 18vw;
    height: 5vh;
    top: 70vh;
    text-align: left;
    padding-left: 2vw;
    font-size: 1.5vw;
    color: rgba(209, 68, 245, 0.7);
}

.subtitle {
    position: absolute;
}

body {
    margin: 0;
}


.header {
    position: relative;
    text-align: center;
    /* background-image: linear-gradient(to bottom,
            rgb(255 255 255 / 1%),
            rgb(255 255 255 / 30%),
            rgb(255 255 255 / 80%)), url('/wheat.jpg?1');
    background-size: cover; */
    /* background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%); */
}



.inner-header {
    height: 65vh;
    width: 100%;
    margin: 0;
    padding: 0;
}

.flex {
    /*Flexbox for containers*/
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

/* .waves-container {
    position: absolute;
    top: 65vh;
    height: 15vh;
    width: 100%;
} */

.waves {
    position: relative;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px;
    /*Fix for safari gap*/
    min-height: 100px;
    max-height: 150px;
}

.content {
    position: relative;
    height: 20vh;
    text-align: center;
    background-color: white;
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

/*Shrinking for mobile*/
@media (max-width: 768px) {
    .waves {
        height: 40px;
        min-height: 40px;
    }

    .content {
        height: 30vh;
    }

    h1 {
        font-size: 24px;
    }
}
</style>
<template>
    <div class="header">
        <div class="inner-header">
            <!--brand-->
            <div class="brand"> {{ $slidev.nav.currentSlideRoute.meta.slide.frontmatter.brand }}</div>
            <!--title-->
            <div class="title"> {{ $slidev.nav.currentSlideRoute.meta.slide.title }}</div>
            <div class="subtitle">{{ $slidev.nav.currentSlideRoute.meta.slide.subtitle }}</div>

            <!--presenter-->
            <div class="presenter"> {{ $slidev.nav.currentSlideRoute.meta.slide.frontmatter.presenter }}</div>
        </div>
        <!--Waves Container-->
        <div class="waves-container">
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(209,68,245,0.7)" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(169,105,240,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(105,240,240,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(27,176,245,0.3)" />
                </g>
            </svg>
        </div>
        <!--Waves end-->
    </div>
</template>
