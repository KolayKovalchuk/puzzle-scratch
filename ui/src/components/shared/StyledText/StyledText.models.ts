import { ITextStyle } from 'pixi.js';
import { CSSProperties } from 'react';

export interface IStyledTextProps {
    text: string;
    className?: string;
    styles?: Partial<CSSProperties>;
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    anchor?: number;

    shouldFitFontSize?: boolean;
    xShift?: number
    yShift?: number
}
