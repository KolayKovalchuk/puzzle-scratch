import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import styles from './StyledHeaderText.module.scss';


export interface IStyledHeaderTextProps {
    text: string;
    className?: string;
    fontSize?: number;
}

export function StyledHeaderText({ text, className, fontSize = 30 }: IStyledHeaderTextProps) {
    const { containerRef, dimensions } = useContainerDimensions();
    const textStyle = new TextStyle({
        fontFamily: 'Nunito',
        fontSize: fontSize,
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
    });

    return (
        <div ref={containerRef} className={`${styles.container} ${className || ''}`}>
            <Stage width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0 }}>
                <Text
                    text={text}
                    style={textStyle}
                    anchor={0.5}
                    x={dimensions.width * 0.5}
                    y={dimensions.height * 0.4}
                />
            </Stage>
        </div>)
}
