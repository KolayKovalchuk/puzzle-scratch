import { useCallback, useEffect, useMemo, useState } from 'react';
import { ICandyMazeSpriteCellData } from '../components/CandyMazeSpriteCell/CandyMazeSpriteCell';
import { IBuyBatchCardData } from '@models/IBuyBatchCardData';
import { CandyMazeScratchItemsEnum } from '../scratchItemsEnum';
import { mapMatrixToSpriteCellData } from '@utils/mapMatrixToSpriteCellData';

const CandyMazeScratchItemsEnumEntries = Object.values(CandyMazeScratchItemsEnum)

export function useSpriteCellData(card: IBuyBatchCardData | null, bundleName: string) {
    const [data, setData] = useState<(ICandyMazeSpriteCellData)[][]>([])

    const itemMapper = useCallback((textureName: string) => {
        return {
            textureName: textureName as CandyMazeScratchItemsEnum,
            bundleName
        }
    }, [bundleName])

    const newData = useMemo(() => mapMatrixToSpriteCellData<ICandyMazeSpriteCellData>(
        card?.cardData.matrix || [],
        CandyMazeScratchItemsEnumEntries,
        itemMapper,
    ), [card?.cardData.matrix, itemMapper, CandyMazeScratchItemsEnumEntries])

    useEffect(() => {
        if (!card) return

        setData(newData)
    }, [card, newData])

    return { data }
}