<!--
landscape layout

available options:

title: the title of the presentation,
author: the author, appears at right bottom
subtitle: the subtitle, appears below title
date: appears at right bottom. 'none' to hide, now to show current time
background: the background image,
lecture: the name of the lecture, installment of the lecture
-->


<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { handleBackground } from '@slidev/client/layoutHelper.ts'

// 计算封面背景样式
const coverImg = computed(() => {    
    const background = $slidev.configs.background
    console.log("background is", background)
    return handleBackground(background)
})

// 计算 lecture-name 的背景样式
const lectureNameStyle = computed(() => {
    // 使用 handleBackground 函数计算背景样式
    const background = $slidev.configs.background
    return handleBackground(background, false)
})

// 用户提供的日期配置
const userDate = computed(() => $slidev.configs.date)

// 实时更新的时间（响应式）
const currentTime = ref(new Date())

// 计算当前日期时间
const now = computed(() => {
    // 如果用户提供了日期配置
    if (userDate.value) {
        // 如果日期为 "none"（不区分大小写），则不显示日期
        if (userDate.value.toLowerCase() === 'none') {
            return ''
        }
        // 如果日期为 "now" 或未指定，则显示实时更新的时间
        else if (userDate.value.toLowerCase() === 'now' || userDate.value === '') {
            const now = currentTime.value
            const year = now.getFullYear().toString().slice(-2)
            const month = (now.getMonth() + 1).toString().padStart(2, '0')
            const day = now.getDate().toString().padStart(2, '0')
            const hours = now.getHours().toString().padStart(2, '0')
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const seconds = now.getSeconds().toString().padStart(2, '0')
            
            return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
        }
        // 其它情况原文输出
        else {
            return userDate.value
        }
    }
    
    // 默认显示实时更新的时间（到秒）
    const now = currentTime.value
    const year = now.getFullYear().toString().slice(-2)
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
})

// 更新时间的定时器（仅在需要显示实时时间时）
let intervalId
onMounted(() => {
    // 只有在需要显示实时时间时才启动定时器
    const shouldShowTime = !userDate.value || 
                          userDate.value.toLowerCase() === 'now' || 
                          userDate.value === ''
    
    if (shouldShowTime) {
        intervalId = setInterval(() => {
            // 更新时间
            currentTime.value = new Date()
        }, 1000) // 每秒更新一次
    }
})

// 组件卸载时清理定时器
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
    }
})
</script>

<style scoped>
/*layer-2 the content layer*/
.lecture-name {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    border-radius: 9999px;
    text-align: left;
    padding: 0.5rem 1rem;
    min-width: 10rem;
    color: var(--primary);
    position: absolute;
    top: 20px;
    left: 1%;
    height: 2.2rem;
}
.title {
    @apply text-6xl;
    width: 100%;
    /* 基础颜色回退 */
    color: white;
    font-family: var(--font-title);
    position: absolute;
    text-align: center;
    font-size: 7vw;
    top: 40%;
    flex: 0 0 auto;
    
    /* 纹理背景设置 */
    /*background-image: url('https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/2026/01/golden-mountain-texture.jpg');*/
    background-size: 200% 100%;
    /*background-clip: text;*/
    /*-webkit-background-clip: text;*/
    /*-webkit-text-fill-color: transparent;*/
    
    /* 动态效果：纹理缓慢移动 */
    /*animation: textureMove 20s linear infinite;*/
    /* 增强立体感 */
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    text-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

@keyframes textureMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.logo-wrapper {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
}

.logo {
    height: 2vw;
    width: auto;
    border-radius: 4px;
}

.subtitle {
    @apply text-xl;
    color: gold;
    mix-blend-mode: lighten;
    font-size: 2vw;
    position: static;
    width: 100%;
    padding-left: 0.5em;
}

.cover-image {
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
}

.footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: var(--text-primary);
    font-size: 1rem;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
}

.author {
    margin-bottom: 5px;
}

.date {
    position: relative;
}

</style>

<template>
    <div class="slidev-layout cover">
        <div class="cover-image" :style="coverImg" />
        
        <!-- 条件显示 lecture-name -->
        <div v-if="$slidev.configs.lecture" class="lecture-name" :style="lectureNameStyle">{{ $slidev.configs.lecture }}</div>
        
        <div class="title">
            {{ $slidev.configs.title }}
        </div>
        <div class="logo-wrapper">
            <img src="https://cdn.jsdelivr.net/gh/zillionare/images@main/images/hot/logo/quantide-alpha-yellow.jpg" alt="logo" class="logo">
            <div class="subtitle">{{ $slidev.configs.subtitle }}</div>
        </div>
        
        <!-- 右下角的 footer 区域 -->
        <div class="footer">
            <div class="author">{{ $slidev.configs.author }}</div>

        </div>
    </div>
</template>
