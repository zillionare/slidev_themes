<script setup lang="ts">
import { computed } from 'vue'

function numberToChinese(number) {
    var strNumber = number.toString()
    console.log
    var translated = []
    var table = {
        "0": "零",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六",
        "7": "七",
        "8": "八",
        "9": "九"
    }


    for (var i = 0; i < strNumber.length; i++) {
        var ch = strNumber[i]
        translated.push(table[ch])
    }

    return translated.join("")
}

const calendar = computed(() => {
    var dt = new Date($slidev.configs.date)

    return {
        "day": dt.getDate().toString().padStart(2, "0"),
        "month_ch": (dt.getMonth() + 1) + "月",
        "month_en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dt.getMonth()],
        "week_day": ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][dt.getDay()],
        "year": numberToChinese(dt.getFullYear()) + "年"
    }
})

</script>
<style scoped>
.slidev-layout.weekly {
    color: black;
    font-size: 3vw;

    .header {
        margin-bottom: 100px;

        .first-row {
            position: relative;
        }

        .calendar {
            height: 25%;
            width: 40%;

            .date {
                font-size: 4em;
                line-height: 1.5em;
            }

            .month_ch {
                margin-top: -1em;
                font-size: 1.3em;
                line-height: 2.1em;
            }

            .year {
                font-size: 1.2em;
                line-height: 2em;
            }

            .month_ch::after,
            .year::after {
                content: '';
                display: block;
                border-bottom: 3px solid currentColor;
                margin-top: 0em;
                width: 100%;
            }
        }

        .motto {
            width: 100%;
            height: 2em;
            color: #606060;
            text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
            text-align: center;
        }

        .title {
            @apply text-6xl;
        }

        .main {

            li,
            p {
                font-size: 2.2vw;
                line-height: 1.7em;
            }

            b {
                font-weight: 700;
                font-size: 3vw;
            }

        }
    }
}

.quantide-weekly {
    position: absolute;
    bottom: 0;
    width: 50%;
    left: 50%;
    text-align: center;
    font-size: 6vw;
}
</style>

<template>
    <div class="slidev-layout weekly">
        <div class="header">
            <div class="first-row">
                <QtBrand class="abs w-180px right-15% top-10px" />
                <div class="quantide-weekly">QuanTide Weekly</div>

                <div class="calendar">
                    <div class="date">
                        {{ calendar.day }}
                    </div>
                    <div class="month_ch">
                        {{ calendar.month_ch }}
                    </div>
                    <div class="year">
                        {{ calendar.year }}
                    </div>
                </div>
            </div>
            <!--<div class="motto">
                {{ $slidev.configs.motto }}
            </div>-->
        </div>
        <div class="main">
            <slot />
        </div>
    </div>
</template>
