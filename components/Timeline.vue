// https://github.com/NUKnightLab/TimelineJS3

<script setup lang="ts">

const props = defineProps({
    url: {
        type: String,
        required: true
    }
})


</script>
<template>
    <iframe width="100%" height="100%" :src="props.url"></iframe>
</template>

<!--
    todo: use local js/css and json data instead
-->
