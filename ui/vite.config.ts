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
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    }
});
