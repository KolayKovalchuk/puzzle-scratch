
import { ITableCellData, ITRowData } from './Table.models';
import { TableHeadRow } from "./TableHeadRow";
import { ITableRowProps, TableRow } from "./TableRow";

import { selectLocalValue } from '@store/selectors/localization.selectors';
import { ReactNode, RefObject } from 'react';
import { useSelector } from 'react-redux';
import styles from './Table.module.scss';

export interface ITableProps {
    tHeadElement?: ReactNode;
    tHeadData?: ITableCellData[];

    tBodyData: ITRowData[];
    renderCell?: ITableRowProps['renderCell'];

    className?: string;
    emptyText?: string;
    noRowBg?: boolean;

    bodyRef?: RefObject<HTMLDivElement>;
}

export function Table({ tHeadData, tHeadElement, tBodyData, renderCell, className, emptyText, noRowBg = false, bodyRef }: ITableProps) {
    const noData = useSelector(selectLocalValue('txt.table.emptyData'));

    if (!tBodyData.length) {
        tBodyData = [{ key: 1, cellData: [{ key: 1, data: emptyText || noData }] }];
    }

    return (
        <div className={`${styles.table} ${className}`}>
            {tHeadData
                ? <TableHeadRow
                    tHeadData={tHeadData}
                />
                : tHeadElement}
            <div className={`${styles.tBody} tBody`} ref={bodyRef}>
                {tBodyData.map((rowData) => {
                    return <TableRow key={rowData.key} data={rowData.cellData} renderCell={renderCell} noRowBg={noRowBg} />;
                })}
            </div>
        </div>
    );
};
