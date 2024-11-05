import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

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
    ],
    base: process.env.VITE_BASE_URL || '/',
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@routers': path.resolve(__dirname, 'src/routers'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),

            //SCSS styles
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    }
});
