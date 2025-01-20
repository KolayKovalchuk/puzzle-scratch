import { IUserBalance } from '@models/User.model';
import { updateUserBalanceWithChangeAnimation } from '@store/actions/user.actions';
import { selectUserBalanceTotal } from '@store/selectors/user.selectors';
import store from '@store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiClient } from './api.service';

export interface IUserBalanceResponse {
    totalBalance: number;
    withdrawableBalance: number;
}

export async function getUserBalance(): Promise<IUserBalanceResponse | null> {
    try {
        const response = await apiClient.get('/balance');

        return response.data;
    } catch (error) {
        console.error('Error getting user balance:', error);
        return null
    }
}

export async function updateUserBalance() {
    try {
        const prevBalance = store.getState().user.user?.balance?.total;
        const userBalanceResponse = await getUserBalance();
        const userBalance: IUserBalance = {
            total: userBalanceResponse?.totalBalance || 0,
            withdrawable: userBalanceResponse?.withdrawableBalance || 0,
        }
        const balanceDiff = userBalance.total - (prevBalance || 0);
        store.dispatch(updateUserBalanceWithChangeAnimation(userBalance, balanceDiff));

        return userBalance;

    } catch (error) {
        console.error('Error updating user balance:', error);
        return null
    }
}

export function useGetUserBalance(): { balance: IUserBalance | null, isLoading: boolean } {
    const [balance, setBalance] = useState<IUserBalance | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const balance = await updateUserBalance();
            setBalance(balance);
            setLoading(false);
        };

        fetch();
    }, []);

    return { balance, isLoading };
}
