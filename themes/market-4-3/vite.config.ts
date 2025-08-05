import MdItAdmon from 'markdown-it-admon';
import { full as emoji } from 'markdown-it-emoji';
import { defineConfig } from 'vite';

console.warn("load markdown-it-admon")
export default defineConfig({
    server: {
        fs: {
            strict: false
        }
    },
    slidev: {
        vue: {
            /* vue options */
            template: {
                compilerOptions: {
                    whitespace: 'preserve'
                }
            }
        },
        markdown: {
            /* markdown-it options */
            markdownItSetup(md) {
                md.use(emoji);
                md.use(MdItAdmon);
            },
        },
    }
})
