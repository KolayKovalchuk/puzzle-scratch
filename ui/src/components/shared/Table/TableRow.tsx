import { ReactNode } from 'react';
import { ITableCellData } from './Table.models';

import styles from './Table.module.scss';

export interface ITableCellProps {
    data: ITableCellData['data'];
    width?: number | string;
    className?: string;
}

export function TableCell({ data, width, className }: ITableCellProps) {
    return <div
        className={`${styles.cell} ${className} tCell`}
        style={{ width: width || 'auto' }}
        title={data?.toString()}
    >{data}</div>;
}

export interface ITableRowProps {
    data: ITableCellData[];
    renderCell?: (data: ITableCellData, index: number, cellWidth: string) => ReactNode;
    noRowBg?: boolean;
}

export function TableRow({ data, renderCell, noRowBg = false }: ITableRowProps) {
    const cellWidthPercent = `${100 / data.length}%`;

    const rowClassName = `${styles.row} ${ noRowBg ? '' : styles.defaultRowBg } tRow`;

    return (
        <div className={rowClassName} >
            {
                data.map((item, index) => {
                    if (renderCell) {
                        return renderCell(item, index, cellWidthPercent);
                    }

                    return <TableCell key={item.key} data={item.data} width={cellWidthPercent} />;
                })
            }
        </div>
    );
};