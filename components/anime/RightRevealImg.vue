<style scoped>
.image-container {
    overflow: hidden;
}

.mask {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    animation: revealImage 5s forwards;
}

.image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@keyframes revealImage {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}
</style>

<template>
    <div class="[image-container, $attrs.class]" v-bind="$attrs">
        <img :src="$attrs.src">
        <div class="mask"></div>
    </div>
</template>
