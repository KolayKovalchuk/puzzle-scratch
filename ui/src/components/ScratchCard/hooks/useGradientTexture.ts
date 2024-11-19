import { Texture } from 'pixi.js';
import { useMemo } from 'react';

export type GradientConfig = [number, string][]

export function useGradientTexture(width: number, height: number, gradientData: GradientConfig): Texture {
    return useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, 0, height);

            for (const [stop, color] of gradientData) {
                gradient.addColorStop(stop, color);
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        return Texture.from(canvas);
    }, [width, height, gradientData]);
}
