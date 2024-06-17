<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    // setTimeout(() => {
    //     var layout = $slidev.nav.currentLayout
    //     if (layout == "prelude-brand-only")
    //         $slidev.nav.next()
    // }, 3000)
})
</script>

<template>
    <Brand />
    <div class="slidev-layout">
        <slot />
    </div>
</template>
