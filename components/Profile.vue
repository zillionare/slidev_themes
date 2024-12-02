<!--带圆形img的卡片-->

<script setup>
import { computed, ref } from "vue";

const container = ref(null);
const imgStyle = computed(() => {
    if (container.value == null)
        return {};
    var parent = window.getComputedStyle(container.value);
    var width = parseFloat(parent.width) * 0.75 + "px"
    return {
        "width": width,
        "height": width,
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "border-radius": "50%",
        "border": "1px solid rgb(223, 223, 223)"
    }
})
</script>
<template>
    <div ref="container" :class="[$attrs.class, 'flex flex-col justify-center items-center']" v-motion>
        <div class="card-img-container" :style="{
        backgroundImage: 'url(' + $attrs.img + ')',
        backgroundColor: $attrs.color,
        ...imgStyle
    }">
        </div>
        <div class="card-text">
            <div class="card-row1">{{ $attrs.row1 }}</div>
            <div class="card-row2">{{ $attrs.row2 }}</div>
            <div class="card-row3" v-html="$attrs.row3"></div>
        </div>
    </div>
</template>
<style scoped>
.flex.flex-col.justify-center.items-center {
    height: auto;
}

.card-text {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    text-align: center
}

.card-row1 {
    font-size: 1.1rem;
    color: #808080;
}

.card-row2 {
    font-size: 1.5rem;
}

.card-row3 {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: rgb(153, 153, 153);
}
</style>
