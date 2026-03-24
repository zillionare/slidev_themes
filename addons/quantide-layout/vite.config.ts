import { defineConfig } from 'vite';
import MdItAdmon from 'markdown-it-admon';

export default defineConfig({
    slidev: {
        markdown: {
            markdownItSetup(md: any) {
                console.log("---- LOADED MARKDOWN-IT-ADMON in QUANTIDE-LAYOUT ----");
                const plugin = (MdItAdmon as any)?.default || MdItAdmon;
                md.use(plugin);
            },
        },
    }
} as any)
