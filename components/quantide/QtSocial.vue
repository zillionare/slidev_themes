<script setup>
import { Icon } from '@iconify/vue'

</script>
<style scoped>
.wechat {
    width: 500px;
    height: 100px;
    background-color: #60BF38;
    display: flex;
    align-items: center;
    border-radius: 10px;

    padding: 0 20px 0 10px;

    .image {
        width: 80px;
        height: 80px;
        object-fit: cover;
    }
 
    .label {
        display: flex;
        align-items: center;
        width: 160px;
        color: white;
        font-size: 1.2em;
        margin: 0 0.5em;
    }

    .searchbox {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.2em;
        height: 2em;
        flex: 1;
        color: black;
        background-color: #fff;
        padding: 0 10px;
        border-radius: 10px;
    }
}
</style>
<template>
    <div v-bind="$attrs">
        <div class="wechat">
            <img class="image" src="https://images.jieyu.ai/images/hot/wechat-logo.png" />
            <span class="label">微信搜一搜</span>
            <span class="searchbox">
                <span style="margin-right: 20px">🔍</span>
                <span>QuanTide</span>
            </span>
        </div>
    </div>
</template>
