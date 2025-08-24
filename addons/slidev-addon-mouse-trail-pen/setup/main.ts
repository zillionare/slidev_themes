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
    triggerKey?: 'none' | 'alt' | 'ctrl' | 'shift' | 'meta' | string
    // 爆炸动画配置
    explosionEnabled?: boolean
    explosionParticles?: number
    explosionDuration?: number
    explosionSize?: number
}

// 默认配置
const defaultConfig: TrailConfig = {
    maxPoints: 300,
    fadeDuration: 3000,
    lineWidth: 3,
    preset: 'rainbow', // 将默认预设改为 rainbow
    colors: [
        'rgba(255, 0, 0, 0)',
        'rgba(255, 165, 0, 0.6)',
        'rgba(255, 255, 0, 0.7)',
        'rgba(0, 255, 0, 0.8)',
        'rgba(0, 0, 255, 0.9)',
        'rgba(75, 0, 130, 1)',
        'rgba(238, 130, 238, 1)'
    ],
    enabled: true,
    triggerKey: 'alt', // 默认使用 alt 键触发
    // 爆炸动画默认配置
    explosionEnabled: true,
    explosionParticles: 8,
    explosionDuration: 800,
    explosionSize: 20
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
        'rgba(32, 32, 112, 0.9)',
        'rgba(0, 0, 0, 1)'
    ]
}

const get_config = () => {
    console.log('[MouseTrail] 开始获取配置...')
    
    if (typeof window !== 'undefined' && (window as any).__slidev__) {
        const slidevData = (window as any).__slidev__
        console.log('[MouseTrail] Slidev 数据:', slidevData)
        
        // 优先使用 configs.mouseTrail
        let mouseTrailConfig = {}
        if (slidevData.configs && slidevData.configs.mouseTrail) {
            mouseTrailConfig = slidevData.configs.mouseTrail
            console.log('[MouseTrail] 从 configs.mouseTrail 获取配置:', mouseTrailConfig)
        } else {
            // 回退到 frontmatter
            const frontmatter = slidevData.frontmatter || {}
            console.log('[MouseTrail] Frontmatter 数据:', frontmatter)
            mouseTrailConfig = frontmatter.mouseTrail || frontmatter.mouse_trail || {}
            console.log('[MouseTrail] 从 frontmatter 获取配置:', mouseTrailConfig)
        }

        // 合并默认配置和获取的配置
        const config = { ...defaultConfig, ...mouseTrailConfig }
        console.log('[MouseTrail] 合并后的配置:', config)

        // 如果配置了预设颜色，则使用预设的颜色
        if (config.preset && colorPresets[config.preset as keyof typeof colorPresets]) {
            config.colors = colorPresets[config.preset as keyof typeof colorPresets]
            console.log('[MouseTrail] 使用预设颜色:', config.preset, config.colors)
        }

        console.log('[MouseTrail] 最终配置:', config)
        return config
    }

    console.log('[MouseTrail] 无法获取 Slidev 数据，使用默认配置')
    // 如果无法获取 SLIDEV 数据，则返回默认配置
    return defaultConfig
}

export default defineAppSetup(({ app, router }) => {
    console.log('[MouseTrail] 插件初始化开始')
    
    // 延迟获取配置，确保 Slidev 完全加载
    let frontmatterConfig = defaultConfig
    
    const loadConfig = () => {
        frontmatterConfig = get_config()
        console.log('[MouseTrail] 配置加载完成:', frontmatterConfig)
        return frontmatterConfig
    }
    
    // 立即尝试获取配置
    setTimeout(() => {
        loadConfig()
    }, 50)

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

    // 粒子接口定义
    interface Particle {
        x: number
        y: number
        vx: number
        vy: number
        life: number
        maxLife: number
        size: number
        color: string
    }

    // 轨迹点接口定义
    interface TrailPoint {
        x: number
        y: number
        timestamp: number
        exploding?: boolean
        explosionStartTime?: number
    }

    // 鼠标轨迹实现
    let points: Array<TrailPoint> = []
    let particles: Array<Particle> = []
    let canvas: HTMLCanvasElement | null = null
    let ctx: CanvasRenderingContext2D | null = null
    let animationFrameId: number | null = null
    let config = frontmatterConfig
    let triggerKeyPressed = false // 触发键状态跟踪

    // 检查触发键是否按下
    const isTriggerKeyPressed = (e: KeyboardEvent): boolean => {
        const triggerKey = config.triggerKey || 'alt'
        
        switch (triggerKey.toLowerCase()) {
            case 'none':
                return true // 如果设置为 none，则始终返回 true
            case 'alt':
                return e.altKey
            case 'ctrl':
                return e.ctrlKey
            case 'shift':
                return e.shiftKey
            case 'meta':
                return e.metaKey
            default:
                // 支持自定义键名
                return e.key.toLowerCase() === triggerKey.toLowerCase()
        }
    }

    // 监听键盘事件
    const handleKeyDown = (e: KeyboardEvent) => {
        if (isTriggerKeyPressed(e)) {
            triggerKeyPressed = true
        }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        const wasPressed = triggerKeyPressed
        triggerKeyPressed = isTriggerKeyPressed(e)
        
        // 如果触发键被释放，清除轨迹点和粒子效果
        if (wasPressed && !triggerKeyPressed) {
            points = []
            particles = []
        }
    }

    // 粒子系统实现
    const createExplosion = (x: number, y: number) => {
        if (!config.explosionEnabled) return
        
        const particleCount = config.explosionParticles || 8
        const explosionSize = config.explosionSize || 20
        const colors = config.colors || defaultConfig.colors!
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount
            const speed = Math.random() * 3 + 2
            const size = Math.random() * 4 + 2
            const colorIndex = Math.floor(Math.random() * colors.length)
            
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: config.explosionDuration || 800,
                maxLife: config.explosionDuration || 800,
                size: size,
                color: colors[colorIndex]
            })
        }
    }

    const updateParticles = () => {
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i]
            
            // 更新位置
            particle.x += particle.vx
            particle.y += particle.vy
            
            // 添加重力效果
            particle.vy += 0.1
            
            // 减少生命值
            particle.life -= 16 // 假设 60fps，每帧约 16ms
            
            // 移除死亡的粒子
            if (particle.life <= 0) {
                particles.splice(i, 1)
            }
        }
    }

    const drawParticles = () => {
        if (!ctx) return
        
        particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife
            const size = particle.size * alpha
            
            ctx!.save()
            ctx!.globalAlpha = alpha
            
            // 解析颜色并应用透明度
            const colorMatch = particle.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
            if (colorMatch) {
                const [, r, g, b] = colorMatch
                ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
            } else {
                ctx!.fillStyle = particle.color
            }
            
            ctx!.beginPath()
            ctx!.arc(particle.x, particle.y, size, 0, Math.PI * 2)
            ctx!.fill()
            
            ctx!.restore()
        })
    }

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
        // 检查是否应该记录轨迹点
        const shouldTrack = config.enabled && (config.triggerKey === 'none' || triggerKeyPressed)
        if (!shouldTrack) return

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
        console.log('[MouseTrail] 更新配置中...')
        // 重新加载基础配置
        const baseConfig = loadConfig()
        const newConfig = getCurrentPageConfig(baseConfig)
        console.log('[MouseTrail] 新配置:', newConfig)
        console.log('[MouseTrail] 当前配置:', config)
        
        if (JSON.stringify(newConfig) !== JSON.stringify(config)) {
            console.log('[MouseTrail] 配置发生变化，应用新配置')
            const oldTriggerKey = config.triggerKey
            config = newConfig
            
            // 如果触发键配置发生变化，更新触发键状态
            if (oldTriggerKey !== newConfig.triggerKey) {
                console.log('[MouseTrail] 触发键配置变化:', oldTriggerKey, '->', newConfig.triggerKey)
                if (newConfig.triggerKey === 'none') {
                    triggerKeyPressed = true
                    console.log('[MouseTrail] 切换到持续跟踪模式')
                } else {
                    triggerKeyPressed = false
                    console.log('[MouseTrail] 切换到按键触发模式')
                }
            }
            
            points = [] // 清除轨迹让新配置立即生效
            particles = [] // 清除粒子效果
        }
    }

    const drawTrail = () => {
        const shouldDraw = config.enabled && (config.triggerKey === 'none' || triggerKeyPressed)
        if (!canvas || !ctx || !shouldDraw) {
            // 如果不应该绘制，清除画布
            if (canvas && ctx && (!config.enabled || (!shouldDraw && config.triggerKey !== 'none'))) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            }
            animationFrameId = requestAnimationFrame(drawTrail)
            return
        }

        updateConfig()

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const now = Date.now()
        const fadeDuration = config.fadeDuration || 1000
        
        // 检查即将过期的点，为它们创建爆炸效果
        if (config.explosionEnabled) {
            points.forEach(point => {
                if (!point.exploding && now - point.timestamp >= fadeDuration) {
                    point.exploding = true
                    point.explosionStartTime = now
                    createExplosion(point.x, point.y)
                }
            })
        }
        
        // 过滤掉过期的点
        points = points.filter(point => now - point.timestamp < fadeDuration)
        
        // 更新粒子系统
        updateParticles()
        
        // 绘制粒子效果
        drawParticles()

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
            console.log('[MouseTrail] 开始初始化画布和事件监听')
            setTimeout(() => {
                // 重新加载配置确保使用最新配置
                const currentConfig = loadConfig()
                config = currentConfig // 更新全局配置
                console.log('[MouseTrail] 检查是否启用:', currentConfig.enabled)
                console.log('[MouseTrail] 触发键设置:', currentConfig.triggerKey)
                
                if (currentConfig.enabled !== false) {
                    console.log('[MouseTrail] 初始化画布和事件监听器')
                    
                    // 如果触发键设置为 'none'，则初始状态为 true
                    if (currentConfig.triggerKey === 'none') {
                        triggerKeyPressed = true
                        console.log('[MouseTrail] 触发键设置为 none，启用持续跟踪模式')
                    }
                    
                    initCanvas()
                    document.addEventListener('mousemove', handleMouseMove)
                    
                    // 只有在非 'none' 模式下才监听键盘事件
                    if (currentConfig.triggerKey !== 'none') {
                        document.addEventListener('keydown', handleKeyDown)
                        document.addEventListener('keyup', handleKeyUp)
                    }
                    
                    animationFrameId = requestAnimationFrame(drawTrail)
                    console.log('[MouseTrail] 初始化完成')
                } else {
                    console.log('[MouseTrail] 插件已禁用')
                }
            }, 200)
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initialize)
        } else {
            initialize()
        }
    }

    // 监听路由变化以更新配置
    if (router) {
        router.afterEach((to, from) => {
            console.log('[MouseTrail] 路由变化:', from.path, '->', to.path)
            setTimeout(() => {
                updateConfig()
            }, 100)
        })
    }
})
