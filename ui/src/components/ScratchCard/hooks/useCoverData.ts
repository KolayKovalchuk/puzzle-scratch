
import { IGameMatrixProps, IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix';
import { useMemo } from 'react';

export function useCoverData<CellData extends ISpriteCellData = ISpriteCellData>(
    cellData: CellData,
    sizeX: number,
    sizeY: number,
): IGameMatrixProps<IMatrixCellProps<CellData>>['data'] {
    return useMemo(() => {
        return Array.from({ length: sizeX }, () => {
            return Array.from({ length: sizeY }, () => (cellData))
        });
    }, [cellData.bundleName, cellData.textureName, sizeX, sizeY ]);
}