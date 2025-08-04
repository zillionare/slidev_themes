import MdItAdmon from 'markdown-it-admon';
import { full as emoji } from 'markdown-it-emoji';
import { resolve } from 'path';
import { defineConfig } from 'vite';

console.log(`public dir is ${resolve(__dirname, '../../public')}`)
export default defineConfig({
    server: {
        fs: {
            strict: false
        },
        proxy: {
            '/thebe': {
                target: 'http://localhost:8080/course/fa/aaron/',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/thebe/, '')
            }
        }
    },
    publicDir: resolve(__dirname, '../../public'),
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
                /* custom markdown-it plugins */
                // md.use(require('markdown-it-admon'));
                // md.use(require('markdown-it-container'), 'takeaway');
                md.use(emoji);
                md.use(MdItAdmon);
            },
        },
    }
})
