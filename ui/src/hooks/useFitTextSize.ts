import { ITextStyle, TextMetrics, TextStyle } from 'pixi.js-legacy';
import { useEffect, useState } from 'react';

const cache = new Map<string, number>();

export function useFitTextSize(
    text: string,
    targetWidth: number,
    targetHeight: number,
    textStyle: Partial<ITextStyle>,
    shouldFitFontSize: boolean = true
) {
    const initialFontSize = typeof textStyle.fontSize === 'number' ? textStyle.fontSize : Number(textStyle.fontSize?.replace('px', ''));
    const [fontSize, setFontSize] = useState(initialFontSize);

    useEffect(() => {
        if (!shouldFitFontSize || !targetWidth || !targetHeight || !text) return;

        const cacheKey = `${text}-${targetWidth}-${targetHeight}-${initialFontSize}`;
        if (cache.has(cacheKey)) {
            const cacheFontSize = cache.get(cacheKey);
            if (cacheFontSize !== undefined) {
                setFontSize(cacheFontSize);
                return;
            }
        }

        const measureTextSize = (fontSize: number) => {
            const style = new TextStyle({ ...textStyle, fontSize });
            const metrics = TextMetrics.measureText(text, style);

            return metrics;
        };

        let currentFontSize = initialFontSize;
        let metrics = measureTextSize(currentFontSize);

        while ((metrics.width > targetWidth) && currentFontSize > 0) {
            currentFontSize -= 1;
            metrics = measureTextSize(currentFontSize);
        }

        while ((metrics.height > targetHeight) && currentFontSize > 0) {
            currentFontSize -= 1;
            metrics = measureTextSize(currentFontSize);
        }

        setFontSize(currentFontSize);
        cache.set(cacheKey, currentFontSize);
    }, [text, targetWidth, targetHeight, initialFontSize, shouldFitFontSize]);

    return fontSize;
}
