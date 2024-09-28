<!-- 一定要与v-drag一起食用

v-drag的定位是相对于父元素的。所以，如果父元素是absolute，那么最好初始化时，将Pos指定为0，0，100，100,再进调整。否则，可能不显示。
<v-drag pos="0,0,100,100">
<Box />
</v-drag>

-->
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
    display: flex;
    justify-content: center;
    align-items: center;
    --border-width: 5px;
    height: 100%;
    width: 100%;
    /* box-shadow: 3px 3px rgba(0,0,0,0.3); */
    /* opacity: 0%; */
    border-radius: calc(2 * var(--border-width));

    &::after {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 4px;
        background: linear-gradient(120deg, hsl(calc(360 * var(--hue1)) 100% var(--light)), hsl(calc(360 * var(--hue2)) 100% var(--light)), hsl(calc(360 * var(--hue3)) 100% var(--light)));
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
    <div :style="[{
        '--hue1': $attrs.hue1 || 1,
        '--hue2': $attrs.hue2 || 0.8,
        '--hue3': $attrs.hue3 || 0.6,
        '--light': $attrs.light || '50%'
    }, $attrs.style]" class="box-wrapper">
        <div class="box">
            <slot />
        </div>
    </div>
</template>
