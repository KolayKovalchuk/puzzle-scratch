import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { DefaultSpriteCell } from '@pages/Vegas/components/DefaultSpriteCell/DefaultSpriteCell';

export interface ICandyMazeSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface ICandyMazeSpriteCellProps extends IMatrixCellProps<ICandyMazeSpriteCellData> {
}

export function CandyMazeSpriteCell({ x, y, width, height, data }: ICandyMazeSpriteCellProps) {
    return <DefaultSpriteCell x={x} y={y} width={width} height={height} data={data} />;
};
