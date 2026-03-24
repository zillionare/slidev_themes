import { defineConfig } from 'vite';
import MdItAdmon from 'markdown-it-admon';

console.log("==== XHS VITE CONFIG LOADED ====");

const pixabayApiKey = process.env.PIXABAY || ''

export default defineConfig({
    envPrefix: ['VITE_', 'PIXABAY'],
    slidev: {
        markdown: {
            markdownItSetup(md: any) {
                console.log("---- CALLING markdownItSetup in XHS ----");
                const plugin = (MdItAdmon as any)?.default || MdItAdmon;
                md.use(plugin);
            },
        },
    }
} as any)
