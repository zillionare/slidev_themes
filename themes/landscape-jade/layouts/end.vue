<!--
    Usage:手动插入TOC，并指定clicks为1

---
layout: end
clicks: 1
---

<div class="abs top-0% scale-80%">

## 1. 因子量纲问题
## 2. 收益分析
### 2.1. Alpha、Beta和分层收益均值
### 2.2. 分层收益柱状图
### 2.3. 因子分层Violine图
### 2.4. 因子加权多空组合累计收益
### 2.5. 分层累计回报收益
### 2.6. 分层离差均值图
## 3. 事件分析
## 4. IC分析
## 5. 换手率分析
</div>


-->
<script setup lang="ts">

</script>
<style scoped></style>
<template>
    <div class="slidev-layout end">
        <slot />
        <div v-if="$clicks === 0" class="abs w-50% left-50% top-0 h-full flex items-center justify-center">
            <div>
                <div class="w-150px"><img src="https://images.jieyu.ai/images/hot/logo/quantide-alpha-yellow.jpg"></div>
                <div class="mt-2">QuanTide@公众号</div>
            </div>
        </div>
        <div v-if="$clicks === 1" class="abs w-full h-full left-0 top-0 bg-white">
            <Anime action="fadeOut" dur="5s">
                <!--消除最下面，未能被video覆盖的白线-->
                <video src="https://images.jieyu.ai/images/hot/the-end.mp4" autoplay style="width:101%;max-width:101%"
                    playbackRate="1.25" />
            </Anime>
            <Anime class="abs top-35% w-full h-100px z-10" action="zoomIn" dur="6s">
                <Anime class="abs w-full h-100px z-10" action="fadeIn" dur="6s">
                    <img style="width:150px;border-radius:50%"
                        src="https://images.jieyu.ai/images/hot/logo/quantide-alpha-yellow.jpg">
                    <FlashText class="abs left-19% top-150% scale-30%">感谢收看!</FlashText>
                </Anime>
            </Anime>
        </div>
    </div>
</template>
