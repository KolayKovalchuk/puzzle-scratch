import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { StyledTextPixiEl } from '@components/shared/StyledText';
import { GameCellTextStyle } from '@components/shared/StyledText/components/GameCellStyledText';

export interface IIceBoxSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface IIceBoxSpriteCellProps extends IMatrixCellProps<IIceBoxSpriteCellData> {
}

export function IceBoxSpriteCell({ x, y, width, height, data }: IIceBoxSpriteCellProps) {
    return (
        <StyledTextPixiEl
            dimensions={{ width, height }}
            text={data.textureName}
            textStyles={GameCellTextStyle}
            textFitCoefficient={0.8}
            x={x}
            y={y}
        />)
};
