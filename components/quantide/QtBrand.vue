<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

let observer
const container = ref(null)
const w = ref(300)

onMounted(async () => {
    if ($renderContext.value !== 'slide') {
        return
    }

    observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            // 这里依次有contentRect, contentBoxSize和borderBoxSize
            const { width, height, top, left } = entry.contentRect;
            if (width === 0 || height === 0) {
                continue
            }
            w.value = width
            console.debug("[QuantTide] width is ", w.value)
        }
    })

    if (container.value) {
        observer.observe(container.value);
    }
})

onUnmounted(() => {
    if (observer && container.value) {
        observer.unobserve(container.value);
    }
})

const scaleMe = computed(() => {
    const scale = `scale(${w.value / 300})`
    console.debug("[QuantTide] scale is", scale)
    return {
        "transform": `scale(${w.value / 300})`
    }
})

</script>
<style scoped>
.logo {
    display: grid;
    /* border: 1px solid black; */
    grid-template-columns: auto 1fr;
    /* 定义两列，第一列自动宽度，第二列剩余空间 */
    align-items: center;
    width: 300px;
    height: 120px;

    .circle {
        width: 120px;
        height: 120px;
        /* transform: translateX(100px); */
        border-radius: 50%;
        border: 0.2em solid #f00000;
        z-index: -1;
    }


    .inner-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        color: #f00000;
        font-size: 40px;
        width: 200px;
        margin-left: -100px;

        margin-top: 10px;

        .cn {
            display: flex;
            align-items: center;

            .liang,
            .hua,
            .feng,
            .yuan {
                margin: 0 5px;
                font-family: "aoyagireisyosimo2";
                line-height: 1em;
            }

            .feng {
                font-family: "PangMenZhengDao-Cu"
            }
        }

        .en {
            position: flex;
            align-items: center;
            position: relative;
            font-size: 0.5em;
            line-height: 1em;

            &::before,
            &::after {
                content: ' ';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 1em;
                border-bottom: 2px solid;
            }

            &::before {
                left: -1.2em;
            }

            &::after {
                right: -1.2em;
            }

        }
    }
}
</style>

<template>
    <!--QuanTide-->
    <div v-bind="$attrs" :style="scaleMe" ref="container">
        <div class="logo">
            <div class="circle" :style="{ left: circleLeft + 'px' }">
            </div>
            <div class="inner-wrapper">
                <div class="cn">
                    <div class="liang">量</div>
                    <div class="hua">化</div>
                    <div class="feng">风</div>
                    <div class="yuan">云</div>
                </div>
                <div class="divider"></div>
                <div class="en">QUANTIDE</div>
            </div>
        </div>
    </div>

</template>
