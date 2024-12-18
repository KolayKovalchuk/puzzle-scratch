import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage } from '@pixi/react';

import { useMemo } from 'react';
import { StyledTextPixiEl } from './components/StyledTextPixiEl';
import { DefaultTextStyleConfig } from './DefaultTextStyleConfig';
import { useGetCanRender } from './hooks/useGetCanRender';
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
    isLoaderPixiEl = false,
    isModalDialogPixiEl = false,
}: IStyledTextProps) {
    const { containerRef, dimensions } = useContainerDimensions();

    // const isMainLoaderOpen = useSelector(selectIsMainLoaderOpen);
    // const isModalDialogOpen = useSelector(selectIsModalDialogOpen);

    const canRender = useGetCanRender(isLoaderPixiEl, isModalDialogPixiEl);

    return useMemo(() => {
        // logWebGLContexts();
        // console.log('StyledText: ', text, dimensions.width, dimensions.height);
        // console.log('StyledText: ', text, canRender);
        // console.log('isModalDialogPixiEl: ', isModalDialogPixiEl);
        // console.log('isMainLoaderOpen: ', isMainLoaderOpen);
        // console.log('isModalDialogOpen: ', isModalDialogOpen);
        // console.log('canRender: ', canRender);
        // console.log('==================================');
        
        return (
            <div ref={containerRef} className={`${styles.container} ${className || ''}`} style={styleArg}>
                {canRender
                    ? <Stage className={styles.stageClass} width={dimensions.width} height={dimensions.height} options={{ backgroundAlpha: 0 }}>
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
                    : null
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
        canRender,
        // textStyles,
        textFitCoefficient,
        anchor,
        shouldFitFontSize,
        xShift,
        yShift,
        className,
        styleArg
    ]);
}
