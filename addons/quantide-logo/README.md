# Slidev Addon: CutMe Mask

一个为 Slidev 演示文稿提供 CutMe 遮罩功能和键盘快捷键的插件。

## 功能特性

- **CutMe 遮罩**: 显示 "Cut Me" 文字遮罩，用于演示中的暂停提示
- **Pause 遮罩**: 显示 "Pause" 文字遮罩，用于演示暂停
- **键盘快捷键**: 通过 Meta 键连击控制遮罩显示
- **自动注入**: 安装后自动在所有幻灯片中可用
- **响应式设计**: 适配不同屏幕尺寸

## 安装

```bash
npm install slidev-addon-quantide-logo
```

或使用 pnpm:

```bash
pnpm add slidev-addon-quantide-logo
```

## 使用方法

### 1. 在 Slidev 项目中启用插件

在你的 `slides.md` 文件的 frontmatter 中添加插件：

```yaml
---
addons:
  - slidev-addon-quantide-logo
---
```

### 2. 键盘快捷键

插件会自动设置以下键盘快捷键：

- **Meta 键双击**: 显示/隐藏 "Cut Me" 遮罩
- **Meta 键三击**: 显示/隐藏 "Pause" 遮罩
- **ESC 键**: 隐藏所有遮罩

> **注意**: Meta 键在 Mac 上是 Cmd 键，在 Windows/Linux 上是 Windows 键

### 3. 手动控制（可选）

如果需要在代码中手动控制遮罩，可以使用以下方法：

```javascript
import { showCutMeMask, showPauseMask, hideAllMasks } from 'slidev-addon-quantide-logo'

// 显示 Cut Me 遮罩
showCutMeMask()

// 显示 Pause 遮罩
showPauseMask()

// 隐藏所有遮罩
hideAllMasks()
```

## 组件概览

### CutMeMask

主要的遮罩组件，提供以下功能：

- 显示 "Cut Me" 和 "Pause" 两种状态
- 平滑的淡入淡出动画
- 响应式文字大小
- 半透明背景遮罩

## 浏览器兼容性

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/slidev-addon-quantide-logo.git
cd slidev-addon-quantide-logo

# 安装依赖
npm install

# 运行示例
npm run dev
```

### 项目结构

```
slidev-addon-quantide-logo/
├── components/
│   └── CutMeMask.vue          # CutMe 遮罩组件
├── utils/
│   └── keyboardHandler.js     # 键盘事件处理器
├── global-bottom.vue          # 全局底部组件（自动注入）
├── index.js                   # 插件入口文件
├── package.json
└── README.md
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 更新日志

### v1.0.0

- 初始版本
- 提供 CutMe 遮罩功能
- 支持键盘快捷键控制
- 自动注入到 Slidev 演示文稿
