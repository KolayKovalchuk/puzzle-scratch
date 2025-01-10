import { ITextStyle } from 'pixi.js-legacy';
import { IStyledTextProps } from '../StyledText.models';
import { StyledText } from '../StyledText';

export function SecondaryStyledText(props: IStyledTextProps) {
    const textStyle: Partial<ITextStyle> = {
        fill: ['#BED0FA', '#E1EBFF', '7A96C3'], // Gradient colors
        fillGradientStops: [0, 0.22, 1], // Stops for the gradient

        stroke: '#102E8C',

        dropShadow: true,
        dropShadowColor: '#102E8C',
        dropShadowAlpha: 1,
        dropShadowBlur: 0,
        dropShadowAngle: 1,
        dropShadowDistance: 2,
        ...props.textStyles,
    };

    return (<StyledText {...props} textStyles={textStyle}></StyledText>)
}
