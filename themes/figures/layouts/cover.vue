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

const title = computed(() => {
    return $slidev.nav.currentSlideRoute.meta.slide.title
})

const frontmatter = computed(() => {
    return $slidev.nav.currentSlideRoute.meta.slide.frontmatter
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

const bannerStyle = computed(() => {
    console.log($slidev.nav.currentSlideRoute.meta.slide.title)
    return {
        "background-image": 'url("' + props.img + '"'
    }
})

</script>


<style>
.banner {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 450px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.6);
    background-size: cover;
}

.stamp {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 80px;
    border-radius: 48% 50% 48% 50% / 30% 30% 70% 70%;
    /* background: #FF0099; */
    background-image: radial-gradient(circle at center, red, red 30%, black);
    box-shadow: 0px 5px 5px black;
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
</style>
<template>
    <div class="banner" :style="bannerStyle"></div>
    <div class="stamp"><img src="https://images.jieyu.ai/images/hot/lhyh-badge.png" /></div>
    <div class="slidev-layout cover cover-override">
        <div class="motto"> {{ props.motto }}</div>
        <div class="title"> {{ title }}</div>
        <!--<div class="date"> {{calendar.month_ch}}{{ calendar.day }}日 {{ calendar.week_day }}</div>-->
        <slot style="padding:0.3vw 2vw" />
    </div>
</template>
