import { Key, ReactNode } from 'react';

export interface ITableCellData {
    key: Key;
    data: ReactNode;
}

export interface ITRowData {
    key: Key;
    cellData: ITableCellData[];
}

export interface ITableData {
    tHeadData: ITableCellData[];
    tBodyData: ITRowData[];
}
