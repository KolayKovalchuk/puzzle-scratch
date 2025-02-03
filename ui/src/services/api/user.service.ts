import { IUserAcceptTermsResponse } from '@models/IUserAcceptTermsResponse';
import { updateToken } from '@services/auth.service';
import { updateUserLocale, updateUserTos } from '@store/actions/user.actions';
import store from '@store/store';
import { apiClient } from './api.service';
import { UserStats } from '@models/UserStats.model';
import { useState, useEffect } from 'react';

export async function patchUserLocale(locale: string): Promise<boolean> {
    try {
        const response = await apiClient.patch('/user/locale', {
            preferredLocale: locale.toLowerCase(),
        });

        console.log('Locale updated successfully:', response.data);
        return true;
    } catch (error) {
        console.error('Error updating locale:', error);
        return false;
    }
}

export async function patchUserAcceptTerms(): Promise<IUserAcceptTermsResponse | null> {
    try {
        const response = await apiClient.patch('/user/accept-tos');

        console.log('Terms updated successfully:', response.data);

        return response?.data;
    } catch (error) {
        console.error('Error updating user terms:', error);
        return null;
    }
}

export async function postUserClickId(clickId: string) {
    try {
        const response = await apiClient.post('/user/click', {
            id: clickId,
        });

        console.log('ClickId updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating user clickId:', error);
    }
}

export async function selectUserLocale(locale: string) {
    const patchLocaleResult = await patchUserLocale(locale)
    
    if (!patchLocaleResult) {
        console.error('Failed to update locale:', locale);
        return false;
    }

    store.dispatch(updateUserLocale(locale));

    return true
}

export async function aprooveUserTerms() {
    const patchUserAcceptTermsResult = await patchUserAcceptTerms()

    console.log('patchUserAcceptTermsResult', patchUserAcceptTermsResult);
    
    
    if (!patchUserAcceptTermsResult) {
        console.error('Failed to update terms');
        return false;
    }

    store.dispatch(updateUserTos(true));
    await updateToken(patchUserAcceptTermsResult);
    return true
}

export async function getUserStats(): Promise<UserStats | null> {
    try {
        const response = await apiClient.get('/user/stats');
        return response.data;
    } catch (error) {
        console.error('Error getting user stats:', error);
        return null;
    }
}

export function useGetUserStats() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userStats, setUserStats] = useState<UserStats>(new UserStats({
        totalCardsPlayed: 0,
        totalRbaxWon: 0,
        biggestWin: 0,
        recentGames: [],
    }));

    useEffect(() => {
        async function fetchUserStats() {
            setIsLoading(true);
            const stats = await getUserStats();
            if (stats) {
                setUserStats(stats);
            }
            setIsLoading(false);
        }

        fetchUserStats();
    }, []);

    return { userStats, isLoading };
}
