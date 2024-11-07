import { ITableCellData } from './Table.models';

import styles from './Table.module.scss';

export interface ITableRowProps {
    data: ITableCellData[];
}

export function TableRow({ data }: ITableRowProps) {
    return (
        <div className={styles.row} >
        {
            data.map((item) => {
                return <div className={styles.cell} key={item.key}> { item.data } </div>;
            })
        }
        </div>
    );
};