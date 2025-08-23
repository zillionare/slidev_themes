import { resolve } from 'path';
import { defineConfig } from 'vite';

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
                rewrite: (path) => path.replace(/^\/thebe/, '')
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
        }
    },
    resolve: {
        alias: {
            'thebe-core': resolve(__dirname, 'node_modules/thebe-core/dist/esm/index.js')
        }
    }
})