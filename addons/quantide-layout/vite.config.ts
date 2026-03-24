import { defineConfig } from 'vite';
import MdItAdmon from 'markdown-it-admon';

export default defineConfig({
    slidev: {
        markdown: {
            markdownItSetup(md: any) {
                const plugin = (MdItAdmon as any)?.default || MdItAdmon;
                md.use(plugin);
            },
        },
    }
} as any)
