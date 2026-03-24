import { defineConfig } from 'vite';
import MdItAdmon from 'markdown-it-admon';

const pixabayApiKey = process.env.PIXABAY || ''

export default defineConfig({
    define: {
        'import.meta.env.PIXABAY': JSON.stringify(pixabayApiKey),
    },
    slidev: {
        markdown: {
            markdownItSetup(md: any) {
                const plugin = (MdItAdmon as any)?.default || MdItAdmon;
                md.use(plugin);
            },
        },
    }
} as any)
