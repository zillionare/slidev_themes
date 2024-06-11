<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Title'
    }
})
</script>

<style scoped>
.wrapper {
    position: absolute;
}
.header {

}
</style>

<template>
    <div class="wrapper" :style="style">
        <div class="header">
            {{ props.title }}
        </div>
        <div class="main">
            <slot />
        </div>
    </div>
</template>
