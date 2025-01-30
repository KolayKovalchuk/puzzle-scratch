import { ITextStyle, TextMetrics, TextStyle } from 'pixi.js-legacy';
import { useEffect, useMemo, useState } from 'react';

export function useFitTextSize(
    text: string,
    targetWidth: number,
    targetHeight: number,
    textStyle: Partial<ITextStyle>) {
    const initialFontSize = typeof textStyle.fontSize === 'number' ? textStyle.fontSize : Number(textStyle.fontSize?.replace('px', ''));
    // const [fontSize, setFontSize] = useState(initialFontSize);

    return useMemo(() => {
        if (!targetWidth || !targetHeight || !text) return;

        console.log('useFitTextSize', text, targetWidth, targetHeight, initialFontSize);
        

        const measureTextSize = (fontSize: number) => {
            // console.log('measureTextSize', text, fontSize, targetWidth, targetHeight);
            
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

        // if (currentFontSize === 0) {
        //     console.warn(`Text '${text}' is too long to fit the target width:${targetWidth}`);
        // }

        // setFontSize(currentFontSize);
        return currentFontSize;
    }, [text, targetWidth, targetHeight, initialFontSize]);

    // return fontSize;
}
