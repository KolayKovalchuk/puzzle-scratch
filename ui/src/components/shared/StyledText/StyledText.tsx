import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage } from '@pixi/react';

import { StyledTextPixiEl } from './components/StyledTextPixiEl';
import { DefaultTextStyleConfig } from './DefaultTextStyleConfig';
import { IStyledTextProps } from './StyledText.models';
import styles from './StyledText.module.scss';

export function StyledText({
    text,
    className,
    textStyles,
    textFitCoefficient = 1,
    isUnderline = false,
    underlineConfig,
    anchor = 0.5,
}: IStyledTextProps) {
    const { containerRef, dimensions } = useContainerDimensions(text);

    return (
        <div ref={containerRef} className={`${styles.container} ${className || ''}`}>
            <Stage className={styles.stageClass} width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0 }}>
                <StyledTextPixiEl
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
