import { ITableCellData } from '@components/shared/Table/Table.models';
import { formatLargeNumber, formatNumber } from '@utils/formatters/formatNumber';

export interface ILeaderboardCellProps {
    className?: string;
    cellData: ITableCellData['data'];
    isLargeNumber?: boolean;
}

export function LeaderboardCell({ cellData, className, isLargeNumber }: ILeaderboardCellProps) {
    if (typeof cellData === 'number' && isLargeNumber) {
        return (
            <span className={className || ''} title={formatNumber(cellData)}>
                {formatLargeNumber(cellData)}
            </span>
        );
    }

    return (
        <span className={className || ''}>
            {cellData}
        </span>
    );
}