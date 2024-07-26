<style scoped>
.box-wrapper {
    height: 100%;
    width: 100%;
}

.box:hover {
    opacity: 100% !important;
}

.box {
    position: relative;
    --border-width: 5px;
    --hue1: 1;
    --hue2: 0.8;
    --hue3: 0.6;
    height: 100%;
    width: 100%;
    /* box-shadow: 3px 3px rgba(0,0,0,0.3); */
    /* opacity: 0%; */
    border-radius: calc(2 * var(--border-width));

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 4px;
        background: linear-gradient(120deg, hsl(calc(360 * var(--hue1)) 100% 50%), hsl(calc(360 * var(--hue2)) 100% 50%), hsl(calc(360 * var(--hue3)) 100% 50%));
        background-size: 300% 300%;
        animation: frame-enter 1s forwards ease-in-out reverse, gradient-animation 2s ease-in-out infinite;
    }
}

@keyframes gradient-animation {
    0% {
        background-position: 15% 0%;
    }

    50% {
        background-position: 85% 100%;
    }

    100% {
        background-position: 15% 0%;
    }
}

@keyframes frame-enter {
    0% {
        clip-path: polygon(0% 100%, 3px 100%, 3px 3px, calc(100% - 3px) 3px, calc(100% - 3px) calc(100% - 3px), 3px calc(100% - 3px), 3px 100%, 100% 100%, 100% 0%, 0% 0%);
    }

    25% {
        clip-path: polygon(0% 100%, 3px 100%, 3px 3px, calc(100% - 3px) 3px, calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 100% 100%, 100% 0%, 0% 0%);
    }

    50% {
        clip-path: polygon(0% 100%, 3px 100%, 3px 3px, calc(100% - 3px) 3px, calc(100% - 3px) 3px, calc(100% - 3px) 3px, calc(100% - 3px) 3px, calc(100% - 3px) 3px, 100% 0%, 0% 0%);
    }

    75% {
        -webkit-clip-path: polygon(0% 100%, 3px 100%, 3px 3px, 3px 3px, 3px 3px, 3px 3px, 3px 3px, 3px 3px, 3px 0%, 0% 0%);
    }

    100% {
        -webkit-clip-path: polygon(0% 100%, 3px 100%, 3px 100%, 3px 100%, 3px 100%, 3px 100%, 3px 100%, 3px 100%, 3px 100%, 0% 100%);
    }
}
</style>

<template>
    <!-- Box -->
    <div :style="[{ '--hue1': $attrs.hue1 || 1, '--hue2': $attrs.hue2 || 1, '--hue3': $attrs.hue3 || 1 }, $attrs.style]"
        class="box-wrapper">
        <div class="box">&nbsp</div>
    </div>
</template>
