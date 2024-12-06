import { Table } from '@components/shared/Table';
import { useLeaderboardData } from './hooks/useLeaderboardData';

import { useState } from 'react';
import styles from './LeaderBoard.module.scss';

import { Icon } from '@components/shared/Icon';
import leaderboardIcon from '@icons/leaderboard.svg';

import { HeaderRow, useHeaderCells } from './HeaderRow';
import { LeaderboardCell } from './LeaderboardCell';

interface ILeaderBoardProps {
}

export enum LeaderboardTableMode {
    Monthly = 'Monthly',
    Weekly = 'Weekly',
    Daily = 'Daily',
}

export function LeaderBoard({ }: ILeaderBoardProps) {
    const [mode, setMode] = useState<LeaderboardTableMode>(LeaderboardTableMode.Monthly);
    const { tHeadData, onNextHeaderClick, onPrevHeaderClick } = useHeaderCells(mode, setMode);
    const [tBodyData, isLoading] = useLeaderboardData(mode);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Icon
                    name={leaderboardIcon}
                    className={styles.leaderboardIcon}
                />
            </div>
            <Table
                tBodyData={tBodyData}
                tHeadElement={
                    <HeaderRow
                        tHeadData={tHeadData}
                        onNextHeaderClick={onNextHeaderClick}
                        onPrevHeaderClick={onPrevHeaderClick}
                    />
                }
                renderCell={(data, index, cellWidth) => {
                    return (<LeaderboardCell
                        key={data.key}
                        cellWidth={cellWidth}
                        cellData={data.data}
                        isLargeNumber={index === tBodyData[0]?.cellData?.length - 1}
                    />)
                }}
            />
        </div>
    );
};
