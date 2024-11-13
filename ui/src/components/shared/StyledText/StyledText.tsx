import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Container, Graphics, Stage, Text } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js';

import { useFitTextSize } from '@hooks/useFitTextSize';
import styles from './StyledText.module.scss';
import { useTextUnderline } from './hooks/useTextUnderline';


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
}

const defaultTextStyleConfig: Partial<ITextStyle> = {
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

export function StyledText({
    text,
    className,
    textStyles,
    textFitCoefficient = 1,
    isUnderline = false,
    underlineConfig,
}: IStyledHeaderTextProps) {
    const { containerRef, dimensions } = useContainerDimensions(text);

    const textStyleConfig: Partial<ITextStyle> = {
        ...defaultTextStyleConfig,
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

    return (
        <div ref={containerRef} className={`${styles.container} ${className || ''}`}>
            <Stage className={styles.stageClass} width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0 }}>
                <Container>
                    {isUnderline && <Graphics ref={underlineRef} /> || null}
                    <Text
                        ref={textRef}
                        text={text}
                        style={textStyle}
                        anchor={0.5}
                        x={dimensions.width * 0.5}
                        y={dimensions.height * 0.4} />
                </Container>
            </Stage>
            <div
                className={styles.textMock}
                style={{ fontSize: textStyle.fontSize, letterSpacing: '2px' }}
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
