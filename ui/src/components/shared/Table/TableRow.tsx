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
}

export function TableRow({ data, renderCell }: ITableRowProps) {
    const cellWidthPercent = `${100 / data.length}%`;

    return (
        <div className={styles.row} >
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