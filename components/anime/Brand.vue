<script setup>
import { computed, onMounted } from 'vue'
const props = defineProps({
    top: {
        type: String,
        default: '30%',
    },
    left: {
        type: String,
        default: '0',
    }
})

const style = computed(() => {
    return {
        top: props.top,
        left: props.left,
    }
})

onMounted(() => {
    // 增加badge
    setTimeout(() => {

    }, 3000)
})
</script>
<style scoped>
.wrapper {
    position: fixed;
    width: 100%;
    height: 30%;
    top: 20%;
    left: 0;
}

.badge {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto;
    text-align: center;
    background-image: url('https://images.jieyu.ai/images/2024/06/lhfy-badge.png');
    background-size: cover;
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.7));
    animation: logo-anime 1.5s linear forwards;
}

@keyframes logo-anime {
    0% {
        transform: scale(0) rotateZ(-90deg);
    }

    40% {
        transform: scale(1) rotateZ(0);
    }

    80% {
        transform: scale(1);
        opacity: 1;
    }

    99% {
        transform: translate(410px, -420px) scale(0.5);
    }

    100% {
        opacity: 0%;
    }
}

.mission {
    font-size: 10vw;
    position: relative;
    text-align: center;
    width: 50%;
    margin: 0 auto 0 auto;
    animation: mission-anime 1s linear 0.5s forwards;
    opacity: 0;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
}

@keyframes mission-anime {
    0% {
        transform: translateY(-50px);
        opacity: 0;
    }

    80% {
        transform: translateY(10px);
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.badge-small {
    position: fixed;
    width: 15vw;
    height: 15vw;
    top: 5vw;
    right: 5vw;
    opacity: 0;
    background-image: url('https://images.jieyu.ai/images/2024/06/lhfy-badge.png');
    background-size: cover;
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.5));
    animation: flipY 8s ease-in-out forwards 5s infinite;
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
<template>
    <div class="wrapper" :style="style">
        <div class="badge"></div>
        <div class="mission">量化人的视听杂志</div>
        <div class="badge-small" />
    </div>
</template>
