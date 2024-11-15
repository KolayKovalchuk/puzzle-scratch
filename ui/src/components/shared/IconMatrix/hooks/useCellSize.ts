import { useApp } from '@pixi/react';
import { useEffect, useState } from 'react';
import { IGameMatrixConfig } from '../IconMatrix.models';

export function useCellSize(config: IGameMatrixConfig, rowDataLength: number, columnDataLength: number) {
    const app = useApp();
    const { width: appWidth, height: appHeight } = app.screen;


    const [cellSize, setCellSize] = useState<number | null>(config.cellSize);


    useEffect(() => {
        if (config.cellSize) {
            return;
        }

        const cellWidth = config.cellSize ?? appWidth / rowDataLength - config.padding;
        const cellHeight = config.cellSize ?? appHeight / columnDataLength - config.padding;
        setCellSize(Math.min(cellWidth, cellHeight));
    }, [
        appWidth,
        appHeight,
        rowDataLength,
        columnDataLength,
        config.cellSize,
        config.padding,
    ]);


    return cellSize;
}