import { useEffect, useState } from 'react';
import { ILuckyCloverSpriteCellData } from '../components/LuckyCloverSpriteCell/LuckyCloverSpriteCell';
import { IBuyBatchCardData } from '@models/IBuyBatchCardData';
import { ILuckyCloverCardData } from '../LuckyClover.model';
import { isCellWinnings } from '@utils/isCellWinnings';
import { CardsBonusTypesDict } from '@hooks/useWinningBgConfig';

export function useTopScratchCardData(card: IBuyBatchCardData<ILuckyCloverCardData> | null, bundleName: string) {
    const defaultTopScratchCardData: ILuckyCloverSpriteCellData[][] = [Array.from({ length: 6 }, () => {
        return {
            bundleName: bundleName,
            textureName: '0',
        }
    })];
    const [topScratchCardData, setTopScratchCardData] = useState<ILuckyCloverSpriteCellData[][]>(defaultTopScratchCardData);

    useEffect(() => {
        if (!card) return;

        const topScratchCardData = card.cardData.winningLine.map<ILuckyCloverSpriteCellData>((value, index) => {
            const isWinning = isCellWinnings(card.cardData.winningCells || [], CardsBonusTypesDict.LuckyCloverTopBonus[0], index);
            return {
                bundleName: bundleName,
                textureName: value + '',
                isWinning,
            }
        })
        setTopScratchCardData([topScratchCardData]);
    }, [card, bundleName]);

    return {
        topScratchCardData,
    }
}