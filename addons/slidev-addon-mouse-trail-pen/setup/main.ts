import { defineAppSetup } from '@slidev/types'
import { computed, ref, watch } from 'vue'

// 颜色配置接口
interface TrailConfig {
    maxPoints?: number
    fadeDuration?: number
    lineWidth?: number
    colors?: string[]
    preset?: string
    enabled?: boolean
}

// 默认配置
const defaultConfig: TrailConfig = {
    maxPoints: 50,
    fadeDuration: 1000,
    lineWidth: 3,
    colors: ['rgba(64, 164, 255, 0)', 'rgba(64, 164, 255, 0.8)', 'rgba(64, 164, 255, 1)'],
    enabled: true
}

// 预设颜色方案
const colorPresets = {
    blue: ['rgba(64, 164, 255, 0)', 'rgba(64, 164, 255, 0.8)', 'rgba(64, 164, 255, 1)'],
    green: ['rgba(0, 255, 136, 0)', 'rgba(0, 255, 136, 0.8)', 'rgba(0, 255, 136, 1)'],
    purple: ['rgba(147, 51, 234, 0)', 'rgba(147, 51, 234, 0.8)', 'rgba(147, 51, 234, 1)'],
    red: ['rgba(239, 68, 68, 0)', 'rgba(239, 68, 68, 0.8)', 'rgba(239, 68, 68, 1)'],
    orange: ['rgba(249, 115, 22, 0)', 'rgba(249, 115, 22, 0.8)', 'rgba(249, 115, 22, 1)'],
    pink: ['rgba(236, 72, 153, 0)', 'rgba(236, 72, 153, 0.8)', 'rgba(236, 72, 153, 1)'],
    rainbow: [
        'rgba(255, 0, 0, 0)',
        'rgba(255, 165, 0, 0.6)',
        'rgba(255, 255, 0, 0.7)',
        'rgba(0, 255, 0, 0.8)',
        'rgba(0, 0, 255, 0.9)',
        'rgba(75, 0, 130, 1)',
        'rgba(238, 130, 238, 1)'
    ],
    fire: [
        'rgba(255, 69, 0, 0)',
        'rgba(255, 140, 0, 0.6)',
        'rgba(255, 215, 0, 0.8)',
        'rgba(255, 69, 0, 1)'
    ],
    ocean: [
        'rgba(0, 191, 255, 0)',
        'rgba(30, 144, 255, 0.6)',
        'rgba(0, 0, 139, 0.8)',
        'rgba(25, 25, 112, 1)'
    ],
    ink: [
        'rgba(255, 255, 255, 0)',
        'rgba(128, 128, 128, 0.4)',
        'rgba(64, 64, 64, 0.7)',
        'rgba(32, 32, 32, 0.9)',
        'rgba(0, 0, 0, 1)'
    ]
}

export default defineAppSetup(({ app, router }) => {
    // 获取 frontmatter 配置，目前看 addon 无法直接读取 headmatter 中的数据
    const getFrontmatterConfig = (): TrailConfig => {
        const config = { ...defaultConfig }

        return config
    }

    // 获取当前页面的 HTML 配置
    const getCurrentPageConfig = (baseConfig: TrailConfig): TrailConfig => {
        const config = { ...baseConfig }

        // 查找当前页面
        const getCurrentSlide = (): Element | null => {
            const urlMatch = window.location.pathname.match(/\/(\d+)$/) ||
                window.location.hash.match(/#\/(\d+)/)
            let currentPageNum = 1

            if (urlMatch) {
                currentPageNum = parseInt(urlMatch[1])
            } else if (window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                currentPageNum = 1
            }

            return document.querySelector(`[data-slidev-page="${currentPageNum}"]`) ||
                document.querySelectorAll('.slidev-page')[currentPageNum - 1] ||
                document.querySelector('.slidev-page-current, .slidev-page.active') ||
                document.querySelector('main, .slidev-page') ||
                document.body
        }

        const activeSlide = getCurrentSlide()
        if (activeSlide) {
            // 检查自定义配置
            const configEl = activeSlide.querySelector('[data-mouse-trail-config]')
            if (configEl) {
                try {
                    const userConfig = JSON.parse(configEl.getAttribute('data-mouse-trail-config') || '{}')
                    Object.assign(config, userConfig)
                } catch (e) {
                    console.warn('Invalid mouse trail config:', e)
                }
            }

            // 检查预设颜色
            const presetEl = activeSlide.querySelector('[data-mouse-trail-preset]')
            if (presetEl) {
                const preset = presetEl.getAttribute('data-mouse-trail-preset')
                if (preset && colorPresets[preset as keyof typeof colorPresets]) {
                    config.colors = colorPresets[preset as keyof typeof colorPresets]
                }
            }
        }

        return config
    }

    // 鼠标轨迹实现
    let points: Array<{ x: number, y: number, timestamp: number }> = []
    let canvas: HTMLCanvasElement | null = null
    let ctx: CanvasRenderingContext2D | null = null
    let animationFrameId: number | null = null
    let config = getFrontmatterConfig()

    const initCanvas = () => {
        canvas = document.createElement('canvas')
        canvas.style.position = 'fixed'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.pointerEvents = 'none'
        canvas.style.zIndex = '9999'
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        document.body.appendChild(canvas)
        ctx = canvas.getContext('2d')

        window.addEventListener('resize', () => {
            if (canvas) {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
            }
        })
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!config.enabled) return

        points.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now()
        })

        if (points.length > (config.maxPoints || 50)) {
            points.shift()
        }
    }

    const updateConfig = () => {
        const newConfig = getCurrentPageConfig(getFrontmatterConfig())
        if (JSON.stringify(newConfig) !== JSON.stringify(config)) {
            config = newConfig
            points = [] // 清除轨迹让新配置立即生效
        }
    }

    const drawTrail = () => {
        if (!canvas || !ctx || !config.enabled) {
            animationFrameId = requestAnimationFrame(drawTrail)
            return
        }

        updateConfig()

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const now = Date.now()
        points = points.filter(point => now - point.timestamp < (config.fadeDuration || 1000))

        if (points.length < 2) {
            animationFrameId = requestAnimationFrame(drawTrail)
            return
        }

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        const gradient = ctx.createLinearGradient(
            points[0].x, points[0].y,
            points[points.length - 1].x, points[points.length - 1].y
        )

        const colors = config.colors || defaultConfig.colors!
        colors.forEach((color, index) => {
            const stop = index / (colors.length - 1)
            gradient.addColorStop(stop, color)
        })

        ctx.strokeStyle = gradient
        ctx.lineWidth = config.lineWidth || 3
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        for (let i = 1; i < points.length; i++) {
            const p = points[i]
            const prev = points[i - 1]
            const cpx = (prev.x + p.x) / 2
            const cpy = (prev.y + p.y) / 2

            ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy)
        }

        ctx.stroke()
        animationFrameId = requestAnimationFrame(drawTrail)
    }

    // 初始化
    if (typeof window !== 'undefined') {
        const initialize = () => {
            setTimeout(() => {
                config = getFrontmatterConfig()
                if (config.enabled !== false) {
                    initCanvas()
                    document.addEventListener('mousemove', handleMouseMove)
                    animationFrameId = requestAnimationFrame(drawTrail)
                }
            }, 100)
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initialize)
        } else {
            initialize()
        }
    }
})
