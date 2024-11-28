import { IMatrixCellProps } from '@components/shared/IconMatrix';
import { DefaultTextStyleConfig, StyledTextPixiEl, WinStyledTextConfig } from '@components/shared/StyledText';
import { ITextStyle } from 'pixi.js';

const topScratchCardTextStyles: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    ...WinStyledTextConfig,
    fontSize: 40,
}

export interface ITopScratchSpriteCellProps extends IMatrixCellProps {
}

export function TopScratchSpriteCell({ x, y, width, height, data }: ITopScratchSpriteCellProps) {
    const value = data.textureName + '';

    if (!value) return null;

    return (
        <StyledTextPixiEl
            dimensions={{ width, height }}
            text={value}
            textStyles={topScratchCardTextStyles}
            textFitCoefficient={2}
            x={x} y={y}
        />
    )
};
