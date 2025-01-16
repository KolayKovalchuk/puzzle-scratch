import { IBuyBatchCardData } from '@models/IBuyBatchCardData';
import { mapMatrixToSpriteCellData } from '@utils/mapMatrixToSpriteCellData';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ISantaSacCardData } from '../SantaSac.model';
import { ISantaSacSpriteCellData } from '../SantaSacSpriteCell';
import { SantaSacScratchItemsEnum } from '../scratchItemsEnum';

const SantaSacScratchItemsEnumValues = Object.values(SantaSacScratchItemsEnum)

export function useSpriteCellData(card: IBuyBatchCardData<ISantaSacCardData> | null, bundleName: string) {
    const [data, setData] = useState<(ISantaSacSpriteCellData | null)[][]>([])

    const itemMapper = useCallback((cellData: string): ISantaSacSpriteCellData => {
        const [ textureNumber, itemPrize ] = cellData.split(',');
        const textureName = SantaSacScratchItemsEnumValues[parseInt(textureNumber) - 1]

        return {
            textureName: textureName as SantaSacScratchItemsEnum,
            bundleName,
            itemPrize: Number(itemPrize),
        }
    }, [bundleName, card])

    const newData = useMemo(() => mapMatrixToSpriteCellData<ISantaSacSpriteCellData>(
        card?.cardData || null,
        SantaSacScratchItemsEnumValues,
        itemMapper,
    ), [card?.cardData, itemMapper, SantaSacScratchItemsEnumValues])

    useEffect(() => {
        if (!card) return

        setData(newData)
    }, [card, newData])

    return { data }
}