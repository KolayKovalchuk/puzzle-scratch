import { ITextStyle } from 'pixi.js-legacy';
import { DefaultTextStyleConfig } from '../DefaultTextStyleConfig';
import { IStyledTextProps } from '../StyledText.models';
import { StyledText } from '../StyledText';

export const RedStyledTextStyle: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    fill: ['#B51A1A', '#E01D1D', '#FF7373', '#E02323', '#750606'], // Gradient colors
    fillGradientStops: [0.17, 0.42, 0.60, 1], // Stops for the gradient

    stroke: '#FED95F',
    strokeThickness: 3,
};

export function RedStyledText(props: IStyledTextProps) {
    const textStyle: Partial<ITextStyle> = {
        ...RedStyledTextStyle,
        ...props.textStyles,
    };

    return (<StyledText
        {...props}
        textStyles={textStyle}
    ></StyledText>)
}
