<!--
This is a portraint layout

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
    const style = handleBackground(background)
    
    // 获取 background-y 配置值
    const backgroundY = $slidev.configs['background-y']
    
    // 如果提供了 background-y，则调整背景图片位置
    if (backgroundY) {
        return {
            ...style,
            backgroundPosition: `center ${backgroundY}`,
            backgroundPositionY: backgroundY
        }
    }
    
    return style
})

// 计算 lecture-name 的背景样式
const lectureNameStyle = computed(() => {
    return {
        backgroundColor: 'var(--primary)',
        boxShadow: '0 2px 3px rgba(0, 0, 0, 0.5)',
        borderRadius: '9999px',
        textAlign: 'left',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.55rem',
        minWidth: '10rem',
        color: 'white',
        position: 'absolute',
        top: '20px',
        left: '1%'
    }
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

const showFooter = computed(() => {
    return $slidev.configs.author || (userDate.value && userDate.value.toLowerCase() !== 'none')
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
.title {
    @apply text-8xl;
    width: 90%;
    color: var(--text-on-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 0 0 auto; /* 不伸缩，保持内容大小 */
    text-shadow: 
        -1px -1px 0 #000,  
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000,
        -2px -2px 0 rgba(0, 0, 0, 0.5),
        2px -2px 0 rgba(0, 0, 0, 0.5),
        -2px 2px 0 rgba(0, 0, 0, 0.5),
        2px 2px 0 rgba(0, 0, 0, 0.5);
}

.subtitle {
    @apply text-5xl;
    color: var(--secondary);
    width: 90%;
    text-align: center;
    mix-blend-mode: lighten;
    flex: 1 1 auto; /* 占据剩余空间 */
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 
        -1px -1px 0 #000,  
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
}

.cover-image {
    position: absolute;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
}

.title-wrapper {
    /* background-color: color-mix(in srgb, var(--bg-primary) 100%, transparent); */
    width: 100%;
    height: 30%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-self: center;
    align-items: center;
    padding: 1em 0;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
}

.footer {
    @apply: text-2xl;
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: var(--primary);
    text-shadow: 
        -1px -1px 0 #000,  
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
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
        
        <div class="title-wrapper">
            <div class="title">
                {{ $slidev.configs.title }}
            </div>
            <div class="subtitle">{{ $slidev.configs.subtitle }}</div>
        </div>
        <slot/>
        <!-- 右下角的 footer 区域 -->
        <div v-if="showFooter" class="footer">
            <div class="author">{{ $slidev.configs.author }}</div>
            <div class="date">
                <span ref="timeElement">{{ now }}</span>
            </div>
        </div>
    </div>
</template>