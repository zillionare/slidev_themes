<template>
    <div class="card-wrapper" :style="wrapperStyle">
        <!-- SVG definitions for clipPath -->
        <svg width="0" height="0" style="position: absolute;">
            <defs>
                <!-- SVG clipPath cannot use image elements for clipping -->
            </defs>
        </svg>

        <div class="card-container" :class="[orientationClass, modeClass]" :style="containerStyle">
            <!-- Image mode (when img exists, or both img and icon exist) -->
            <template v-if="img">
                <div class="card-image" :data-frame="frame" :style="imageStyle">
                    <img :src="img" :alt="title" :style="imgClipStyle" />
                </div>
                <div class="card-content">
                    <h3 class="card-title" :style="titleStyle">{{ title }}</h3>
                    <div class="card-text" :style="textStyle">
                        <slot></slot>
                    </div>
                </div>
            </template>

            <!-- Icon mode (when only icon exists) -->
            <template v-else-if="icon">
                <div class="card-icon-section" :style="iconSectionStyle">
                    <div class="card-icon" :style="iconStyle">
                        <Icon v-if="icon" :icon="iconComponent" :style="{ fontSize: iconSize, color: iconColor }" />
                    </div>
                    <h3 class="card-title" :style="titleStyle">{{ title }}</h3>
                </div>
                <div class="card-content" :style="iconContentStyle">
                    <div class="card-text" :style="textStyle">
                        <slot></slot>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    iconSize: {
        type: String,
        default: '96px'
    },
    iconColor: {
        type: String,
        default: '#666666'
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
        default: '5px'
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

// Validate props - at least one of img or icon should be provided
watchEffect(() => {
    if (!props.img && !props.icon) {
        console.warn('Card component: Either img or icon prop should be provided')
    }
})

const orientationClass = computed(() => {
    return `card-${props.orientation}`
})

// Parse icon name and generate Iconify CSS classes
const iconifyClasses = computed(() => {
    if (!props.icon) return []

    // Handle different icon libraries using Iconify format
    if (props.icon.startsWith('mdi-')) {
        return [`i-${props.icon}`, 'icon']
    } else if (props.icon.startsWith('fa-')) {
        return [`i-fa-${props.icon.replace('fa-', '')}`, 'icon']
    } else if (props.icon.startsWith('fas-')) {
        return [`i-fa-solid-${props.icon.replace('fas-', '')}`, 'icon']
    } else if (props.icon.startsWith('far-')) {
        return [`i-fa-regular-${props.icon.replace('far-', '')}`, 'icon']
    } else if (props.icon.startsWith('fab-')) {
        return [`i-fa-brands-${props.icon.replace('fab-', '')}`, 'icon']
    } else {
        // Default to mdi if no prefix is provided
        return [`i-mdi-${props.icon}`, 'icon']
    }
})

const modeClass = computed(() => {
    // If img exists (regardless of icon), use image mode
    // If only icon exists, use icon mode
    return props.img ? 'card-image' : (props.icon ? 'card-icon' : 'card-image')
})

const iconComponent = computed(() => {
    if (!props.icon) return null

    // Convert icon name to Iconify format
    // e.g., 'mdi-leaf' -> 'mdi:leaf', 'fa-code' -> 'fa:code'
    const icon = props.icon

    if (icon.startsWith('mdi-')) {
        return `mdi:${icon.substring(4)}`
    } else if (icon.startsWith('fa-')) {
        return `fa:${icon.substring(3)}`
    } else if (icon.startsWith('fas-')) {
        return `fa-solid:${icon.substring(4)}`
    } else if (icon.startsWith('far-')) {
        return `fa-regular:${icon.substring(4)}`
    } else if (icon.startsWith('fab-')) {
        return `fa-brands:${icon.substring(4)}`
    }

    // Return as-is for other formats
    return icon
})

const wrapperStyle = computed(() => {
    // Fixed design dimensions
    const designDimensions = {
        landscape: { width: 400, height: 250 },
        portrait: { width: 300, height: 500 }
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
        landscape: { width: 400, height: 250 },
        portrait: { width: 300, height: 500 }
    }

    const design = designDimensions[props.orientation]

    return {
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        boxShadow: props.shadow ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
        width: `${design.width}px`,
        height: `${design.height}px`
    }
})

const imageStyle = computed(() => {
    // Fixed design dimensions with image taking 1/3 of the width/height
    const designDimensions = {
        landscape: { width: 400, height: 250 },
        portrait: { width: 300, height: 500 }
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
            height: `${design.height / 3}px`,
            flexShrink: 0
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

// Icon mode styles
const iconStyle = computed(() => {
    return {
        fontSize: props.iconSize,
        color: props.iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px'
    }
})

const iconSectionStyle = computed(() => {
    const designDimensions = {
        landscape: { width: 400, height: 250 },
        portrait: { width: 300, height: 500 }
    }

    const design = designDimensions[props.orientation]

    if (props.orientation === 'landscape') {
        // Icon/title section takes 1/3 of width, full height
        return {
            width: `${design.width / 3}px`,
            height: `${design.height}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }
    } else {
        // Portrait: Icon/title section takes full width, fixed height
        return {
            width: `${design.width}px`,
            height: `${design.height / 3}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 20px 10px 20px',
            flexShrink: 0
        }
    }
})

const iconContentStyle = computed(() => {
    const designDimensions = {
        landscape: { width: 400, height: 250 },
        portrait: { width: 300, height: 500 }
    }

    const design = designDimensions[props.orientation]

    if (props.orientation === 'landscape') {
        // Content takes 2/3 of width, full height
        return {
            width: `${(design.width * 2) / 3}px`,
            height: `${design.height}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px'
        }
    } else {
        // Portrait: Content takes full width, remaining height
        return {
            width: `${design.width}px`,
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '10px 20px 20px 20px'
        }
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
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
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
    min-height: 0;
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

/* Portrait模式下，有frame的图片添加上边距 */
.card-portrait .card-image[data-frame="circle"],
.card-portrait .card-image[data-frame="ellipse"],
.card-portrait .card-image[data-frame="lens"],
.card-portrait .card-image[data-frame="diamond"],
.card-portrait .card-image[data-frame="teardrop"],
.card-portrait .card-image[data-frame="mapleleaf"],
.card-portrait .card-image[data-frame="gem"] {
    margin-top: 1rem;
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
    font-size: 0.8em;
    opacity: 0.9;
    line-height: 1.6;
    flex: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    text-align: center;
    padding-top: 10px;
    max-height: 100%;
}

/* Landscape模式下，card-title 增加上边距 */
.card-landscape .card-title {
    margin-top: 16px;
}

/* Icon mode styles */
.card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    transition: all 0.3s ease;
}

.card-icon-section {
    flex-shrink: 0;
}

.card-icon-section .card-title {
    text-align: center;
    margin: 0;
}

/* Icon mode landscape - left align text content */
.card-icon.card-landscape .card-text {
    text-align: left;
    justify-content: flex-start;
}

/* Icon mode layout adjustments */
.card-icon.card-landscape {
    flex-direction: row;
}

.card-icon.card-portrait {
    flex-direction: column;
}

/* Icon hover effects */
.card-container:hover .card-icon {
    transform: scale(1.05);
}

/* Left-align code and list items in card slots */
:deep(.card-text pre),
:deep(.card-text code) {
    text-align: left;
}

:deep(.card-text ul),
:deep(.card-text ol) {
    text-align: left;
    padding-left: 1.5em;
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

    /* Icon mode responsive adjustments */
    .card-icon.card-landscape {
        flex-direction: column;
    }

    .card-icon.card-landscape .card-icon-section {
        width: 100% !important;
        height: auto !important;
        padding: 20px;
    }

    .card-icon.card-landscape .card-content {
        width: 100% !important;
        height: auto !important;
        flex: 1;
    }
}
</style>