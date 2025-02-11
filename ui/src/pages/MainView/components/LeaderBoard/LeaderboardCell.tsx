import { ITableCellData } from '@components/shared/Table/Table.models';
import { TableCell } from '@components/shared/Table/TableRow';
import { formatLargeNumber, formatNumber } from '@utils/formatters/formatNumber';

export interface ILeaderboardCellProps {
    cellWidth: string;
    className?: string;
    cellData: ITableCellData['data'];
    isLargeNumber?: boolean;
}

import styles from './LeaderBoard.module.scss';


export function LeaderboardCell({ cellData, className, isLargeNumber, cellWidth }: ILeaderboardCellProps) {
    if (typeof cellData === 'number' && isLargeNumber) {
        const title = formatNumber(cellData);

        const cellContent = (
            <span className={className || ''} title={title}>
                {formatLargeNumber(cellData)}
            </span>
        );

        return (
            <TableCell data={cellContent} width={cellWidth} className={styles.cell}/>
        )
    }

    const cellContent = (
        <span className={className || ''}>
            {cellData}
        </span>
    );

    return (
        <TableCell data={cellContent} width={cellWidth} className={styles.cell}/>
    );
}