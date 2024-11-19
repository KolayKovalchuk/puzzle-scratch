
import { IGameMatrixProps, IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix';
import { useMemo } from 'react';

export function useCoverData<CellData extends ISpriteCellData = ISpriteCellData>(
    cellData: CellData,
    matrixSize: number
): IGameMatrixProps<IMatrixCellProps<CellData>>['data'] {
    return useMemo(() => {
        return Array.from({ length: matrixSize }, () => {
            return Array.from({ length: matrixSize }, () => (cellData))
        });
    }, [cellData.bundleName, cellData.textureName, matrixSize]);
}