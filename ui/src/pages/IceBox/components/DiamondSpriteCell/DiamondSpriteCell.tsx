import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { StyledTextPixiEl, WinStyledTextConfig } from '@components/shared/StyledText';
import { ITextStyle } from 'pixi.js';

export interface IDiamondSpriteCellData extends ISpriteCellData {
}

export interface IDiamondSpriteCellProps extends IMatrixCellProps<IDiamondSpriteCellData> {
}

const textStyles: Partial<ITextStyle> = {
    ...WinStyledTextConfig,
    fontSize: 20,
}

export function DiamondSpriteCell({ x, y, width, height, data }: IDiamondSpriteCellProps) {

    return (
        <StyledTextPixiEl
            dimensions={{ width, height }}
            text={data.textureName.toString()}
            textStyles={textStyles}
            x={x}
            y={y}
            yShift={0.5}
        />)
};
