import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import restart from 'vite-plugin-restart';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler' // or "modern"
            }
        }
    },
    plugins: [
        react(),
        createSvgSpritePlugin({
            include: '**/src/assets/icons/**/*.svg',
        }),
        restart({
            restart: [
                './public/**/*', // Path to your JSON file
                // Add more paths if needed
            ]
        })
    ],
    base: process.env.VITE_BASE_URL || '/',
    resolve: {
        alias: {
            '@config': path.resolve(__dirname, 'src/config'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@routers': path.resolve(__dirname, 'src/routers'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),

            //SCSS styles
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true
                }),
                NodeModulesPolyfillPlugin()
            ]
        }
    },
    build: {
        rollupOptions: {
            plugins: [
                inject({ Buffer: ['buffer/', 'Buffer'] })
            ],
            external: ['buffer/', 'Buffer']
        }
        // commonjsOptions: {
        //     transformMixedEsModules: true
        // }
    }
});
