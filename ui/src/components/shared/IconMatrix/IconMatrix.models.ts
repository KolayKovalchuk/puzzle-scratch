import { Texture } from 'pixi.js-legacy';
import { ReactElement } from 'react';

export interface ISpriteCellData {
    textureName: string;
    bundleName: string;
    isWinning?: boolean;
}

export interface IMatrixCellProps<CellData = any> {
    x: number;
    y: number;
    width: number;
    height: number;
    data: CellData
}

export interface IGameMatrixConfig {
    cellWidth?: number | null;
    cellHeight?: number | null;
    cellPadding?: number;
    containerPadding?: number;
    paddintBottom?: number;
    paddintLeft?: number;

    winningBgTextureWidthCoef?: number;
    winningBgTexturePositionShiftCoef?: number;
    winningBgTextureYShiftCoef?: number;
}

export interface IGameMatrixProps<CellProps extends IMatrixCellProps = IMatrixCellProps> {
    renderCell: (props: CellProps) => ReactElement<CellProps>
    data: CellProps['data'][][];      // 2D array of data for each cell
    config?: IGameMatrixConfig;
    winningBgTexture: Texture;
}