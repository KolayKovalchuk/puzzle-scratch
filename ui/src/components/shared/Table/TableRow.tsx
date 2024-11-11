import { ReactNode } from 'react';
import { ITableCellData } from './Table.models';

import styles from './Table.module.scss';

function getCellTitle(cellData: ReactNode) {
    const cellDataType = typeof cellData;
    return cellDataType === 'string' || cellDataType === 'number' ? cellData?.toString() : '';
}

export interface ITableCellProps {
    data: ITableCellData;
    width?: number | string;
}

export function TableCell({ data, width }: ITableCellProps) {
    const title = getCellTitle(data.data);

    return <div
        key={data.key}
        className={styles.cell}
        style={{ width: width || 'auto' }}
        title={title}
    >{data.data}</div>;
}

export interface ITableRowProps {
    data: ITableCellData[];
}

export function TableRow({ data }: ITableRowProps) {
    const cellWidthPercent = `${100 / data.length}%`;

    return (
        <div className={styles.row} >
            {
                data.map((item) => {
                    return <TableCell key={item.key} data={item} width={cellWidthPercent} />;
                })
            }
        </div>
    );
};