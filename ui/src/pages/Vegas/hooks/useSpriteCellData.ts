import { useCallback, useEffect, useMemo, useState } from 'react';
import { IVegasLootSpriteCellData } from '../components/VegasLootSpriteCell/VegasLootSpriteCell';
import { IBuyBatchCardData } from '@models/IBuyBatchCardData';
import { mapMatrixToSpriteCellData } from '@utils/mapMatrixToSpriteCellData';
import { VegasLootScratchItemsEnum } from '../scratchItemsEnum';

const VegasLootScratchItemsEnumEntries = Object.values(VegasLootScratchItemsEnum)

export function useSpriteCellData(card: IBuyBatchCardData | null, bundleName: string) {
    const [data, setData] = useState<(IVegasLootSpriteCellData)[][]>([])

    const itemMapper = useCallback((textureName: string): IVegasLootSpriteCellData => {
        return {
            textureName: textureName as VegasLootScratchItemsEnum,
            bundleName
        }
    }, [bundleName])

    const newData = useMemo(() => mapMatrixToSpriteCellData<IVegasLootSpriteCellData>(
        card?.cardData || null,
        VegasLootScratchItemsEnumEntries,
        itemMapper,
    ), [card?.cardData, itemMapper, VegasLootScratchItemsEnumEntries])

    useEffect(() => {
        if (!card) return

        setData(newData)
    }, [card, newData])

    return { data }
}