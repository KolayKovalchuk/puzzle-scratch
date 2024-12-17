import { ITextStyle } from 'pixi.js';
import { StyledText } from '../StyledText';
import { IStyledTextProps } from '../StyledText.models';

export function RegularStyledText(props: IStyledTextProps) {
    const textStyle: Partial<ITextStyle> = {
        fill: ['#EBFBFF', '#B6E2EC'], // Gradient colors
        fillGradientStops: [0, 1], // Stops for the gradient

        stroke: '#095A63',

        dropShadow: true,
        dropShadowColor: '#0CA2B2',
        dropShadowAlpha: 1,
        dropShadowBlur: 0,
        dropShadowAngle: 1,
        dropShadowDistance: 2,
        ...props.textStyles,
    };

    return (<StyledText
        {...props}
        textStyles={textStyle}
    ></StyledText>)
}
