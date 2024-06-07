<script setup lang="ts">
import { computed, onMounted } from 'vue'

const sound = "https://images.jieyu.ai/images/sounds/aggressive-hit-logo.mp3"

</script>
<style>
/*layer-0, image background fade out*/
.layer-0 {
    position: absolute;
    background-image: url('https://images.jieyu.ai/images/hot/shanghai-wide.jpg');
    width: 100%;
    height: 100%;
    animation: layer-0-anime 5s linear 0s;
    background-size: auto 100%;
    background-position-x: left;
    opacity: 0;
}

@keyframes layer-0-anime {
    0% {
        background-position-x: left;
        opacity: 1;
    }

    80% {
        opacity: 0.8;
    }

    100% {
        background-position-x: right;
        opacity: 0;
    }
}

/*layer-1 presenter image fade out*/

.layer-1 {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 70%;
    top: 30%;
    animation: layer-1 3s 0s forwards;
}

@keyframes layer-1 {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(100px);
    }
}

.profile-image {
    width: 100%;
    height: 100%;
    background-image: url("https://images.jieyu.ai/images/hot/me.png?0.1");
    border-radius: 50%;
    background-position: -150px -100px;
    background-size: 600px;
    background-repeat: no-repeat;
    animation: profile-anime 3s 0s forwards;
}

@keyframes profile-anime {
    0% {
        background-position: 0px 0px;
    }

    50% {
        opacity: 0.8;
    }

    100% {
        background-position: -150px -100px;
        opacity: 0;
    }
}

/*layer-2 the content layer*/
.title {
    position: absolute;
    top: 25%;
    left: 0;
    opacity: 1;
    width: 100%;
    height: 100%;
    font-size: 6vw;
    animation: 3s linear moveTitle 0s forwards;
    background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
    background-size: contain;
    color: transparent;
    background-clip: text;
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
    opacity: 0;
    animation-name: moveSubtitle, shine;
    animation-duration: 3s, 8s;
    animation-timing-function: ease-in, ease-out;
    animation-iteration-count: 1, 1;
    animation-delay: 0s, 3s;
    animation-fill-mode: forwards, forwards;
}

.content {
    position: absolute;
    top: 20vh;
    left: 0;
    width: 100%;
    height: 100%;
}

@keyframes moveTitle {
    0% {
        transform: translateX(-50%) scale(0);
        opacity: 0;
    }

    25% {
        /* transform: scale(0.5); */
        opacity: 0.5;
    }

    50% {
        transform: translateX(30%) scale(1);
        opacity: 1;
    }

    75% {
        /* transform: scale(0.5); */
        opacity: 0.5;
    }

    100% {
        opacity: 0;
    }

}

@keyframes moveSubtitle {
    0% {
        transform: translate(50%) scale(0);
        opacity: 0;
    }

    100% {
        transform: translate(0%) scale(1);
        opacity: 1;
    }
}

@keyframes shine {
    0% {
        background-image: linear-gradient(90deg, #000000, #fff, #000);
        background-position-x: -500%;
        background-size: 85%;
        opacity: 0.8;
    }

    100% {
        background-position-x: 500%;
        background-size: 100%;
        opacity: 1;
    }
}
</style>
<template>
    <div v-if="$clicks === 0">
        <Audio :fadeOut=3 :src=sound></Audio>
        <div class="layer-0">
        </div>
        <div class="layer-1">
            <div class="profile-image" />
        </div>
    </div>
    <!--第一页永驻内容-->
    <div class="slidev-layout cover">
        <div class="title">{{ $slidev.configs.title }}</div>
        <div class="subtitle">{{ $slidev.configs.subtitle }}</div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>
