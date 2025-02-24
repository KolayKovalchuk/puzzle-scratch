import { ISpriteCellData } from '@components/shared/IconMatrix';
import { IBuyBatchCardData } from '@models/IBuyBatchCardData';
import { mapMatrixToSpriteCellData } from '@utils/mapMatrixToSpriteCellData';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ILuckyCloverCardData } from '../LuckyClover.model';

const winningBgCellShift: { [key: string]: { x: number, y: number } } = {
    [`1-1`]: {
        x: 1.15,
        y: 1.2,
    },
    [`1-4`]: {
        x: 0.9,
        y: 1.2,
    },
    [`4-1`]: {
        x: 1.15,
        y: 0.8,
    },
    [`4-4`]: {
        x: 0.95,
        y: 0.8,
    },
}

export function useSpriteCellData(card: IBuyBatchCardData<ILuckyCloverCardData> | null, bundleName: string) {
    const [data, setData] = useState<(ISpriteCellData)[][]>([])

    const itemMapper = useCallback((textureName: string): ISpriteCellData => {
        return {
            textureName: textureName,
            bundleName,
        }
    }, [bundleName])

    const newData = useMemo(() => {
        return mapMatrixToSpriteCellData<ISpriteCellData>(
            card?.cardData || null,
            [],
            itemMapper,
        ).map((row, rowIndex) => row.map((cell, colIndex) => {
            const isWinning = card?.cardData?.winningCells?.some(([row, col]) => {
                return row === rowIndex && col === colIndex
            }) || false;

            const cellKey = `${rowIndex}-${colIndex}`
            const winningBgShift = winningBgCellShift[cellKey] || { x: 1, y: 1 }

            return {
                ...cell,
                isWinning,
                winningBgXShift: winningBgShift.x,
                winningBgYShift: winningBgShift.y,
            }
        }))
    }, [card?.cardData, itemMapper])

    useEffect(() => {
        if (!card) return

        setData(newData)
    }, [card, newData])

    return { data }
}