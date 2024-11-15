import { ReactElement } from 'react';

export interface IMatrixCellProps<CellData = any> {
    x: number;
    y: number;
    width?: number;
    height?: number;
    data: CellData
}

export interface IGameMatrixConfig {
    cellSize?: number | null;
    padding?: number;
}

export interface IGameMatrixProps<CellProps extends IMatrixCellProps = IMatrixCellProps> {
    renderCell: (props: CellProps) => ReactElement<CellProps>
    data: CellProps['data'][][];      // 2D array of data for each cell
    config?: IGameMatrixConfig;
}