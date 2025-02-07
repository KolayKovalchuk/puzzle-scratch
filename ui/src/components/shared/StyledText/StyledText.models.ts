import { ITextStyle } from 'pixi.js-legacy';
import { CSSProperties } from 'react';

export interface IStyledTextProps {
    text: string;
    className?: string;
    styles?: Partial<CSSProperties>;
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    anchor?: number;

    shouldFitHorizontally?: boolean;
    shouldFitVertically?: boolean;

    xShift?: number
    yShift?: number

    cacheKey?: string;

    valueForMeasure?: string,

    getTextSize?: (textSize: string | number) => void;
}
