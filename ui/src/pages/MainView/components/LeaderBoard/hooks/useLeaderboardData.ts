import { ITableData } from '@components/shared/Table/Table.models';
import { LeaderboardEntry } from '@models/Leaderboard.model';
import { useFetchLeaderboardData } from '@services/api/leaderboard.service';
import { useCallback, useEffect, useState } from 'react';
import { LeaderboardTableMode } from '../LeaderBoard';

export function getLeaderboardTableData(data: LeaderboardEntry[]): ITableData["tBodyData"] {
    return data
        .sort((a, b) => a.position - b.position)
        .map((entry, index) => {
            return {
                key: index,
                cellData: [
                    { key: 1, data: entry.position },
                    { key: 2, data: entry.username },
                    { key: 3, data: entry.totalWinning },
                ],
            };
        })
}

export function useLeaderboardData(mode: LeaderboardTableMode): [ITableData["tBodyData"], boolean] {
    const [data, isLoading] = useFetchLeaderboardData();
    const [tBodyData, setTBodyData] = useState<ITableData["tBodyData"]>([]);

    const getTBodyData = useCallback(() => {
        if (!data) {
            return [];
        }

        switch (mode) {
            case LeaderboardTableMode.Monthly:
                return getLeaderboardTableData(data.monthly);
            case LeaderboardTableMode.Weekly:
                return getLeaderboardTableData(data.weekly);
            case LeaderboardTableMode.Daily:
                return getLeaderboardTableData(data.daily);

            default: return [];
        }
    }, [mode, data]);

    useEffect(() => {
        setTBodyData(getTBodyData());
    }, [mode, data]);

    return [tBodyData, isLoading];
}
