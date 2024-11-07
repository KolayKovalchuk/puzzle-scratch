import { LeaderboardData } from '@models/Leaderboard.model';
import { apiClient } from './api.service';
import { useEffect, useState } from 'react';

export async function getLeaderboardData() {
    try {
        const response = await apiClient.get('/leaderboard/all');
        const data = new LeaderboardData(response.data);
        return data;
    } catch (error) {
        console.log('Error fetching leaderboard data:', error);
        return null;
    }
}

export function useFetchLeaderboardData(): [LeaderboardData | null, boolean] {
    const [data, setData] = useState<LeaderboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            const leaderboardData = await getLeaderboardData();
            setData(leaderboardData);
            setLoading(false);
        };

        fetch();
    }, []);

    return [ data, loading ];
}
