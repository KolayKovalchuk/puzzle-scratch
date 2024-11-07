import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage, Text } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js';

import styles from './StyledText.module.scss';


export interface IStyledHeaderTextProps {
    text: string;
    className?: string;
    textStyles?: Partial<ITextStyle>;
}

export function StyledText({ text, className, textStyles = {} }: IStyledHeaderTextProps) {
    const { containerRef, dimensions } = useContainerDimensions(text);

    const textStyle = new TextStyle({
        fontFamily: 'Nunito',
        fontSize: 30,
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
        ...textStyles
    });

    return (
        <div ref={containerRef} className={`${styles.container} ${className || ''}`}>
            <Stage className={styles.stageClass} width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0 }}>
                <Text
                    text={text}
                    style={textStyle}
                    anchor={0.5}
                    x={dimensions.width * 0.5}
                    y={dimensions.height * 0.4}
                />
            </Stage>

            <div
                className={styles.textMock}
                style={{ fontSize: textStyle.fontSize, letterSpacing: '2px' }}
            >{text}</div>
        </div>)
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


export function RegularStyledText(props: IStyledHeaderTextProps) {
    const textStyle: Partial<ITextStyle> = {

        fill: '#FFFFFF', // Gradient colors
        fillGradientStops: [], // Stops for the gradient

        stroke: '#295808',

        dropShadow: false,
        ...props.textStyles,
    };

    return (<StyledText {...props} textStyles={textStyle}></StyledText>)
}
