<script setup lang="ts">
import { computed, onMounted } from 'vue';


const props = defineProps({
    date: {
        type: String,
        required: true
    },
    motto: {
        type: String,
        required: false
    },
    img: {
        type: String,
        default: ""
    }
})

const calendar = computed(() => {
    var dt = new Date(props.date)

    return {
        "day": dt.getDate().toString().padStart(2, "0"),
        "month_ch": (dt.getMonth() + 1) + "月",
        "month_en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dt.getMonth()],
        "week_day": ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][dt.getDay()]
    }
})

const stamp = computed(() => {
    let map = {
        "figure": "https://images.jieyu.ai/images/hot/brand-figure.png",
        "career": "https://images.jieyu.ai/images/hot/career.png",
        "tools": "https://images.jieyu.ai/images/hot/tools.png",
        "freshman": "https://images.jieyu.ai/images/hot/freshman.png",
        "factors": "https://images.jieyu.ai/images/hot/factors.png",
        "resources": "https://images.jieyu.ai/images/hot/resources.png",
        "others": "https://images.jieyu.ai/images/hot/lhfy-badge.png",
        "quantide": "https://images.jieyu.ai/images/hot/logo/quantide.png"
    }
    return `${map["quantide"]}`
})

const titleImg = computed(() => {
    let width = $slidev.configs.stamp_width ? `${$slidev.configs.stamp_width}` : '60%'
    let height = $slidev.configs.stamp_height ? `${$slidev.configs.stamp_height}` : '60%'
    return {
        "background-image": "url(" + props.img + ")",
        // used for stamp background
        "--stamp-bg-width": width,
        "--stamp-bg-height": height
    }
})

// onMounted(() => {
//     // console.log($slidev.nav.currentRoute)
//     var el = document.getElementById("title-img")
//     if (el == null) {
//         var html = `<img id="title-img" src=${props.img} class='title-img'>`;
//         document.getElementById("slideshow").insertAdjacentHTML("afterbegin", html)
//     }

//     setInterval(function () {
//         // console.log($slidev.nav.currentPage)
//         var el = document.getElementById("title-img")

//         // 在其它页面时隐藏
//         if ($slidev.nav.currentPage == 1) {
//             el.style.display = ""
//         } else {
//             el.style.display = "none"
//         }
//     });

// })

</script>


<style>
.title-img {
    width: 100%;
    height: 550px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.6);
    background-size: cover;
    background-repeat: no-repeat;
}

.cover {
    border-left: 5vw solid #8b0000;
    border-top: 5vw solid #8b0000;
    border-bottom: 5vw solid #8b0000;

    .title {
        position: absolute;
        left: 0;
        font-size: 12vw;
        width: 100%;
        text-align: center;
        text-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    }

    .motto {
        color: #606060;
        width: 100%;
        margin-top: 5vw;
        font-size: 3vw;
        font-style: italic;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .series {
        width: 100%;
        height: 20%;
        color: white;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        background: url('https://images.jieyu.ai/images/hot/material/top-red-banner-3.png');
        background-size: 70% 100%;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: -50px;
        filter: drop-shadow(0 2px 2px #871910ff);
    }
}
</style>
<template>
    <div class="slidev-layout cover">
        <div class="title-img" :style="titleImg">
        </div>
        <div class="motto" v-html="$slidev.configs.motto"></div>

        <div class="abs left-0 top-0 series">
            <div class="text-4xl mt--100px">第 {{ $slidev.configs.seq }} 期</div>
        </div>

        <div class="top-50% title underline" v-html="$slidev.configs.title"></div>
        <div class="abs left-4vw top-60% w-100% flex justify-center items-center">
            <div class="w-50% text-center text-4xl p-2vw color-white rounded-100px bg-#202020 box-shadow-2xl"
                v-html="$slidev.configs.series">
            </div>
        </div>
        <div class="abs left-0 top-70% p-8vw">
            <slot />
        </div>

    </div>
</template>
