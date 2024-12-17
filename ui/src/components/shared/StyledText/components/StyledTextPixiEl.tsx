import { useFitTextSize } from '@hooks/useFitTextSize';
import { Container, Text } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js';
import { useMemo } from 'react';
import { DefaultTextStyleConfig } from '../DefaultTextStyleConfig';


export interface IStyledTextPixiElProps {
    dimensions: { width: number, height: number };
    text: string;
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    anchor?: number;
    x?: number;
    y?: number;
    xShift?: number;
    yShift?: number;

    shouldFitFontSize?: boolean;
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
    yShift = 0.35,

    shouldFitFontSize = true,
}: IStyledTextPixiElProps) {

    const textStyleConfig: Partial<ITextStyle> = {
        ...DefaultTextStyleConfig,
        ...textStyles,
    };

    const fittedFontSize = useFitTextSize(text, dimensions.width * textFitCoefficient, textStyleConfig);

    if (shouldFitFontSize) {
        textStyleConfig.fontSize = fittedFontSize || textStyleConfig.fontSize;
    }

    const textStyle = new TextStyle(textStyleConfig);
        const memorizedComponent = useMemo(() => {
            return (
            <Container x={x} y={y}>
                <Text
                    text={text}
                    style={textStyle}
                    anchor={anchor}
                    x={dimensions.width * xShift}
                    y={dimensions.height * yShift} />
            </Container>
            )
        }, [
            text,
            dimensions.width,
            dimensions.height,
            textStyle,
            x,
            y,
            xShift,
            yShift
    ]);

    try{
        return memorizedComponent;
    }
    catch(e){
        console.log('StyledTextPixiEl error: ', e)
    }
}