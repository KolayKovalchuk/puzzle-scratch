import { useApp } from '@pixi/react';
import { useEffect, useState } from 'react';
import { IGameMatrixConfig } from '../IconMatrix.models';

interface IGameMatrixDefaultConfig extends IGameMatrixConfig {
    cellWidth: number | null;
    cellHeight: number | null;
    cellPadding: number;
    containerPadding: number;
    paddintBottom: number;
    paddintLeft: number;
}

export const defaultConfig: IGameMatrixDefaultConfig = {
    cellWidth: null,
    cellHeight: null,
    cellPadding: 0,
    containerPadding: 8,
    paddintBottom: 0,
    paddintLeft: 0,
}

export function useCellSize(configArg: IGameMatrixConfig, rowDataLength: number, columnDataLength: number) {
    const app = useApp();
    const { width: appWidth, height: appHeight } = app.screen;

    const config: IGameMatrixDefaultConfig = {
        ...defaultConfig,
        ...configArg
    };

    const width = appWidth - config.containerPadding * 2;
    const height = appHeight - config.containerPadding * 2;

    const [cellWidth, setCellWidth] = useState<number | null>(config.cellWidth);
    const [cellHeight, setCellHeight] = useState<number | null>(config.cellHeight);


    useEffect(() => {
        if (!config.cellWidth) {
            const newCellWidth = config.cellWidth ?? width / rowDataLength - config.cellPadding;
            setCellWidth(newCellWidth);
        }

        if (!config.cellHeight) {
            const newCellHeight = config.cellHeight ?? height / columnDataLength - config.cellPadding;
            setCellHeight(newCellHeight);
        }
    }, [
        width,
        height,
        rowDataLength,
        columnDataLength,
        config.cellWidth,
        config.cellHeight,
        config.cellPadding,
    ]);


    return {  width: cellWidth, height: cellHeight };
}