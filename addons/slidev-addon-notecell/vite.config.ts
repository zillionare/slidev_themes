import path from 'path';
import { defineConfig } from 'vite';


export default defineConfig({
    resolve: {
        alias: {//强制 thebe 使用 esm 导入
            'thebe-core': path.resolve(__dirname, 'node_modules/thebe-core/dist/esm/index.js'),
        },
    },
    server: {
        fs: {
            strict: false,
            allow: [
                '..',
                '../node_modules'
            ]
        },
        proxy: {
            '/thebe': {
                target: 'http://127.0.0.1:8080/course/fa/aaron',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => {
                    // Forward /thebe/path to /course/fa/aaron/path
                    // console.log('Proxying:', path, 'to', path.replace(/^\/thebe/, ''));
                    return path.replace(/^\/thebe/, '');
                }
            }
        }
    }
})
