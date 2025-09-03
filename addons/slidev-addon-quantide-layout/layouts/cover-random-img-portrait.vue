<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { handleBackground } from '@slidev/client/layoutHelper.ts'

// 计算封面背景样式
const coverImg = computed(() => {    
    let imgset = $slidev.configs.background
    if (imgset.endsWith(".jpg")){
        return handleBackground(imgset)
    }else{
        if (~ imgset.endsWith("/")){
            imgset += "/"
        }
    }


    const total = $slidev.configs.total || 10

    const randint = Math.floor(Math.random() * total) + 1
    const background = imgset + randint + ".jpg"
    console.log("background is", background)
    
    return handleBackground(background)
})

// 计算 lecture-name 的背景样式
const lectureNameStyle = computed(() => {
    // 使用 handleBackground 函数计算背景样式
    const background = $slidev.configs.background
    const style = handleBackground(background, true)
    return {
        ...style,
        boxShadow: '0 2px 3px rgba(0, 0, 0, 0.5)',
        borderRadius: '9999px',
        textAlign: 'left',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        minWidth: '10rem',
        color: 'white',
        position: 'absolute',
        top: '20px',
        left: '1%',
        "font-size": '2rem'
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
.title-wrapper {
    /* background-color: color-mix(in srgb, var(--bg-primary) 100%, transparent); */
    width: 100%;
    height: 50%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-self: center;
    align-items: center;
    padding: 1em 0;
    position: absolute;
    left: 50%;
    top:0;
    transform: translateX(-50%);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
}

.title {
    @apply text-8xl;
    height: 70%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.subtitle {
    @apply text-4xl;
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cover-image {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
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

.cover {
    background-color: var(--primary);
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