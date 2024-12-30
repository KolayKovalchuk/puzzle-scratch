import { IUserBalance } from '@models/User.model';
import { apiClient } from './api.service';
import { useEffect, useState } from 'react';
import store from '@store/store';
import { updateUserBalance } from '@store/actions/user.actions';

export interface IUserBalanceResponse {
    totalBalance: number;
    withdrawableBalance: number;
}

export async function getUserBalance(): Promise<IUserBalanceResponse | null> {
    try {
        const response = await apiClient.get('/balance');

        return response.data;
    } catch (error) {
        console.error('Error creating share link code:', error);
        return null
    }
}

export function useGetUserBalance(): { balance: IUserBalance | null, isLoading: boolean } {
    const [balance, setBalance] = useState<IUserBalance | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const userBalanceResponse = await getUserBalance();
            setLoading(false);

            const userBalance: IUserBalance = {
                total: userBalanceResponse?.totalBalance || 0,
                withdrawable: userBalanceResponse?.withdrawableBalance || 0,
            }
            setBalance(userBalance);
            store.dispatch(updateUserBalance(userBalance));
        };

        fetch();
    }, []);

    return { balance, isLoading };
}
