import { ITableData } from './Table.models';
import { TableHeadRow } from "./TableHeadRow";
import { TableRow } from "./TableRow";

import styles from './Table.module.scss';

export interface ITableProps extends ITableData {
    customClass?: string;
}

export function Table({ tHeadData, tBodyData, customClass }: ITableProps) {
    return (
        <div className={`${styles.table} ${customClass}`}>
            <TableHeadRow
                tHeadData={tHeadData}
            />
            {tBodyData.map((rowData) => {
                return <TableRow key={rowData.key} data={rowData.cellData} />;
            })}
        </div>
    );
};
