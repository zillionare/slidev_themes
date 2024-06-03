<template>
    <div class="lhfy-badge">
    </div>
</template>

<script>

</script>

<style scoped>
.lhfy-badge {
    width: 3vw;
    height: 3vw;
    position: absolute;
    top: 1vw;
    right: 1vw;
    background-image: url('https://images.jieyu.ai/images/2024/06/lhfy-badge.png');
    background-size: cover;
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.5));
    animation: flipY 8s ease-in-out forwards 0s infinite;
}

@keyframes flipY {
    0% {
        transform: rotateY(0);
    }


    50% {
        transform: rotateY(180deg);
    }


    100% {
        transform: rotateY(0deg);
    }
}
</style>
