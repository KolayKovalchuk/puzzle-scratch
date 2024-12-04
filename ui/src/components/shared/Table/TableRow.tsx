import { ReactNode } from 'react';
import { ITableCellData } from './Table.models';

import styles from './Table.module.scss';

export interface ITableCellProps {
    data: ITableCellData['data'];
    width?: number | string;
}

export function TableCell({ data, width }: ITableCellProps) {
    return <div
        className={styles.cell}
        style={{ width: width || 'auto' }}
        title={data?.toString()}
    >{data}</div>;
}

export interface ITableRowProps {
    data: ITableCellData[];
    renderCell?: (data: ITableCellData, index: number) => ReactNode;
    noRowBg?: boolean;
}

export function TableRow({ data, renderCell, noRowBg = false }: ITableRowProps) {
    const cellWidthPercent = `${100 / data.length}%`;

    const rowClassName = `${styles.row} ${ noRowBg ? '' : styles.defaultRowBg }`;

    return (
        <div className={rowClassName} >
            {
                data.map((item, index) => {
                    const cellData = renderCell
                        ? renderCell(item, index)
                        : item.data;

                    return <TableCell key={item.key} data={cellData} width={cellWidthPercent} />;
                })
            }
        </div>
    );
};