import { useApp } from '@pixi/react';
import { useEffect, useState } from 'react';
import { IGameMatrixConfig } from '../IconMatrix.models';

export const defaultConfig = {
    cellSize: null,
    cellPadding: 0,
    containerPadding: 8,
}

export function useCellSize(configArg: IGameMatrixConfig, rowDataLength: number, columnDataLength: number) {
    const app = useApp();
    const { width: appWidth, height: appHeight } = app.screen;

    const config = { ...defaultConfig, ...configArg };


    const width = appWidth - config.containerPadding * 2;
    const height = appHeight - config.containerPadding * 2;

    const [cellSize, setCellSize] = useState<number | null>(config.cellSize);


    useEffect(() => {
        if (config.cellSize) {
            return;
        }

        const cellWidth = config.cellSize ?? width / rowDataLength - config.cellPadding;
        const cellHeight = config.cellSize ?? height / columnDataLength - config.cellPadding;
        setCellSize(Math.min(cellWidth, cellHeight));
    }, [
        width,
        height,
        rowDataLength,
        columnDataLength,
        config.cellSize,
        config.cellPadding,
    ]);


    return cellSize;
}