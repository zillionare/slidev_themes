<script setup>
import { computed } from 'vue'
const props = defineProps({
    at: {
        type: Number,
        default: -1
    },
    dur: {
        type: Number,
        default: 3
    },
    left: {
        type: String,
        default: '30%'
    },
    w: {
        type: String,
        default: '60%'
    }
})

const show = computed(() => {
    if (Array.isArray(props.at)) {
        return props.at.includes($slidev.nav.clicks)
    } else {
        return [-1, $slidev.nav.clicks].includes(props.at)
    }
})
</script>
<template>
    <Cast v-if="show" :dur="props.dur" left="props.left" w="props.w">
        <div style="text-align:center;">
            <div
                style="padding:100px 20px;background: url('https://images.jieyu.ai/images/hot/black-gold.jpg') repeat-y center top / contain">
                《大富翁.量化二十四课》

                ### 视频

                <video src="https://images.jieyu.ai/images/hot/video-sample.mp4" preload autoplay loop></video>

                ### Notebook文稿和代码

                ![75%](https://images.jieyu.ai/images/hot/course-screenshot.jpg)

                ### 1对1指导

                量化投研系统专家、大富翁架构师、《Python高效编程实践指南》作者一对一指导。

                <div style="width:100%">
                    <img src="https://images.jieyu.ai/images/hot/book-cover.jpg" style="float:left;width:200px">

                    <img src="https://images.jieyu.ai/images/hot/me.png" style="width:200px">
                </div>


                ✥ 超翔实内容：文字稿约40万字节。

                ✥ 快速上手：环境基于Jupyter Lab构建，在线使用，无须安装和拷贝数据。

                ✥ 昂贵的商业数据：超过30亿条分钟级行情数据

                ✥ 贴近实战：提供真实数据回测环境

                ✥ 豪华环境：192核CPU和256GB内存（学员共享）

                <slot></slot>
            </div>
        </div>
    </Cast>
</template>
