import { ReactElement } from 'react';

export interface IMatrixCellProps<CellData = any> {
    x: number;
    y: number;
    data: CellData
}

export interface IGameMatrixProps<CellProps extends IMatrixCellProps = IMatrixCellProps> {
    renderCell: (props: CellProps) => ReactElement<CellProps>
    data: CellProps['data'][][];      // 2D array of data for each cell
}