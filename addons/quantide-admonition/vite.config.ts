import { defineConfig } from 'vite'
import MdItAdmon from 'markdown-it-admon'

export default defineConfig({
    slidev: {
        markdown: {
            markdownSetup(md: any) {
                const plugin = (MdItAdmon as any)?.default || MdItAdmon
                md.use(plugin)
            },
            // Keep for backward compatibility with older Slidev versions
            markdownItSetup(md: any) {
                const plugin = (MdItAdmon as any)?.default || MdItAdmon
                md.use(plugin)
            },
        },
    },
} as any)

