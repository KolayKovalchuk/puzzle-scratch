import { useApp, useTick } from '@pixi/react';
import { RenderTexture } from 'pixi.js-legacy';
import { useState } from 'react';

export function useScratchedPercent(renderTexture: RenderTexture, dragging: boolean) {
    const app = useApp();
    const [scratchedPercent, setScratchedPercent] = useState(0);

    useTick(() => {
        const pixels = app.renderer.extract.pixels(renderTexture);
        const totalPixels = pixels.length / 4; // Each pixel has 4 components (RGBA)
        let scratchedPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] > 0) { // Check alpha value
                scratchedPixels++;
            }
        }

        const percent = (scratchedPixels / totalPixels);
        setScratchedPercent(percent);
    }, dragging);

    return scratchedPercent;
}