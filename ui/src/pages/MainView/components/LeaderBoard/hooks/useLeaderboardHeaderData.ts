import { selectLocalValue } from '@store/selectors/localization.selectors';
import { Key, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LeaderboardTableMode } from '../LeaderBoard';

export function getLeaderboardHeaderKey(mode: LeaderboardTableMode): string {
    switch (mode) {
        case LeaderboardTableMode.Monthly:
            return 'txt.leaderboard.monthly';
        case LeaderboardTableMode.Weekly:
            return 'txt.leaderboard.weekly';
        case LeaderboardTableMode.Daily:
            return 'txt.leaderboard.daily';
        
        default: return ''
    }
}

export function useLeaderboardHeaderKey(mode: LeaderboardTableMode): string {
    const [ headerKey, setHeaderKey ] = useState<string>('');
    useEffect(() => {
        setHeaderKey(getLeaderboardHeaderKey(mode));
    }, [mode]);

    return headerKey;
}

export interface ILeaderboardHeaderData {
    data: {
        text: string,
        isArrowCell?: boolean,
    };
    key: Key;
}

export function useLeaderboardHeaderData(mode: LeaderboardTableMode): ILeaderboardHeaderData[] {
    const [ headerData, setHeaderData ] = useState<ILeaderboardHeaderData[]>([]);

    const headerKey = useLeaderboardHeaderKey(mode);
    const columnPlaceName = useSelector(selectLocalValue('txt.leaderboard.place'));
    const columnModeName = useSelector(selectLocalValue(headerKey));
    const columnPrizesName = useSelector(selectLocalValue('txt.leaderboard.prizes'));

    const columnNameList = [columnPlaceName, columnModeName, columnPrizesName];

    useEffect(() => {
        const data: ILeaderboardHeaderData[] = columnNameList.map((name, index) => ({
            data: {
                text: name,
                isArrowCell: name === columnModeName,
            },
            key: index
        }));
        setHeaderData(data);
    }, [mode, columnPlaceName, columnModeName, columnPrizesName]);


    return headerData;
}
