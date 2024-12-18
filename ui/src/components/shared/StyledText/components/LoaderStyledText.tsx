import { ITextStyle } from 'pixi.js';
import { StyledText } from '../StyledText';
import { IStyledTextProps } from '../StyledText.models';

export const LoaderStyledTextStyle: Partial<ITextStyle> = {
    fill: ['#FFFFFF', '#9EB2D4', '#8AAFE9'], // Gradient colors
    fillGradientStops: [0, 0.77, 1], // Stops for the gradient

    stroke: '#162A6E',
    strokeThickness: 3,

    dropShadow: false,
};

export function LoaderStyledStyledText(props: IStyledTextProps) {
    const textStyle: Partial<ITextStyle> = {
        ...LoaderStyledTextStyle,
        ...props.textStyles,
    };

    return (<StyledText
        {...props}
        textStyles={textStyle}
        isLoaderPixiEl
    ></StyledText>)
}
