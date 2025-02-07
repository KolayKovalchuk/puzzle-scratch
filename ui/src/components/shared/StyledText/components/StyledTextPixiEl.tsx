import { useFitTextSize } from '@hooks/useFitTextSize';
import { Container, Text } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js-legacy';
import { DefaultTextStyleConfig } from '../DefaultTextStyleConfig';
import { useEffect } from 'react';


export interface IStyledTextPixiElProps {
    dimensions: { width: number, height: number };
    text: string;
    valueForMeasure?: string;
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    anchor?: number;
    x?: number;
    y?: number;
    xShift?: number;
    yShift?: number;

    shouldFitHorizontally?: boolean;
    shouldFitVertically?: boolean;
    getTextSize?: (textSize: string | number) => void;
}


export function StyledTextPixiEl({
    dimensions,
    text,
    textStyles,
    textFitCoefficient = 1,
    anchor = 0.5,
    x = 0,
    y = 0,
    xShift = 0.5,
    yShift = 0.5,

    shouldFitHorizontally = true,
    shouldFitVertically = true,
    valueForMeasure = text,

    getTextSize,
}: IStyledTextPixiElProps) {

    const textStyleConfig: Partial<ITextStyle> = {
        ...DefaultTextStyleConfig,
        ...textStyles,
    };

    const targetWidth = dimensions.width * textFitCoefficient;
    const targetHeight = dimensions.height * textFitCoefficient;
    const fittedFontSize = useFitTextSize(valueForMeasure, targetWidth, targetHeight, textStyleConfig, shouldFitHorizontally, shouldFitVertically);

    textStyleConfig.fontSize = fittedFontSize || textStyleConfig.fontSize;

    const textStyle = new TextStyle(textStyleConfig);

    useEffect(() => {
        getTextSize && getTextSize(textStyle.fontSize);
    }, [textStyle.fontSize, getTextSize]);

    try{
        return (
            <Container x={x} y={y}>
                <Text
                    text={text}
                    style={textStyle}
                    anchor={anchor}
                    x={dimensions.width * xShift}
                    y={dimensions.height * yShift} />
            </Container>
        );
    }
    catch(e){
        console.log('StyledTextPixiEl error: ', e)
    }
}