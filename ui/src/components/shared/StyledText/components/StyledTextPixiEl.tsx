import { useFitTextSize } from '@hooks/useFitTextSize';
import { Container, Graphics, Text } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js';
import { useTextUnderline } from '../hooks/useTextUnderline';
import { IUnderlineConfig } from '../StyledText.models';
import { DefaultTextStyleConfig } from '../DefaultTextStyleConfig';


export interface IStyledTextPixiElProps {
    isUnderline: boolean;
    dimensions: { width: number, height: number };
    text: string;
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    anchor?: number;

    underlineConfig?: IUnderlineConfig;
}


export function StyledTextPixiEl({
    dimensions,
    text,
    textStyles,
    textFitCoefficient = 1,
    isUnderline = false,
    underlineConfig,
    anchor = 0.5,
}: IStyledTextPixiElProps) {

    const textStyleConfig: Partial<ITextStyle> = {
        ...DefaultTextStyleConfig,
        ...textStyles,
    };

    const fittedFontSize = useFitTextSize(text, dimensions.width * textFitCoefficient, textStyleConfig);

    textStyleConfig.fontSize = fittedFontSize || textStyleConfig.fontSize;
    const textStyle = new TextStyle(textStyleConfig);
    const { textRef, underlineRef } = useTextUnderline(
        dimensions.width,
        underlineConfig?.textUnderlineColor || '#000000',
        underlineConfig?.textUnderlineBorderColor || '#000000',
        underlineConfig?.textUnderlineShadowColor || '#000000',
        underlineConfig?.lineXShift,
        underlineConfig?.lineYShift,
        isUnderline,
    );

    // const spriteRef = useTextCurved();

    try{
        return (
            <Container>
                {isUnderline && <Graphics ref={underlineRef} /> || null}
                <Text
                    ref={textRef}
                    text={text}
                    style={textStyle}
                    anchor={anchor}
                    x={dimensions.width * 0.5}
                    y={dimensions.height * 0.4} />

                {/* <Sprite ref={spriteRef} /> */}
            </Container>
        )
    }
    catch(e){
        console.log(e)
    }
}