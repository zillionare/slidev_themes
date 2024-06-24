<script setup>
import { onMounted, computed } from 'vue';

const props = defineProps({
    img: {
        type: String,
        default: null
    }
})

const style = computed(() => {
    if (props.img == null) {
        return {}
    } else {
        return {
            backgroundImage: `url(${props.img})`,
            zIndex: -100
        }
    }
})

onMounted(() => {
    /*trick: 首次进入fact页面后自动点击一次*/
    // var timer = setTimeout(() => {
    //     var count = localStorage.getItem("fact")

    //     if (count) {
    //         clearTimeout(timer)
    //     }
    //     var layout = $slidev.nav.currentLayout
    //     if (layout == "fact")
    //         $slidev.nav.next()
    // }, 0)
})
</script>
<template>
    <div class="slidev-layout default" :style="style">
        <div>
            <slot />
        </div>
    </div>
</template>
