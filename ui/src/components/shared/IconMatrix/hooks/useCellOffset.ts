import { useApp } from '@pixi/react';
import { useEffect, useState } from 'react';

export function useCellOffset(cellSize: number | null, padding: number, rowDataLength: number, columnDataLength: number) {
    const app = useApp();
    const { width: appWidth, height: appHeight } = app.screen;

    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);

    useEffect(() => {
        if (!cellSize) {
            return;
        }

        const totalWidth = rowDataLength * (cellSize + padding) - padding;
        const totalHeight = columnDataLength * (cellSize + padding) - padding;

        const offsetX = (appWidth - totalWidth) / 2;
        const offsetY = (appHeight - totalHeight) / 2;
        setOffsetX(offsetX);
        setOffsetY(offsetY);
    }, [
        cellSize,
        appWidth,
        appHeight,
        padding,
        rowDataLength,
        columnDataLength
    ])

    return {
        offsetX,
        offsetY
    }
}