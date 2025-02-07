import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage } from '@pixi/react';
import 'pixi.js-legacy';

import { useCallback, useMemo, useState } from 'react';
import { StyledTextPixiEl } from './components/StyledTextPixiEl';
import { DefaultTextStyleConfig } from './DefaultTextStyleConfig';
import { IStyledTextProps } from './StyledText.models';
import styles from './StyledText.module.scss';

function getTextPlaceholderFontSize(fontSize: number | string | undefined, fontSizeShift = 6) {
    if (fontSize === undefined) return DefaultTextStyleConfig.fontSize;

    if (typeof fontSize === 'number') {
        return fontSize + fontSizeShift;
    }

    const fontSizeNumber = fontSize.replace('px', '');
    return fontSizeNumber + fontSizeShift + 'px';
}

export function StyledText({
    text,
    className,
    styles: styleArg,
    textStyles,
    textFitCoefficient = 1,
    anchor = 0.5,
    shouldFitHorizontally = true,
    shouldFitVertically = true,
    xShift = 0.5,
    yShift = 0.55,
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
        const placeHolderFontSize = fontSize || textStyles?.fontSize || DefaultTextStyleConfig.fontSize;

        return (
            <div ref={containerRef} className={`${styles.container} ${className || ''}`} style={styleArg}>
                    <Stage className={styles.stageClass} width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0, forceCanvas: true }}>
                        <StyledTextPixiEl
                            dimensions={dimensions}
                            text={text}
                            textStyles={textStyles}
                            textFitCoefficient={textFitCoefficient}
                            anchor={anchor}
                            shouldFitHorizontally={shouldFitHorizontally}
                            shouldFitVertically={shouldFitVertically}
                            xShift={xShift}
                            yShift={yShift}
                            getTextSize={getTextSizeCb}
                        />
                    </Stage>
                <div
                    className={styles.textMock}
                    style={{
                        fontSize: getTextPlaceholderFontSize(placeHolderFontSize),
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
        textStyles?.stroke,
        textFitCoefficient,
        anchor,
        shouldFitHorizontally,
        shouldFitVertically,
        xShift,
        yShift,
        className,
        styleArg,
        getTextSize,
    ]);
}
