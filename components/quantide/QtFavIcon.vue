<template></template>
<svg width="100" height="100" viewBox="0 -10 100 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
        <!-- 创建模糊效果 -->
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
        <!-- 偏移模糊效果 -->
        <feOffset in="blur" dx="2" dy="2" result="offsetBlur"/>
        <!-- 设置阴影颜色 -->
        <feFlood flood-color="black" flood-opacity="0.5" result="offsetColor"/>
        <!-- 合并阴影和原始图像 -->
        <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="shadow"/>
        <!-- 将阴影和原始文本合并 -->
        <feMerge>
            <feMergeNode in="shadow"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
        </filter>
    </defs>
    <path d="M 8 29.4 L 40 10.9 M 83 32 L 83 68 M 12 72.9 L44 91.4 " stroke="#808080" stroke-width="2"/>
    <polygon points="0,25.98
        45,0
        90,25.98
        90,74.02
        45,100
        0,74.02" fill="none" stroke="#f00000" stroke-width="6" filter="url(#dropshadow)"/>

    <text x="45" y="60" font-size="12" fill="#F00000" text-anchor="middle" dominant-baseline="middle" filter="url(#dropshadow)">T</text>
    </svg>
</template>
