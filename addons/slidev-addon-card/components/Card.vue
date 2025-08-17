<template>
    <div class="card-wrapper" :style="wrapperStyle">
        <!-- SVG definitions for clipPath -->
        <svg width="0" height="0" style="position: absolute;">
            <defs>
                <!-- SVG clipPath cannot use image elements for clipping -->
            </defs>
        </svg>
        
        <div class="card-container" :class="orientationClass" :style="containerStyle">
            <div class="card-image" :data-frame="frame" :style="imageStyle">
                <img :src="img" :alt="title" :style="imgClipStyle" />
            </div>
            <div class="card-content">
                <h3 class="card-title" :style="titleStyle">{{ title }}</h3>
                <div class="card-text" :style="textStyle">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    orientation: {
        type: String,
        default: 'landscape',
        validator: (value) => ['landscape', 'portrait'].includes(value)
    },
    frame: {
        type: String,
        default: 'rectangle',
        validator: (value) => ['rectangle', 'circle', 'ellipse', 'diamond', 'gem', 'lens', 'teardrop', 'mapleleaf'].includes(value)
    },
    backgroundColor: {
        type: String,
        default: '#ffffff'
    },
    borderColor: {
        type: String,
        default: '#e0e0e0'
    },
    titleColor: {
        type: String,
        default: '#333333'
    },
    textColor: {
        type: String,
        default: '#666666'
    },
    borderRadius: {
        type: String,
        default: '12px'
    },
    shadow: {
        type: Boolean,
        default: true
    },
    width: {
        type: [String, Number],
        default: null
    }
})

const orientationClass = computed(() => {
    return `card-${props.orientation}`
})

const wrapperStyle = computed(() => {
    // Fixed design dimensions
    const designDimensions = {
        landscape: { width: 600, height: 360 },
        portrait: { width: 360, height: 600 }
    }

    const design = designDimensions[props.orientation]
    let scale = 1

    // Calculate scale based on user-specified width
    if (props.width) {
        const targetWidth = typeof props.width === 'string' ? parseInt(props.width) : props.width
        scale = targetWidth / design.width
    }

    return {
        transform: scale !== 1 ? `scale(${scale})` : 'none',
        transformOrigin: 'top left',
        display: 'inline-block'
    }
})

const containerStyle = computed(() => {
    // Fixed design dimensions
    const designDimensions = {
        landscape: { width: 600, height: 360 },
        portrait: { width: 360, height: 600 }
    }

    const design = designDimensions[props.orientation]

    return {
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        boxShadow: props.shadow ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
        width: `${design.width}px`,
        height: `${design.height}px`
    }
})

const imageStyle = computed(() => {
    // Fixed design dimensions with image taking 1/3 of the width/height
    const designDimensions = {
        landscape: { width: 600, height: 360 },
        portrait: { width: 360, height: 600 }
    }

    const design = designDimensions[props.orientation]

    if (props.orientation === 'landscape') {
        // Image takes 1/3 of width, full height
        return {
            width: `${design.width / 3}px`,
            height: `${design.height}px`
        }
    } else {
        // Portrait: Image takes full width, 1/3 of height
        return {
            width: `${design.width}px`,
            height: `${design.height / 3}px`
        }
    }
})

const getClipPath = (frame) => {
    switch (frame) {
        case 'circle':
            // 使用最小边作为半径，确保完整的圆形
            return 'circle(closest-side at center)'
        case 'lens':
            // 镜头形状 - 根据容器比例自适应的椭圆效果
            return 'circle(50% at center)'
        case 'ellipse':
            return 'ellipse(50% 40% at center)'
        case 'diamond':
            return 'polygon(50% 15%, 85% 50%, 50% 85%, 15% 50%)'
        case 'teardrop':
            // 水滴形状 - 使用CSS mask-image实现PNG图片剪裁
            return 'none'
        case 'mapleleaf':
            // 枫叶形状 - 使用CSS mask-image实现PNG图片剪裁
            return 'none'
        case 'gem':
            // 不规则宝石形状
            const randomPoints = [
                `${20 + Math.random() * 10}% ${10 + Math.random() * 10}%`,
                `${70 + Math.random() * 20}% ${5 + Math.random() * 15}%`,
                `${85 + Math.random() * 10}% ${40 + Math.random() * 20}%`,
                `${75 + Math.random() * 15}% ${80 + Math.random() * 15}%`,
                `${25 + Math.random() * 15}% ${85 + Math.random() * 10}%`,
                `${5 + Math.random() * 15}% ${45 + Math.random() * 20}%`
            ]
            return `polygon(${randomPoints.join(', ')})`
        case 'rectangle':
        default:
            return 'none'
    }
}

const imgClipStyle = computed(() => {
    const clipPath = getClipPath(props.frame)

    const shadowStyle = props.shadow ? (
        clipPath === 'none' && props.frame !== 'mapleleaf' && props.frame !== 'teardrop'
            ? { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)' }
            : { filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.4))' }
    ) : {}

    // 为mapleleaf和teardrop形状添加mask-image属性
    const maskStyle = props.frame === 'mapleleaf' ? {
        maskImage: 'url(https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/2025/08/maple-leaf.png)',
        WebkitMaskImage: 'url(https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/2025/08/maple-leaf.png)',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center'
    } : props.frame === 'teardrop' ? {
        maskImage: 'url(https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/2025/08/teardrop.png)',
        WebkitMaskImage: 'url(https://cdn.jsdelivr.net/gh/zillionare/imgbed2@main/images/2025/08/teardrop.png)',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center'
    } : {}

    return {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        clipPath: clipPath,
        ...shadowStyle,
        ...maskStyle
    }
})

const titleStyle = computed(() => {
    return {
        color: props.titleColor
    }
})

const textStyle = computed(() => {
    return {
        color: props.textColor
    }
})
</script>

<style scoped>
.card-wrapper {
    display: inline-block;
}

.card-container {
    display: flex;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
}

.card-landscape {
    flex-direction: row;
}

.card-portrait {
    flex-direction: column;
}

.card-image {
    overflow: hidden;
    flex-shrink: 0;
}

.card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
}

/* Landscape模式下，circle、ellipse、lens裁剪时的边距和对齐 */
.card-landscape .card-content {
    justify-content: center;
}

/* Landscape模式下，圆形裁剪时的边距 */
.card-landscape .card-image[data-frame="circle"],
.card-landscape .card-image[data-frame="ellipse"],
.card-landscape .card-image[data-frame="lens"] {
    margin-left: 16px;
}

.card-landscape .card-image[data-frame="circle"]:last-child,
.card-landscape .card-image[data-frame="ellipse"]:last-child,
.card-landscape .card-image[data-frame="lens"]:last-child {
    margin-left: 0;
    margin-right: 16px;
}

/* Portrait模式下，圆形裁剪时的边距 */
.card-portrait .card-image[data-frame="circle"],
.card-portrait .card-image[data-frame="ellipse"],
.card-portrait .card-image[data-frame="lens"] {
    margin-top: 16px;
}

.card-portrait .card-image[data-frame="circle"]:last-child,
.card-portrait .card-image[data-frame="ellipse"]:last-child,
.card-portrait .card-image[data-frame="lens"]:last-child {
    margin-top: 0;
    margin-bottom: 16px;
}

.card-title {
    margin: 0 0 12px 0;
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.3;
    text-align: center;
}

.card-text {
    font-size: 1em;
    line-height: 1.6;
    flex: 1;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

/* Landscape模式下，card-title 增加上边距 */
.card-landscape .card-title {
    margin-top: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .card-landscape {
        flex-direction: column;
    }

    .card-landscape .card-image {
        width: 100%;
        height: 200px;
    }
}
</style>
