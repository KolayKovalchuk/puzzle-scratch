import { ITextStyle } from 'pixi.js';

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
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    isUnderline?: boolean;
    underlineConfig?: IUnderlineConfig;

    anchor?: number;
}
