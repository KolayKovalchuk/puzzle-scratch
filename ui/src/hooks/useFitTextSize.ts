import { ITextStyle, TextMetrics, TextStyle } from 'pixi.js-legacy';
import { useEffect, useState } from 'react';

const cache = new Map<string, number>();

export function useFitTextSize(
    text: string,
    targetWidth: number,
    targetHeight: number,
    textStyle: Partial<ITextStyle>,
    shouldFitHorizontally: boolean = true,
    shouldFitVertically: boolean = true
) {
    const initialFontSize = typeof textStyle.fontSize === 'number' ? textStyle.fontSize : Number(textStyle.fontSize?.replace('px', ''));
    const [fontSize, setFontSize] = useState(initialFontSize);

    useEffect(() => {
        if (!targetWidth || !targetHeight || !text) return;

        const cacheKey = `${text}-${targetWidth}-${targetHeight}-${initialFontSize}-${shouldFitHorizontally}-${shouldFitVertically}`;

        if (cache.has(cacheKey)) {
            const cacheFontSize = cache.get(cacheKey);
            console.log('cacheFontSize',text, cacheFontSize);
            
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

        if (shouldFitHorizontally) {
            while ((metrics.width > targetWidth) && currentFontSize > 0) {
                currentFontSize -= 1;
                metrics = measureTextSize(currentFontSize);
            }
        }

        if (shouldFitVertically) {
            while ((metrics.height > targetHeight) && currentFontSize > 0) {
                currentFontSize -= 1;
                metrics = measureTextSize(currentFontSize);
            }
        }

        setFontSize(currentFontSize);
        cache.set(cacheKey, currentFontSize);
    }, [text, targetWidth, targetHeight, initialFontSize, shouldFitHorizontally, shouldFitVertically]);

    return fontSize;
}
