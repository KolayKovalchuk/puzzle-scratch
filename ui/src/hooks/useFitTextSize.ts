import { ITextStyle, TextMetrics, TextStyle } from 'pixi.js-legacy';
import { useEffect, useState } from 'react';

export function useFitTextSize(text: string, targetWidth: number, textStyle: Partial<ITextStyle>) {
    const initialFontSize = typeof textStyle.fontSize === 'number' ? textStyle.fontSize : Number(textStyle.fontSize?.replace('px', ''));
    const [fontSize, setFontSize] = useState(initialFontSize);

    useEffect(() => {
        if (!targetWidth) return;

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

        // if (currentFontSize === 0) {
        //     console.warn(`Text '${text}' is too long to fit the target width:${targetWidth}`);
        // }

        setFontSize(currentFontSize);
    }, [text, targetWidth, initialFontSize]);

    return fontSize;
}
