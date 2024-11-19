import { useEffect, useState } from 'react';
import { ICandyMazeSpriteCellData } from '../CandyMazeSpriteCell';
import { IBuyBatchCardData } from '@models/IBuyBatchCardData';
import { CandyMazeScratchItemsEnum } from '../scratchItemsEnum';

export function useSpriteCellData(card: IBuyBatchCardData | null, bundleName: string) {
    const [isScratchEnabled, setIsScratchEnabled] = useState(true);
    const [data, setData] = useState<ICandyMazeSpriteCellData[][]>([])

    useEffect(() => {

        if (!card) return

        setIsScratchEnabled(false)

        const newData = card.cardData.matrix.reduce<ICandyMazeSpriteCellData[][]>((acc, row) => {
            const newRow = row.map(cell => {
                const textureName = (Object.keys(CandyMazeScratchItemsEnum).find(key => {
                    const item = CandyMazeScratchItemsEnum[key as keyof typeof CandyMazeScratchItemsEnum];

                    return item === cell
                }) || '') as CandyMazeScratchItemsEnum

                console.log('textureName', textureName);
                return { textureName, bundleName }
            })
            acc.push(newRow)
            return acc;
        }, []);

        setData(newData)

    }, [card])

    return { data, isScratchEnabled }
}