import { useEffect, useState } from 'react';
import { LeaderboardTableMode } from '../LeaderBoard';
import { useSelector } from 'react-redux';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { ITableData } from '@components/shared/Table/Table.models';

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

export function useLeaderboardHeaderData(mode: LeaderboardTableMode): ITableData["tHeadData"] {
    const [ headerData, setHeaderData ] = useState<ITableData["tHeadData"]>([]);

    const headerKey = useLeaderboardHeaderKey(mode);
    const columnPlaceName = useSelector(selectLocalValue('txt.leaderboard.place'));
    const columnModeName = useSelector(selectLocalValue(headerKey));
    const columnPrizesName = useSelector(selectLocalValue('txt.leaderboard.prizes'));

    useEffect(() => {
        const data = [
            { key: 1, data: columnPlaceName },
            { key: 2, data: columnModeName },
            { key: 3, data: columnPrizesName },
        ];
        setHeaderData(data);
    }, [mode, columnPlaceName, columnModeName, columnPrizesName]);


    return headerData;
}
