---
# Slidev addon demo
theme: default
addons:
  - slidev-addon-quantide-logo
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Addon Quantide Logo Demo
  
  This presentation demonstrates the slidev-addon-quantide-logo addon functionality.
  
  ### Features:
  - Quantide logo in top-right corner
  - Page footer with slide numbers
  - Cut Me mask (Meta + Meta)
  - Pause mask (Meta + Meta + Meta)
  - ESC to hide masks
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Slidev Addon Quantide Logo

演示 slidev-addon-quantide-logo 插件功能

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    按空格键进入下一页 <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="在编辑器中打开" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub" title="在 GitHub 上打开"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
这是第一页，你应该能看到：
1. 右上角的 Quantide logo
2. 底部的页码显示
-->

---
transition: fade-out
---

# 功能特性

<v-clicks>

- 📝 **右上角 Logo** - 显示 Quantide 品牌标识
- 🎨 **页脚页码** - 自动显示当前页码和总页数
- ⌨️ **键盘快捷键** - Meta 键连击控制遮罩
- 🎭 **Cut Me 遮罩** - 双击 Meta 键显示
- ⏸️ **Pause 遮罩** - 三击 Meta 键显示
- 🚪 **ESC 退出** - 按 ESC 键隐藏所有遮罩

</v-clicks>

<br>
<br>

在演示过程中尝试以下操作：
- 快速双击 **Meta** 键（Mac 上的 Cmd 键）显示 "Cut Me" 遮罩
- 快速三击 **Meta** 键显示 "Pause" 遮罩  
- 按 **ESC** 键隐藏遮罩

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

<!--
这是第二页，展示了插件的主要功能特性
-->

---

# 安装和使用

## 安装

```bash
npm install slidev-addon-quantide-logo
```

## 在 Slidev 中使用

在你的 `slides.md` 文件头部添加：

```yaml
---
theme: default
addons:
  - slidev-addon-quantide-logo
---
```

## 组件使用

你也可以在幻灯片中直接使用组件：

```vue
<QuantideLogo />
<PageFooter />
<CutMeMask ref="cutMeMask" />
```

---

# 键盘快捷键演示

<div class="text-center">
  <div class="text-6xl mb-8">⌨️</div>
  
  <div class="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <div class="text-xl font-bold mb-2">Meta + Meta</div>
      <div class="text-gray-600 dark:text-gray-400">快速双击 Meta 键显示 "Cut Me" 遮罩</div>
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <div class="text-xl font-bold mb-2">Meta + Meta + Meta</div>
      <div class="text-gray-600 dark:text-gray-400">快速三击 Meta 键显示 "Pause" 遮罩</div>
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <div class="text-xl font-bold mb-2">ESC</div>
      <div class="text-gray-600 dark:text-gray-400">按 ESC 键隐藏所有遮罩</div>
    </div>
  </div>
</div>

<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
  <div class="text-sm text-gray-500">现在就试试这些快捷键吧！</div>
</div>

---

# 技术实现

<div class="grid grid-cols-2 gap-8">

<div>

## 组件架构

- **QuantideLogo.vue** - Logo 显示组件
- **PageFooter.vue** - 页脚页码组件  
- **CutMeMask.vue** - 遮罩显示组件
- **keyboardHandler.js** - 键盘事件处理

</div>

<div>

## 核心特性

- 🎯 **响应式设计** - 适配不同屏幕尺寸
- ⚡ **轻量级** - 最小化依赖
- 🔧 **可配置** - 支持自定义配置
- 🎨 **动画效果** - 平滑的过渡动画

</div>

</div>

```javascript
// 键盘事件处理示例
setupKeyboardHandler(cutMeMaskRef)

// 手动控制遮罩
showCutMeMask()
showPauseMask()
hideMask()
```

---
layout: center
class: text-center
---

# 感谢使用！

[文档](https://github.com/your-repo/slidev-addon-quantide-logo) · [GitHub](https://github.com/your-repo/slidev-addon-quantide-logo) · [Slidev](https://sli.dev)

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    演示结束 🎉
  </span>
</div>