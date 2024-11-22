import { ITextStyle } from 'pixi.js';
import { StyledText } from '../StyledText';
import { IStyledTextProps } from '../StyledText.models';

export const WinStyledTextConfig: Partial<ITextStyle> = {
    fill: ['#E7AA39', '#FCD853', '#FFF4CB', '#FCD853', '#E7AA39'], // Gradient colors
    fillGradientStops: [0.14, 0.34, 0.52, 0.68, 0.92], // Stops for the gradient

    stroke: '#6B2D0A',

    dropShadow: true,
    dropShadowColor: '#632507',
    dropShadowAlpha: 1,
    dropShadowBlur: 0,
    dropShadowAngle: 1,
    dropShadowDistance: 2,
}

export function WinStyledText(props: IStyledTextProps) {
    const textStyle: Partial<ITextStyle> = {
        ...WinStyledTextConfig,
        ...props.textStyles,
    };

    return (<StyledText
        {...props}
        textStyles={textStyle}
    ></StyledText>)
}
