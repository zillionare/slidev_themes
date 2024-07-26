<!-- 请与v-drag 一起食用

<v-drag pos="100,100,100,100" v-clicks="[2,4]">
    <Ellipse bw="2" color="red"/>
</v-drag>

-->
<style>
.ellipse {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    border-width: var(--border-width);
    border-color: var(--border-color);
    animation: glow 1s infinite alternate;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
}


@keyframes glow {
    from {
        /* box-shadow: 0 0 var(--border-width) calc(-1 * var(--border-width)) hsl(calc(360 * var(--hue1)) 50% 80%); */
        box-shadow: 0 var(--border-width) calc(2 * var(--border-width)) rgba(0, 0, 0, 0.1);
    }

    to {
        box-shadow: 0 var(--border-width) calc(2 * var(--border-width)) rgba(0, 0, 0, 0.3);
    }
}
</style>

<script setup lang="ts">

</script>
<template>
    <!-- Ellipse -->
    <div class="ellipse"
        :style="{ '--border-width': ($attrs.bw || 3) + 'px', '--border-color': $attrs.color || 'red' }">
        <slot />
    </div>
</template>
