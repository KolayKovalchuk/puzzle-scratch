import { WinStyledTextConfig } from '@components/shared/StyledText';
import { getCacheKey, getCacheValue } from '@hooks/useFitTextSize';
import { ITextStyle, TextMetrics, TextStyle } from 'pixi.js-legacy';
import { useEffect, useMemo, useState } from 'react';

export function useIsCenterCloverCell(colIndex: number, rowIndex: number) {
    const [isCenterCloverCell, setIsCenterCloverCel] = useState(false);
    useEffect(() => {
        const isCenterCloverCell =
            (colIndex === 1 || colIndex === 4)
            && (rowIndex === 1 || rowIndex === 4);
        setIsCenterCloverCel(isCenterCloverCell);
    }, [colIndex, rowIndex]);

    return { isCenterCloverCell };
}

const defaultTextStyles: Partial<ITextStyle> = {
    ...WinStyledTextConfig,
    fontSize: 27
}

export function useCellTextStyles(isCenterCloverCell: boolean) {
    const [textStyles, setTextStyles] = useState<Partial<ITextStyle>>(defaultTextStyles);

    useEffect(() => {
        if (isCenterCloverCell) {
            setTextStyles({
                ...textStyles,
                fontSize: Math.round((defaultTextStyles.fontSize as number) * 0.5)
            })
        } else {
            setTextStyles(defaultTextStyles)
        }
    }, [isCenterCloverCell])

    return {
        textStyles
    }
}


function getCellTextShiftCoef(colIndex: number, rowIndex: number) {
    let xShiftCoef = 0
    let yShiftCoef = 0

    if (colIndex <= 2) {
        xShiftCoef = -0.1;
    } else {
        xShiftCoef = 0.075;
    }

    if (rowIndex <= 2) {
        yShiftCoef = -0.05;
    } else {
        yShiftCoef = 0.1;
    }

    return {
        xShiftCoef: xShiftCoef,
        yShiftCoef: yShiftCoef
    }
}

function getRoboIconXShift(text: string, isCenterCloverCell: boolean, roboIconWidth: number) {
    if (!isCenterCloverCell) return 0

    const coef = text.length <= 3 ? 0.25 : 0.35;
    return roboIconWidth * coef;
}

export function useCellTextPosition(
    colIndex: number,
    rowIndex: number,
    width: number,
    height: number,
    x: number,
    y: number,
    isCenterCloverCell: boolean,
    text: string,
    textStyle: Partial<ITextStyle>,
) {
    const textSize = useMemo(() => {
        const style = new TextStyle(textStyle);
        console.log('style', text);

        const metrics = TextMetrics.measureText(text.toString(), style);

        return metrics;
    }, [text, textStyle]);

    return useMemo(() => {
        const shiftConfig = getCellTextShiftCoef(colIndex, rowIndex);

        const roboIconWidth = width * 0.6;
        const roboIconHeight = roboIconWidth * 1.41;

        const xShifted = x + (width * 0.5) + (width * shiftConfig.xShiftCoef) + getRoboIconXShift(text, isCenterCloverCell, roboIconWidth);
        const yShifted = y + height * shiftConfig.yShiftCoef;

        const roboIconX = xShifted - textSize?.width * 0.5 - roboIconWidth * 0.93;
        const roboIconY = yShifted + (height - roboIconHeight) * 0.45;

        return {
            x: xShifted,
            y: yShifted,
            roboIconWidth,
            roboIconHeight,
            roboIconX,
            roboIconY
        }
    }, [
        colIndex,
        rowIndex,
        width,
        height,
        x,
        y,
        textSize,
        isCenterCloverCell,
        text,
    ]);
}