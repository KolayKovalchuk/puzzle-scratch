import { IGameMatrixDefaultConfig } from '@components/shared/IconMatrix/hooks/useCellSize';
import { ICardData } from '@models/IBuyBatchCardData';
import { isCellWinnings } from '@utils/isCellWinnings';
import { useEffect, useState } from 'react';

export interface ICardBonusTypesDict {
    [key: string]: [number, number];
}

export const CardsBonusTypesDict: ICardBonusTypesDict = {
    SantaSacBonus: [5,5],
    IceBoxDiamondBonus: [6, Infinity],
    LuckyCloverTopBonus: [6, Infinity],
    IceBoxX2Bonus: [7,1],
    IceBoxX5Bonus: [8,1],
}

export function useIsBonusShining(bonusType: [number, number], winningCells: ICardData['winningCells'] | null) {
    const [isShining, setIsShining] = useState(false);

    useEffect(() => {
        if (!winningCells) return;

        const isWinning = isCellWinnings(winningCells, bonusType[0], bonusType[1]);
        setIsShining(isWinning);

    }, [winningCells, bonusType]);

    return isShining;
}

export function useWinningBgConfig(width: number | null, config: IGameMatrixDefaultConfig) {
    const [textureWidth, setTextureWidth] = useState<number>(0);
    const [textureHeight, setTextureHeight] = useState<number>(0);
    const [textureX, setTextureX] = useState<number>(0);
    const [textureY, setTextureY] = useState<number>(0);

    useEffect(() => {
        if (!width) return;

        const textureWidth = width * 2.4 * config.winningBgTextureWidthCoef;
    
        const heightCoef = 0.76;
        const textureHeight = textureWidth * heightCoef;

        const coef = 0.275;
        const textureX = - textureWidth * coef * config.winningBgTexturePositionShiftCoef;
        const textureY = - textureHeight * coef * heightCoef * config.winningBgTexturePositionShiftCoef * config.winningBgTextureYShiftCoef;

        setTextureWidth(textureWidth);
        setTextureHeight(textureHeight);
        setTextureX(textureX);
        setTextureY(textureY);
    }, [width, config]);

    return {
        winningBgTextureWidth: textureWidth,
        winningBgTextureHeight: textureHeight,
        winningBgTextureX: textureX,
        winningBgTextureY: textureY,
    }
}