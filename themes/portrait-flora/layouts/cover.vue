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
        default: "http://"
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
.cover {
    width: 100%;
    height: 100%;
    background-image: url('https://images.jieyu.ai/images/hot/instructor/flora-3.jpg');
    background-size: cover;

    .title {
        position: absolute;
        left: 0;
        font-size: 12vw;
        width: 100%;
        text-align: center;
        text-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px 0;
    }

    .motto {
        @apply relative left--10 mt-20px ml-20px text-xl text-white rounded-full flex items-center pl-30px pr-30px pt-10px pb-10px color-black;
        background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        font-weight: 500;
        width: fit-content;
    }

    .seq {
        @apply relative left--10 top-10px ml-20px text-2xl text-white rounded-full flex items-center pl-30px pr-30px pt-10px pb-10px color-black;
        background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        font-weight: 500;
        width: fit-content;
    }

    .desc {
        position: absolute;
        bottom: 4rem;
        right: 1rem;
        @apply text-xl rounded-10px;
        text-align: left;
        opacity: 0.8;
        max-width: 50%;
    }
}
</style>
<template>
    <div class="slidev-layout cover">
        <div v-if="$slidev.configs.seq" class="seq">{{ $slidev.configs.seq }}</div>
        <div v-if="$slidev.configs.motto" class="motto">{{ $slidev.configs.motto }}</div>

        <div class="top-60% title" v-html="$slidev.configs.title"></div>
        <div v-if="$slidev.configs.desc" class="desc text-center p-2vw color-white bg-#202020 box-shadow-2xl"
            v-html="$slidev.configs.desc">
        </div>
    </div>
</template>
