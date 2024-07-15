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
        default: "https://source.unsplash.com/random/360x200?spring"
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
        "resources": "https://images.jieyu.ai/images/hot/resources.png"
    }
    return `${map[$slidev.configs.stamp]}`
})

onMounted(() => {
    // console.log($slidev.nav.currentRoute)
    var el = document.getElementById("title-img")
    if (el == null) {
        var html = `<img id="title-img" src=${props.img} class='title-img'>`;
        document.getElementById("slideshow").insertAdjacentHTML("afterbegin", html)
    }

    setInterval(function () {
        // console.log($slidev.nav.currentPage)
        var el = document.getElementById("title-img")

        // 在其它页面时隐藏
        if ($slidev.nav.currentPage == 1) {
            el.style.display = ""
        } else {
            el.style.display = "none"
        }
    });

})

</script>


<style>
.title-img {
    width: 100%;
    max-height: 450px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.6);
}

.cover {
    margin-top: 45vh;

    .title {
        font-size: 5vw;
        border-radius: 1vw;
        padding: 0.3vw 2vw;
        line-height: 8vw;
        text-align: center;
        text-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    }

    .date {
        width: 100%;
        color: #909090;
        padding: 0.3vw 2vw;
        margin-top: 2vw;
        margin-bottom: 8vw;
    }

    .motto {
        color: #808080;
        width: 100%;
        font-size: 2.8vw;
        font-style: italic;
        text-align: center;
        margin-top: -10vw;
        margin-bottom: 6vw;
    }
}

.stamp {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 80px;
    height: auto;
    /* border-radius: 48% 50% 48% 50% / 30% 30% 70% 70%; */
    /* background: #FF0099; */
    /* background-color: white; */
    filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.5));
}

.stamp img {
    display: block;
}

.stamp::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background-color: white;
    z-index: -1;
}
</style>
<template>
    <div class="stamp"><img :src="stamp" />
        <div class="test" />
    </div>
    <div class="slidev-layout cover cover-override">
        <div class="motto"> {{ props.motto }}</div>
        <div class="title" v-html="$slidev.configs.title"></div>
        <!--<div class="date"> {{calendar.month_ch}}{{ calendar.day }}日 {{ calendar.week_day }}</div>-->
        <slot style="padding:03.vw 2vw" />
    </div>
</template>
