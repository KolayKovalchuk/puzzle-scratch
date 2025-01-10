import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage } from '@pixi/react';
import 'pixi.js-legacy';

import { useCallback, useMemo, useState } from 'react';
import { StyledTextPixiEl } from './components/StyledTextPixiEl';
import { DefaultTextStyleConfig } from './DefaultTextStyleConfig';
import { IStyledTextProps } from './StyledText.models';
import styles from './StyledText.module.scss';

export function StyledText({
    text,
    className,
    styles: styleArg,
    textStyles,
    textFitCoefficient = 1,
    anchor = 0.5,
    shouldFitFontSize = true,
    xShift = 0.5,
    yShift = 0.35,
    getTextSize,
}: IStyledTextProps) {
    const { containerRef, dimensions } = useContainerDimensions();

    const [fontSize, setFontSize] = useState<number | string | undefined>(textStyles?.fontSize || DefaultTextStyleConfig.fontSize);

    const getTextSizeCb = useCallback((textSize: string | number) => {
        setFontSize(textSize);

        if (getTextSize) {
            getTextSize(textSize);
        }
    }, [getTextSize]);

    return useMemo(() => {
        return (
            <div ref={containerRef} className={`${styles.container} ${className || ''}`} style={styleArg}>
                    <Stage className={styles.stageClass} width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0, forceCanvas: true }}>
                        <StyledTextPixiEl
                            dimensions={dimensions}
                            text={text}
                            textStyles={textStyles}
                            textFitCoefficient={textFitCoefficient}
                            anchor={anchor}
                            shouldFitFontSize={shouldFitFontSize}
                            xShift={xShift}
                            yShift={yShift}
                            getTextSize={getTextSizeCb}
                        />
                    </Stage>
                <div
                    className={styles.textMock}
                    style={{
                        fontSize: fontSize || textStyles?.fontSize || DefaultTextStyleConfig.fontSize,
                        letterSpacing: '2px'
                    }}
                >{text}</div>
            </div>
        );
    }, [
        text,
        dimensions.width,
        dimensions.height,
        // textStyles,
        textStyles?.fontSize,
        textFitCoefficient,
        anchor,
        shouldFitFontSize,
        xShift,
        yShift,
        className,
        styleArg,
        getTextSize,
    ]);
}
