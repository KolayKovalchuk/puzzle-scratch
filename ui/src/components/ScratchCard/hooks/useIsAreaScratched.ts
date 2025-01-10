import { useApp, useTick } from '@pixi/react';
import { Application, ICanvas, RenderTexture } from 'pixi.js-legacy';
import { useCallback, useMemo, useState } from 'react';

export function getIsAreaScratched(
    app: Application<ICanvas>,
    renderTexture: RenderTexture,
    x: number,
    y: number,
    width: number,
    height: number,
) {
    const pixels = app.renderer.extract.pixels(renderTexture);
    for (let i = y; i < y + height; i++) {
        for (let j = x; j < x + width; j++) {
            const index = (i * renderTexture.width + j) * 4;
            if (pixels[index + 3] === 0) { // Check alpha value
                return false;
            }
        }
    }
    return true;
}

export function useIsAreaScratched(
    renderTexture: RenderTexture,
    x: number,
    y: number,
    width: number,
    height: number,
    dragging: boolean,
) {
    const app = useApp();

    const isAreaScratchedCB = useCallback(getIsAreaScratched, [app, renderTexture, x, y, width, height]);

    const [isAreaScratched, setIsAreaScratched] = useState(false);

    useTick(() => {
        const isAreaScratched = isAreaScratchedCB(app, renderTexture, x, y, width, height);
        setIsAreaScratched(isAreaScratched);
    }, dragging);

    return isAreaScratched;
}

export function getScratchedAreaByPercent(width: number, height: number, percent: number) {
    const targetWidth = Math.round(width * percent);
    const targetHeight = Math.round(height * percent);
    const x = Math.round((width - targetWidth) / 2);
    const y = Math.round((height - targetHeight) / 2);

    return {
        x,
        y,
        targetWidth,
        targetHeight,
    }
}

export function useIsPercentAreaScratched(
    renderTexture: RenderTexture,
    percent: number,
    dragging: boolean,
) {
    const app = useApp();
    const { width, height } = app.screen;

    const { x, y, targetWidth, targetHeight } = useMemo(
        () => getScratchedAreaByPercent(width, height, percent),
        [width, height, percent]
    );

    return useIsAreaScratched(renderTexture, x, y, targetWidth, targetHeight, dragging);
}
