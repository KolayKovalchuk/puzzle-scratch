
import { ITableCellData, ITRowData } from './Table.models';
import { ITableHeaderProps, TableHeadRow } from "./TableHeadRow";
import { ITableRowProps, TableRow } from "./TableRow";

import { selectLocalValue } from '@store/selectors/localization.selectors';
import { ReactNode, RefObject, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Table.module.scss';

export interface ITableProps {
    tHeadElement?: ReactNode;
    tHeadData?: ITableCellData[];
    renderHeaderCell?: ITableHeaderProps['renderCell'];

    tBodyData: ITRowData[];
    renderCell?: ITableRowProps['renderCell'];

    className?: string;
    emptyText?: string;
    noRowBg?: boolean;

    bodyRef?: RefObject<HTMLDivElement>;
}

export function Table({
    tHeadData,
    renderHeaderCell,
    tHeadElement,
    tBodyData,
    renderCell,
    className,
    emptyText,
    noRowBg = false,
    bodyRef
}: ITableProps) {
    const noData = useSelector(selectLocalValue('txt.table.emptyData'));
    const [tableData, setTableData] = useState<ITRowData[]>([]);
    const [rowClassName, setRowClassName] = useState('');

    useEffect(() => {
        if (!tBodyData.length) {
            setTableData([{ key: 1, cellData: [{ key: 1, data: emptyText || noData }] }]);
            setRowClassName(styles.emptyRow);
        } else {
            setTableData(tBodyData);
            setRowClassName('');
        }
    }, [tBodyData]);

    return (
        <div className={`${styles.table} ${className}`}>
            {tHeadData
                ? <TableHeadRow
                    tHeadData={tHeadData}
                    renderCell={renderHeaderCell}
                />
                : tHeadElement}
            <div className={`${styles.tBody} tBody`} ref={bodyRef}>
                {tableData.map((rowData) => {
                    return <TableRow
                        className={rowClassName}
                        key={rowData.key}
                        data={rowData.cellData}
                        renderCell={renderCell}
                        noRowBg={noRowBg}
                    />;
                })}
            </div>
        </div>
    );
};
