import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { DefaultSpriteCell } from '../DefaultSpriteCell/DefaultSpriteCell';

export interface IVegasLootSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface IVegasLootSpriteCellProps extends IMatrixCellProps<IVegasLootSpriteCellData> {
}

export function VegasLootSpriteCell({ x, y, width, height, data }: IVegasLootSpriteCellProps) {
    return <DefaultSpriteCell x={x} y={y} width={width} height={height} data={data} />;
};
