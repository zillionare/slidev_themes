<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  background: {
    default: 'https://source.unsplash.com/random/1200x1600?abstract,white',
  }
})

const style = computed(() => handleBackground(props.background, false))

</script>
<style>
.title {
        position: absolute;
        font-size: 5vw;
        left: 1.5rem;
        top: 5vw;
        width:100%;
        text-align: center;
        padding: 0;
        color: var(--slidev-theme-primary);
        height: 100%;
    }

.title-hr {
    width: 100%;
    position: absolute;
    top: 11.5vw;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-image: linear-gradient(to left, var(--slidev-theme-secondary) 20%, white 100%, var(--slidev-theme-secondary) 0%) 1;
}

.subtitle {
    position: absolute;
    text-align: center;
    font-size: 4.5vw;
    width: 100%;
    color: white;
    top: 14vw;
}

.slogan {
    position: absolute;
    font-size: 2vw;
    top: 4rem;
    left: 0.5rem;
    color: var(--slidev-theme-primary);
    background-color: var(--slidev-theme-secondary);
    border-radius: 0 20px 20px 0;
    padding: 5px 20px 5px 10px;
    /* border-left: .3vw solid white; */
}

.mask {
    background-color:  var(--slidev-theme-secondary);
    opacity: 80%;
    position: absolute;
    width:100%;
    top: 25%;
    height: 20%;
    left:0;
}

.installment {
    position:absolute;
    left: 0.5rem;
    top: 10rem;
    font-size: 3.5vw;
    color: var(--slidev-theme-primary);
    background-color: var(--slidev-theme-secondary);
    border-radius: 0 20px 20px 0;
    padding: 5px 20px 5px 0px;
    /* border-left: .5vw solid white; */
}

#agenda {
    position: absolute;
    top: 50%;
    left: 1vw;
    color: white;
    p {
        color: var(--slidev-theme-primary);
        font-size: 3.3vw;
        text-shadow: 1px 2px 2px grey;
    }
}

</style>
<template>
<div
class="slidev-layout cover text-center"
:style="style"
>
    <div class="mask">
    <div class="my-auto w-full title">
        {{ $slidev.nav.currentRoute.meta.title }}
    </div>
    <hr class="title-hr">
    <div class="subtitle">
        {{ $slidev.nav.currentRoute.meta.subtitle }}
    </div>
</div>
<div class="slogan">
    {{ $slidev.nav.currentRoute.meta.slogan }}
</div>
<div class="installment">
    {{ $slidev.nav.currentRoute.meta.installment }}
</div>
<div id="agenda">
    <slot name="agenda"/>
</div>
</div>
</template>
