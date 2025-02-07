import { ReactNode } from 'react';
import { ITableCellData, ITableData } from './Table.models';

import styles from './Table.module.scss';

export interface ITableHeaderProps {
    tHeadData: ITableData['tHeadData'];
    renderCell?: (data: ITableCellData, index: number, className: string, cellWidth: string) => ReactNode;
    className?: string;
}

export function TableHeadRow({ tHeadData, className = '', renderCell }: ITableHeaderProps) {
    if (!tHeadData) return <></>

    return (
        <div className={`${styles.headRow} tHeadRow`}>
            {tHeadData.map((headData, index) => {
                const cellClassName = `${styles.headCellContainer} ${className} tHeadCell`;

                if (renderCell) {
                    const cellWidth = `${100 / tHeadData.length}%`;
                    return renderCell(headData, index, cellClassName, cellWidth);
                }

                return (
                    <div key={headData.key} className={cellClassName}>
                        {headData.data}
                    </div>
                )
            })}
        </div>
    );
};