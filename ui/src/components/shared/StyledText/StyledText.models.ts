import { ITextStyle } from 'pixi.js';
import { CSSProperties } from 'react';

export interface IUnderlineConfig {
    textUnderlineColor?: string;
    textUnderlineBorderColor?: string;
    textUnderlineShadowColor?: string;
    lineXShift?: number;
    lineYShift?: number;
}


export interface IStyledTextProps {
    text: string;
    className?: string;
    styles?: Partial<CSSProperties>;
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    isUnderline?: boolean;
    underlineConfig?: IUnderlineConfig;

    anchor?: number;
}
