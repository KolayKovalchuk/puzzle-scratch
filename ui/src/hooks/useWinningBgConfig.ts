import { IGameMatrixDefaultConfig } from '@components/shared/IconMatrix/hooks/useCellSize';
import { ICardData } from '@models/IBuyBatchCardData';
import { selectMatrixBlinkCounter } from '@store/selectors/appState.selectors';
import { isCellWinnings } from '@utils/isCellWinnings';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface ICardBonusTypesDict {
    [key: string]: [number, number];
}

export const CardsBonusTypesDict: ICardBonusTypesDict = {
    SantaSacBonus: [5,5],
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
    const [textureAlpha, setTextureAlpha] = useState<number>(0);
    const matrixBlinkCounter = useSelector(selectMatrixBlinkCounter);

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

        const blinkingTimeout = 1000 * 10;

        let alpha = 0;
        let isIncreasing = true;
        const alphaStep = 0.01;
        const interval = setInterval(() => {
            
            if (alpha >= 1) {
                alpha -= alphaStep
                isIncreasing = false;
            }
            else if (alpha <= 0.5) {
                alpha += alphaStep
                isIncreasing = true;
            }
            else {
                alpha += isIncreasing ? alphaStep : -alphaStep;
            }

            setTextureAlpha(alpha);
        }, 10);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            setTextureAlpha(1); // Ensure it ends in a non-transparent state
        }, blinkingTimeout);

        if (matrixBlinkCounter === 0) {
            clearInterval(interval);
            clearTimeout(timeout);
            setTextureAlpha(0);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [matrixBlinkCounter]);

    return {
        winningBgTextureWidth: textureWidth,
        winningBgTextureHeight: textureHeight,
        winningBgTextureX: textureX,
        winningBgTextureY: textureY,
        winningBgTextureAlpha: textureAlpha,
    }
}