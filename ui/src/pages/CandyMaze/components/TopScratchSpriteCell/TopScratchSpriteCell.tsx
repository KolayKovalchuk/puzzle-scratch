import { IMatrixCellProps } from '@components/shared/IconMatrix';
import { DefaultTextStyleConfig, StyledTextPixiEl, WinStyledTextConfig } from '@components/shared/StyledText';
import { ICandyMazeSpriteCellData } from '@pages/CandyMaze/components/CandyMazeSpriteCell/CandyMazeSpriteCell';
import { Container } from '@pixi/react';
import { ITextStyle } from 'pixi.js';

const topScratchCardTextStyles: Partial<ITextStyle> ={
    ...DefaultTextStyleConfig,
    ...WinStyledTextConfig,
    fontSize: 40,
}

export interface ICandyMazeSpriteCellProps extends IMatrixCellProps<ICandyMazeSpriteCellData> {
}

export function TopScratchSpriteCell({ x, y, width, height, data }: ICandyMazeSpriteCellProps) {
    const value = data.textureName + '';

    if (!value) return null;

    return (
        <Container x={x} y={y}>
            <StyledTextPixiEl
                dimensions={{ width, height }}
                text={value}
                textStyles={topScratchCardTextStyles}
                textFitCoefficient={2}
            />
        </Container>
    )
};
