<style scoped>
.seq {
    position: fixed;
    top: 0;
    text-align: left;
    left: 0;
    border-left: 5px solid rgba(0, 0, 0, 0.2);
    border-right: 5px solid rgba(0, 0, 0, 0.2);
    background-color: aliceblue;
    padding: 5px 20px 5px 10px;
    border-radius: 0 20px 0 20px;
}
</style>
<template>
    <div class="seq">{{ $slidev.configs.seq }}</div>
    <slot />
</template>
