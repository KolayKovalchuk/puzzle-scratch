import { useCallback, useEffect, useMemo, useState } from 'react';
import { IBuyBatchCardData } from '@models/IBuyBatchCardData';
import { mapMatrixToSpriteCellData } from '@utils/mapMatrixToSpriteCellData';
import { IIceBoxSpriteCellData } from '../components/IceBoxSpriteCell/IceBoxSpriteCell';

// const IceBoxScratchItemsEnumEntries = Object.values(IceBoxScratchItemsEnum)

export function useSpriteCellData(card: IBuyBatchCardData | null, bundleName: string) {
    const [data, setData] = useState<(IIceBoxSpriteCellData)[][]>([])

    const itemMapper = useCallback((textureName: string): IIceBoxSpriteCellData => {
        console.log('textureName', textureName);
        
        return {
            textureName: textureName,
            bundleName
        }
    }, [bundleName])

    const newData = useMemo(() => mapMatrixToSpriteCellData<IIceBoxSpriteCellData>(
        card?.cardData || null,
        [],
        itemMapper,
    ), [card?.cardData, itemMapper])

    newData.forEach((row) => {
        row.forEach((cell) => {
            if (!cell.isWinning) {
                cell.isWinning = cell.textureName.toLowerCase().startsWith('d')
            }
        })
    });

    useEffect(() => {
        if (!card) return

        setData(newData)
    }, [card, newData])

    return { data }
}