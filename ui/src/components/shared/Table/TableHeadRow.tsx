import { ITableData } from './Table.models';

import styles from './Table.module.scss';

export interface iTableProps {
    tHeadData: ITableData['tHeadData'];
    className?: string;
}

export function TableHeadRow({ tHeadData, className = '' }: iTableProps) {
    if (!tHeadData) return <></>

    return (
        <div className={styles.headRow}>
            {tHeadData.map((headData) => {
                return (
                    <div key={headData.key} className={`${styles.headCellContainer} ${className} tHeadRow`}>
                        {headData.data}
                    </div>
                )
            })}
        </div>
    );
};