import { Table } from '@components/shared/Table';
import { useLeaderboardData } from './hooks/useLeaderboardData';

import { useCallback, useState } from 'react';
import styles from './LeaderBoard.module.scss';

import { Icon } from '@components/shared/Icon';
import leaderboardIcon from '@icons/leaderboard.svg';

import { HeaderRow } from './HeaderRow';

interface ILeaderBoardProps {
}

export enum LeaderboardTableMode {
    Monthly = 'Monthly',
    Weekly = 'Weekly',
    Daily = 'Daily',
}

export function LeaderBoard({ }: ILeaderBoardProps) {
    const [mode, setMode] = useState<LeaderboardTableMode>(LeaderboardTableMode.Monthly);
    const [tBodyData, isLoading] = useLeaderboardData(mode);
    
    const setModeCb = useCallback((mode: LeaderboardTableMode) => setMode(mode), [mode]);

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
                tHeadElement={<HeaderRow mode={mode} setMode={setModeCb} />}
            />
        </div>
    );
};
