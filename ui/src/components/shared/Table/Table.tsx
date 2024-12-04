
import { ITableCellData, ITRowData } from './Table.models';
import { TableHeadRow } from "./TableHeadRow";
import { TableRow } from "./TableRow";

import { selectLocalValue } from '@store/selectors/localization.selectors';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styles from './Table.module.scss';

export interface ITableProps {
    tHeadElement?: ReactNode;
    tHeadData?: ITableCellData[];

    tBodyData: ITRowData[];
    renderCell?: (data: ITableCellData, index: number) => ReactNode;

    className?: string;
    noRowBg?: boolean;
}

export function Table({ tHeadData, tHeadElement, tBodyData, renderCell, className, noRowBg = false }: ITableProps) {
    const noData = useSelector(selectLocalValue('txt.table.emptyData'));

    if (!tBodyData.length) {
        tBodyData = [{ key: 1, cellData: [{ key: 1, data: noData }] }];
    }

    return (
        <div className={`${styles.table} ${className}`}>
            {tHeadData
                ? <TableHeadRow
                    tHeadData={tHeadData}
                />
                : tHeadElement}
            <div className={`${styles.tBody} tBody`}>
                {tBodyData.map((rowData) => {
                    return <TableRow key={rowData.key} data={rowData.cellData} renderCell={renderCell} noRowBg={noRowBg} />;
                })}
            </div>
        </div>
    );
};
