import { useApp } from '@pixi/react';
import { useEffect, useState } from 'react';

export function useCellOffset(cellWidth: number | null, cellHeight: number | null, padding: number, rowDataLength: number, columnDataLength: number) {
    const app = useApp();
    const { width: appWidth, height: appHeight } = app.screen;

    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);

    useEffect(() => {
        if (!cellWidth || !cellHeight) {
            return;
        }

        const totalWidth = rowDataLength * (cellWidth + padding) - padding;
        const totalHeight = columnDataLength * (cellHeight + padding) - padding;

        const offsetX = (appWidth - totalWidth) / 2;
        const offsetY = (appHeight - totalHeight) / 2;
        setOffsetX(offsetX);
        setOffsetY(offsetY);
    }, [
        cellWidth,
        cellHeight,
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