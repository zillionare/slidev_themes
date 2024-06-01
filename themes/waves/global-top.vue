<template>
    <div class="slidev-layout pageBar"
        v-if="$slidev.nav.currentLayout !== 'cover' && $slidev.nav.currentLayout !== 'section' && $slidev.nav.currentLayout !== 'quote' && $slidev.nav.currentLayout !== 'center'">
        <div class="my-auto">
            <!-- Blue box with absolute positioning -->
            <div class="absolute-blue-box"></div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.absolute-blue-box {
    position: absolute;
    top: 4%;
    /* Adjust as needed */
    left: 0;
    /* Adjust as needed */
    width: 2vw;
    /* Adjust as needed */
    height: 4vw;
    /* Adjust as needed */
    background: linear-gradient(45deg, #4ec4d4 15%, #146a8ce0 45%);
    animation: gradient-animation 5s ease infinite;
    background-size: 200% 200%;
    opacity: 1.0;
}

@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
