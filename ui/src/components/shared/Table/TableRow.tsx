import { ReactNode } from 'react';
import { ITableCellData } from './Table.models';

import styles from './Table.module.scss';

export interface ITableRowProps {
    data: ITableCellData[];
}

function getCellTitle(cellData: ReactNode) {
    const cellDataType = typeof cellData;
    return cellDataType === 'string' || cellDataType === 'number' ? cellData?.toString() : '';
}

export function TableRow({ data }: ITableRowProps) {
    const cellWidthPercent = `${100 / data.length}%`;
    
    return (
        <div className={styles.row} >
            {
                data.map((item) => {
                    const title = getCellTitle(item.data);
                    return <div
                        key={item.key}
                        className={styles.cell}
                        style={{ width: cellWidthPercent }}
                        title={title}
                    >{item.data}</div>;
                })
            }
        </div>
    );
};