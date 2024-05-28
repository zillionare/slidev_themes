<script setup lang="ts">
import { computed } from 'vue'


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

.date {
    grid-area: date;
    position: relative;
    justify-self: center;
    height: 300px; 
    width: 300px; 
    background: var(--slidev-theme-secondary);
    color: #fff;
    text-align: center;
    line-height: 12.5vw;
    padding-top: 100px;
    font-size: 10vw;
    box-sizing: border-box;
}

.motto {
    position: absolute;
    left: calc(50% - 300px);
    top: 320px;
    color: color-mix(in srgb, var(--slidev-theme-secondary), #000 30%);
    width: 600px;
    height: 25px;
    font-size: 2.5vw;
    line-height: 1.5em;
    font-style: italic;
}


/* .date:after {
    content: '';
    position:absolute;
    left:0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 25%;
    border-bottom: 6vw solid #fff;
    border-left: 10vw solid transparent;
    border-right: 10vw solid transparent;
    box-sizing: border-box;
} */

.month {
    margin: -110px 0 0 1vw;
    grid-area: month;
    color: color-mix(in srgb, var(--slidev-theme-secondary), #000 15%);
    text-align: left;
}

.week {
    margin-top: -110px;
    grid-area: week;
    color: color-mix(in srgb, var(--slidev-theme-secondary), #000 15%);
    text-align: right;
    margin: -110px 0 0 1vw;
}

.calendar {
    @apply text-center;
    display: grid;
    margin-top: -60px;
    width: 100%;
    height: 600px;
    padding: 0 0.5vw;
    grid-template-columns: repeat(3, 33.33%);
    grid-template-rows: 50% 50%;
    grid-template-areas: ". date ."
                         "month date week";
}

.main {
    width: 100%;
    height: calc(100vh);
    margin-top: -100px;
}

.banner {
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 100px;
}

.title {
    font-size: 3vw;
    color: white;
    background-color: color-mix(in srgb, var(--slidev-theme-secondary), #000 20%);
    border-radius: 1vw;
    padding: 0.3vw 2vw;
    line-height: 4vw;
}

.brand {
    font-size: 3vw;
    color: white;
    color: color-mix(in srgb, var(--slidev-theme-secondary), #000 20%);
    border-radius: 1vw;
    padding: 0.5vw 2vw;
    line-height: 2.2vw;
}

</style>
<template>
<div
class="slidev-layout cover cover-override"
>
    <div class="calendar">
        <div class="date">
            <div>
                {{ calendar.day}}
            </div>
        </div>
        <div class="motto" v-html="props.motto"/>
        <div class="month">
        <div style="font-size: 3vw">{{ calendar.month_en }}</div>
        <div style="font-size: 4vw">{{ calendar.month_ch }}</div>
        </div>
        <div class="week">
        <div style="font-size: 3vw">{{ calendar.week_day }}</div>
        <div style="font-size: 3vw">{{ props.lunar }}</div>
        </div>
    </div>
    <div class="main">
        <div class="w-full banner">
            <div class="title"> {{ $slidev.nav.currentRoute.meta.title }}</div>
            <!--div class="brand"> 量化早⑧点</div-->
        </div>
        <slot/>
    </div>
</div>
</template>
