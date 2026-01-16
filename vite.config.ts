import { resolve } from 'path';
import { defineConfig } from 'vite';
import MdItAdmon from 'markdown-it-admon';

export default defineConfig({
    server: {
        fs: {
            strict: false
        },
        proxy: {
            '/thebe': {
                target: 'http://127.0.0.1:8080/course/fa/aaron/',
                changeOrigin: true,
                ws: true,
                rewrite: (path: string) => path.replace(/^\/thebe/, '')
            }
        }
    },
    publicDir: resolve(__dirname, 'public'),
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
            markdownItSetup(md: any) {
                console.log('[vite.config] markdownItSetup applied: markdown-it-admon')
                const plugin = (MdItAdmon as any)?.default || MdItAdmon;
                md.use(plugin);
            },
        },
    },
    resolve: {
        alias: {
            'thebe-core': resolve(__dirname, 'node_modules/thebe-core/dist/esm/index.js')
        }
    }
} as any)
