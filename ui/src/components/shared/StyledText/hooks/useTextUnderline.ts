import { LINE_CAP, LINE_JOIN, Graphics, Text } from 'pixi.js-legacy';
import { useEffect, useRef } from 'react';

export function useTextUnderline(
    containerWidth: number,
    lineColor: string,
    borderLineColor: string,
    shadowLineColor: string,
    xShift = 0,
    yShift = -16,
    ...args: any[]
) {
    const textRef = useRef<Text>(null);
    const underlineRef = useRef<Graphics>(null);

    useEffect(() => {
        if (!textRef.current || !underlineRef.current) return
        const text = textRef.current;
        const underline = underlineRef.current;

        underline.clear();

        const textWidth = text.width;

        const lineStartX = containerWidth / 2 - textWidth / 2 + xShift;
        const lineEndX = containerWidth / 2 + textWidth / 2 + xShift;

        // Draw the shadow
        underline.lineStyle({
            width: 2,
            color: shadowLineColor,
            alpha: 1,
            cap: LINE_CAP.ROUND,
            join: LINE_JOIN.ROUND,
        });
        underline.moveTo(lineStartX, text.height + yShift + 2); // Move to the start of the inner line
        underline.lineTo(lineEndX, text.height + yShift + 2); // Draw the inner line

        // Draw the border line
        underline.lineStyle({
            width: 3,
            color: borderLineColor,
            alpha: 1,
            cap: LINE_CAP.ROUND,
            join: LINE_JOIN.ROUND,
        });
        underline.moveTo(lineStartX, text.height + yShift); // Move to the start of the border line
        underline.lineTo(lineEndX, text.height + yShift); // Draw the border line

        // Draw the inner line
        underline.lineStyle({
            width: 2,
            color: lineColor,
            alpha: 1,
            cap: LINE_CAP.ROUND,
            join: LINE_JOIN.ROUND,
        });
        underline.moveTo(lineStartX, text.height + yShift); // Move to the start of the inner line
        underline.lineTo(lineEndX, text.height + yShift); // Draw the inner line
    }, [
        textRef.current?.height,
        textRef.current?.width,
        lineColor,
        borderLineColor,
        shadowLineColor,
        xShift,
        yShift,
        containerWidth,
        ...args,
    ]);

    return { textRef, underlineRef };
}