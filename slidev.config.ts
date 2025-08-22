import { defineConfig } from '@slidev/cli'

export default defineConfig({
    // 配置代码块选项
    code: {
        // 启用拷贝按钮
        copy: true,
        // 可选：设置拷贝成功后的提示文字（默认是 "Copied!"）
        copyMessage: "已复制到剪贴板！",
        // 可选：设置拷贝按钮的图标（默认使用内置图标）
        // copyIcon: '<svg>...</svg>'
    }
})
