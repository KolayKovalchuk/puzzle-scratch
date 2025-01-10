import { ITextStyle } from 'pixi.js-legacy';
import { IStyledTextProps } from '../StyledText.models';
import { StyledText } from '../StyledText';

export function AcceptStyledText(props: IStyledTextProps) {
    const textStyle: Partial<ITextStyle> = {

        fill: '#FFFFFF', // Gradient colors
        fillGradientStops: [], // Stops for the gradient

        stroke: '#295808',

        dropShadow: false,
        ...props.textStyles,
    };

    return (<StyledText {...props} textStyles={textStyle} ></StyledText>)
}
