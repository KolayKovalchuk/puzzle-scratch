import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage } from '@pixi/react';

import { StyledTextPixiEl } from './components/StyledTextPixiEl';
import { DefaultTextStyleConfig } from './DefaultTextStyleConfig';
import { IStyledTextProps } from './StyledText.models';
import styles from './StyledText.module.scss';
import { useMemo } from 'react';

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
}: IStyledTextProps) {
    const { containerRef, dimensions } = useContainerDimensions();

    return useMemo(() => {
        console.log('StyledText: ', text, dimensions.width, dimensions.height);
        return (
            <div ref={containerRef} className={`${styles.container} ${className || ''}`} style={styleArg}>
                {!dimensions.width || !dimensions.height
                    ? null
                    : <Stage className={styles.stageClass} width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0 }}>
                        <StyledTextPixiEl
                            dimensions={dimensions}
                            text={text}
                            textStyles={textStyles}
                            textFitCoefficient={textFitCoefficient}
                            anchor={anchor}
                            shouldFitFontSize={shouldFitFontSize}
                            xShift={xShift}
                            yShift={yShift}
                        />
                    </Stage>
                }
                <div
                    className={styles.textMock}
                    style={{
                        fontSize: textStyles?.fontSize || DefaultTextStyleConfig.fontSize,
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
        // textFitCoefficient,
        // anchor,
        // shouldFitFontSize,
        // xShift,
        // yShift,
        // className,
        // styleArg
    ]);
}
