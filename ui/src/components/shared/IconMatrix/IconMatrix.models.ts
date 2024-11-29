import { ReactElement } from 'react';

export interface ISpriteCellData {
    textureName: string;
    bundleName: string;
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
}

export interface IGameMatrixProps<CellProps extends IMatrixCellProps = IMatrixCellProps> {
    renderCell: (props: CellProps) => ReactElement<CellProps>
    data: CellProps['data'][][];      // 2D array of data for each cell
    config?: IGameMatrixConfig;
}