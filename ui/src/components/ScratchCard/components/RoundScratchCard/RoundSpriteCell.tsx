import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { StyledTextPixiEl, WinStyledTextConfig } from '@components/shared/StyledText';
import { Container } from '@pixi/react';
import { ITextStyle } from 'pixi.js';

export interface IRoundSpriteCellData extends ISpriteCellData {
    textureName: string;
}

export interface IRoundSpriteCellProps extends IMatrixCellProps<IRoundSpriteCellData> {
}

const textStyles: Partial<ITextStyle> = {
    ...WinStyledTextConfig,
    fontSize: 100,
}

export function RoundSpriteCell({ x, y, width, height, data }: IRoundSpriteCellProps) {
    return (
        <Container
            x={x}
            y={y}>
            <StyledTextPixiEl
                dimensions={{ width, height }}
                text={data.textureName}
                textStyles={textStyles}
                textFitCoefficient={0.8}
            />
        </Container>
    );
};
