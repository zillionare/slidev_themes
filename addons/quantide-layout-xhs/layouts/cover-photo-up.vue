<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const coverImageUrl = ref('')
const errorMessage = ref('')

// 获取 Pixabay API Key
// 在 .env 文件中配置：VITE_PIXABAY=your_api_key
const getPixabayApiKey = (): string => {
    return ((import.meta as any).env?.VITE_PIXABAY || '').trim()
}

const pixabayApiKey = getPixabayApiKey()

const loadCoverImage = async () => {
    errorMessage.value = ''
    const imgset = typeof $slidev.configs.img === 'string' ? $slidev.configs.img.trim() : ''
    
    if (!imgset) {
        coverImageUrl.value = ''
        return
    }
    
    const isRemoteUrl = /^https?:\/\//i.test(imgset)
    if (isRemoteUrl) {
        coverImageUrl.value = imgset
        return
    }
    
    if (!pixabayApiKey) {
        errorMessage.value = '未配置 Pixabay API Key。请在项目根目录的 .env 文件中添加：VITE_PIXABAY=your_api_key'
        coverImageUrl.value = ''
        console.warn('[cover-photo-up] 未配置 Pixabay API Key。请在 .env 文件中添加 VITE_PIXABAY=your_api_key')
        return
    }
    
    const query = imgset.replace(/=+$/g, '')
    const page = Math.floor(Math.random() * 5) + 1
    const requestUrl = `https://pixabay.com/api/?key=${encodeURIComponent(pixabayApiKey)}&q=${encodeURIComponent(query)}&image_type=photo&orientation=vertical&per_page=20&page=${page}&min_width=1200&min_height=1600&safesearch=true`
    
    try {
        const res = await fetch(requestUrl)
        if (!res.ok) {
            errorMessage.value = `Pixabay API 请求失败: ${res.status}`
            coverImageUrl.value = ''
            return
        }
        const data = await res.json()
        
        // 检查 API 错误
        if (data.error) {
            errorMessage.value = `Pixabay API 错误: ${data.error}`
            coverImageUrl.value = ''
            return
        }
        
        const hits = Array.isArray(data?.hits) ? data.hits : []
        if (!hits.length) {
            errorMessage.value = `未找到关键词 "${query}" 的图片`
            coverImageUrl.value = ''
            return
        }
        
        const suitableHits = hits.filter((hit: any) => Number(hit.imageWidth) >= 1200 && Number(hit.imageHeight) >= 1600)
        const candidates = suitableHits.length ? suitableHits : hits
        const pick = candidates[Math.floor(Math.random() * candidates.length)]
        coverImageUrl.value = pick?.largeImageURL || pick?.webformatURL || pick?.previewURL || ''
    } catch (err) {
        errorMessage.value = '图片加载失败，请检查网络连接'
        coverImageUrl.value = ''
        console.error('[cover-photo-up] 加载图片失败:', err)
    }
}

watch(
    () => $slidev.configs.img,
    () => {
        void loadCoverImage()
    },
    { immediate: true },
)

const coverImg = computed(() => {
    if (!coverImageUrl.value) {
        return {}
    }
    return {
        backgroundImage: `url("${coverImageUrl.value}")`,
    }
})

const installmentNameStyle = computed(() => {
    return {
        textAlign: 'left',
        color: 'var(--quantide-theme-primary, var(--text-primary, currentColor))',
        position: 'absolute',
        top: 'calc(50% + 30px)',
        left: '30px',
        "font-size": '1.2rem',
        "font-weight": "bold",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        zIndex: "10",
    }
})

const title = computed(()=>{ 
    return $slidev.configs.title || "cover-photo-up 演示"
})

const excerpt = computed(()=>{ 
    return $slidev.configs.excerpt || "可设置的属性有： title, installment, excerpt, img。如果不显示某项，可以传入『NA』。img 可以是完整 url， 也可以是查询关键字。当使用查询关键字时，请先配置 PIXABAY 环境变量（API KEY）"
})

const installment = computed(()=>{
    const raw = typeof $slidev.configs.installment === 'string' ? $slidev.configs.installment.trim() : ''
    if (raw.toLowerCase() === 'na') {
        return ''
    }
    return raw || "系列文章名称，选填"
})

const photoCreditText = computed(() => {
    const manual = typeof $slidev.configs.photo === 'string' ? $slidev.configs.photo.trim() : ''
    if (manual) {
        return manual
    }
    const imgset = typeof $slidev.configs.img === 'string' ? $slidev.configs.img.trim() : ''
    if (!imgset) {
        return ''
    }
    const isRemoteUrl = /^https?:\/\//i.test(imgset)
    if (isRemoteUrl) {
        if (/^https?:\/\/(?:[^/]+\.)?pixabay\.com/i.test(imgset)) {
            return 'Pixabay'
        }
        return ''
    }
    if (pixabayApiKey) {
        return 'Pixabay'
    }
    return ''
})

const showFooter = computed(() => {
    return !!photoCreditText.value
})

</script>

<style scoped>
.title-wrapper {
    background-color: white;
    width: 100%;
    height: 50%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 4rem;
    position: absolute;
    left: 0;
    top: 50%;
}

.title {
    @apply text-6xl font-bold;
    font-family: var(--slidev-font-h1, var(--slidev-theme-font-family));
    color: var(--quantide-theme-secondary, var(--slidev-theme-secondary, var(--heading-accent, var(--primary, var(--slidev-theme-primary)))));
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 2rem;
    line-height: 1.2;
}

.excerpt {
    @apply text-2xl;
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    border-left: 5px solid color-mix(in srgb, var(--quantide-theme-secondary, var(--slidev-theme-secondary, var(--heading-accent, var(--primary, var(--slidev-theme-primary))))), #000 25%);
    padding-left: 1.5rem;
    color: var(--text-secondary, var(--quantide-theme-primary, var(--slidev-theme-primary, var(--text-primary, #111))));
    line-height: 1.5;
}

.cover-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-size: cover;
    background-position: center;
}

.footer {
    @apply text-sm;
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: var(--text-on-dark, white);
    text-shadow: 0 1px 3px rgba(0,0,0,0.8);
}

.cover {
    background-color: white;
}

</style>

<template>
    <div class="slidev-layout cover">
        <div class="cover-image" :style="coverImg" />
        <div v-if="installment" class="installment-name" :style="installmentNameStyle">{{ installment }}</div>
        <div class="title-wrapper">
            <div class="title" v-html="title">
            </div>
            <div class="excerpt">{{ excerpt }}</div>
        </div>
        <div v-if="showFooter" class="footer">
            <div class="photo">
                <span>Photo Credits: {{ photoCreditText }}</span>
            </div>
        </div>
    </div>
</template>
