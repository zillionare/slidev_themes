<style scoped>
.poster {
    height: 100%;
    width: 100%;
    background: black;
}

.background {
    position: absolute;
    height: 100%;
    width: 100%;
    background: gray;

}

.logo-text {
    position: absolute;
    height: 100%;
    width: 100%;
    color: red;
    background: white;
    background-clip: text;
    mix-blend-mode: screen;
}
</style>

<template>
    <div class="poster">
        <div class="background"></div>
        <div class="logo-text">Aaron Yang</div>
    </div>
</template>
