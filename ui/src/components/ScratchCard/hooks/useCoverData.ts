
import { IGameMatrixProps, IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix';
import { useMemo } from 'react';

export function useCoverData<CellData extends ISpriteCellData = ISpriteCellData>(
    bundleName: string,
    textureName: string | string[][],
    sizeX: number,
    sizeY: number,
): IGameMatrixProps<IMatrixCellProps<CellData>>['data'] {
    return useMemo(() => {
        if (!bundleName || !textureName.length) return [];

        const isTextureArray = Array.isArray(textureName);

        if (isTextureArray) {
            return textureName.map((row) => {
                return row.map((cellTextureName) => ({
                    textureName: cellTextureName,
                    bundleName,
                } as CellData))
            });
        }

        return Array.from({ length: sizeX }, () => {
            return Array.from({ length: sizeY }, () => ({
                textureName,
                bundleName,
            } as CellData))
        });
    }, [bundleName, textureName, sizeX, sizeY ]);
}