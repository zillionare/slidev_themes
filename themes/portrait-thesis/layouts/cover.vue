<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
  date: {
    type: String,
    required: true
  },
  lunar: {
    type: String,
    required: true
  },
  motto: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  }
})

const calendar = computed(()=> {
    var dt = new Date(props.date)

    return {
        "day": dt.getDate().toString().padStart(2, "0"),
        "month_ch": (dt.getMonth() + 1) + "月",
        "month_en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dt.getMonth()],
        "week_day": ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][dt.getDay()]
    }
})

</script>


<style>

#slide-content {
    background-color: #fafafa;
}
.header {
    height: 25vh;
    display: grid;
    grid-template-rows: 40% 1fr;
    grid-template-columns: 100%;
}

.subtitle-date {
    margin-top: 10vw;
    display: grid;
    grid-template-rows: 100%;
    grid-template-areas: "col col";
    grid-gap: 8vw;
    font-size: 3vw;
    color: color-mix(in srgb, var(--slidev-theme-secondary), #aaa 10%);
}

.date {
    text-align: right;
    margin-right: 2vw;
}

.subtitle {
    text-align: left;
    margin-left: 2vw;
}

.main {
    width: 100%;
    height: calc(100vh);
    column-count: 2;
    column-gap: 3vw;
}


.title {
    font-size: 8vw;
    color: --slidev-theme-primary;
    margin-top: 10vw;
    text-align: center;
    line-height: 4vw;
    text-shadow: 0px 5px 5px rgba(0,0,0,0.6);
}

.motto {
    font-size: 3vw;
    color: color-mix(in srgb, var(--slidev-theme-secondary), #fff 40%);
    margin-top: 8vw;
    line-height: 4vw;
    font-style: italic;
    text-align: center;
}

.figure {
    width: 100%;
    object-fit: cover;
}
</style>
<template>
<div
class="slidev-layout cover cover-override"
>
    <div class="header">
        <div class="title">{{ $slidev.nav.currentRoute.meta.title }}</div>
        <div class="motto">{{ $props.motto }}</div>
        <!--<div class="subtitle-date">
            <div class="subtitle" v-html="$slidev.nav.currentRoute.meta.subtitle"></div>
            <div class="date">{{ calendar.month_ch }} {{ calendar.day }} {{ calendar.week_day }}</div>
        </div>-->
    </div>
    <div class="main">
        <div v-if="$props.img" class="figure">
            <img src="https://ei.marketwatch.com/Multimedia/2013/01/07/Photos/MD/MW-AX868_haugen_20130107141040_MD.jpg" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <slot/>
    </div>
</div>
</template>
