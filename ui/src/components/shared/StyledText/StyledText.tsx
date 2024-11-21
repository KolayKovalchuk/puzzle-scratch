import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Container, Graphics, Sprite, Stage, Text } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js';

import { useFitTextSize } from '@hooks/useFitTextSize';
import styles from './StyledText.module.scss';
import { useTextUnderline } from './hooks/useTextUnderline';
import { useTextCurved } from './hooks/useTextCurved';


export interface IUnderlineConfig {
    textUnderlineColor?: string;
    textUnderlineBorderColor?: string;
    textUnderlineShadowColor?: string;
    lineXShift?: number;
    lineYShift?: number;
}


export interface IStyledHeaderTextProps {
    text: string;
    className?: string;
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    isUnderline?: boolean;
    underlineConfig?: IUnderlineConfig;

    anchor?: number;
}

export const DefaultTextStyleConfig: Partial<ITextStyle> = {
    align: 'center',
    fontSize: 30,
    fontFamily: 'Nunito',
    fontWeight: '900',

    fill: ['#FFFFAB', '#FCB213'], // Gradient colors
    fillGradientType: 0, // Linear gradient
    fillGradientStops: [0, 1], // Stops for the gradient

    stroke: '#AD4D07',
    strokeThickness: 4,
    lineJoin: 'round',

    dropShadow: true,
    dropShadowColor: 'rgba(0, 0, 0, 0.25)',
    dropShadowAlpha: 0.1,
    dropShadowBlur: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
}

export interface IStyledTextContainer {
    isUnderline: boolean;
    dimensions: { width: number, height: number };
    text: string;
    textStyles?: Partial<ITextStyle>;
    textFitCoefficient?: number;

    anchor?: number;

    underlineConfig?: IUnderlineConfig;

}

export function StyledTextContainer({
    dimensions,
    text,
    textStyles,
    textFitCoefficient = 1,
    isUnderline = false,
    underlineConfig,
    anchor = 0.5,
}: IStyledTextContainer) {

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

    const spriteRef = useTextCurved();

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

export function StyledText({
    text,
    className,
    textStyles,
    textFitCoefficient = 1,
    isUnderline = false,
    underlineConfig,
    anchor = 0.5,
}: IStyledHeaderTextProps) {
    const { containerRef, dimensions } = useContainerDimensions(text);

    return (
        <div ref={containerRef} className={`${styles.container} ${className || ''}`}>
            <Stage className={styles.stageClass} width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0 }}>
                <StyledTextContainer
                    isUnderline={isUnderline}
                    dimensions={dimensions}
                    text={text}
                    textStyles={textStyles}
                    textFitCoefficient={textFitCoefficient}
                    anchor={anchor}
                    underlineConfig={underlineConfig}
                />
            </Stage>
            <div
                className={styles.textMock}
                style={{
                    fontSize: textStyles?.fontSize || DefaultTextStyleConfig.fontSize,
                    letterSpacing: '2px'
                }}
            >{text}</div>
        </div>
    );
}

export function SecondaryStyledText(props: IStyledHeaderTextProps) {
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


export function AcceptStyledText(props: IStyledHeaderTextProps) {
    const textStyle: Partial<ITextStyle> = {

        fill: '#FFFFFF', // Gradient colors
        fillGradientStops: [], // Stops for the gradient

        stroke: '#295808',

        dropShadow: false,
        ...props.textStyles,
    };

    return (<StyledText {...props} textStyles={textStyle} ></StyledText>)
}


export function RegularStyledText(props: IStyledHeaderTextProps) {
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
        underlineConfig={{
            textUnderlineColor: '#B6E2EC',
            textUnderlineBorderColor: '#095A63',
            textUnderlineShadowColor: '#0CA2B2',
        }}
    ></StyledText>)
}


export function WinStyledText(props: IStyledHeaderTextProps) {
    const textStyle: Partial<ITextStyle> = {
        fill: ['#E7AA39', '#FCD853', '#FFF4CB', '#FCD853', '#E7AA39'], // Gradient colors
        fillGradientStops: [0.14, 0.34, 0.52, 0.68, 0.92], // Stops for the gradient

        stroke: '#6B2D0A',

        dropShadow: true,
        dropShadowColor: '#632507',
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

export const RedStyledTextStyle: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    fill: ['#B51A1A', '#E01D1D', '#FF7373', '#E02323', '#750606'], // Gradient colors
    fillGradientStops: [0.17, 0.42, 0.60, 1], // Stops for the gradient

    stroke: '#FED95F',
    strokeThickness: 3,
};

export function RedStyledText(props: IStyledHeaderTextProps) {
    const textStyle: Partial<ITextStyle> = {
        ...RedStyledTextStyle,
        ...props.textStyles,
    };

    return (<StyledText
        {...props}
        textStyles={textStyle}
    ></StyledText>)
}

// const CurvedText = () => {
    

//     return <Sprite ref={spriteRef} />;
// };

// const App = () => (
//     <Stage width={800} height={600} options={{ backgroundColor: 0x1099bb }}>
//         <Container>
//             <CurvedText />
//         </Container>
//     </Stage>
// );

// export default App;