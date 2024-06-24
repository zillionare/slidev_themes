<!-- 一个自动根据click 显示和hide的组件
与v-motion比，这一个自动设置{:enter=scale:0}且无须声明v-motion的组件
-->
<script setup>
import { useAttrs, computed } from 'vue'

const anime = computed(() => {
    var attrs = useAttrs();

    let _anime = JSON.parse(JSON.stringify(attrs));
    if (! "enter" in _anime) {
        _anime["enter"] = "{scale: 0}"
    }
    console.log(_anime["click-2"], _anime["enter"]);
    return _anime
})

</script>
<template>
    <div v-motion v-bind="anime">
        <slot />
    </div>
</template>
<style scoped></style>
