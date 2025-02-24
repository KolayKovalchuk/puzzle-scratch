import { WinStyledTextConfig } from '@components/shared/StyledText';
import { ITextStyle } from 'pixi.js-legacy';
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
                fontSize: Math.round((defaultTextStyles.fontSize as number) * 0.7)
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

export function useCellTextPosition(colIndex: number, rowIndex: number, width: number, height: number, x: number, y: number) {
    return useMemo(() => {
        const shiftConfig = getCellTextShiftCoef(colIndex, rowIndex);

        return {
            x: x + width * shiftConfig.xShiftCoef,
            y: y + height * shiftConfig.yShiftCoef
        }
    }, [colIndex, rowIndex, width, height, x, y]);
}