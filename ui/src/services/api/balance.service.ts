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
        console.error('Error creating share link code:', error);
        return null
    }
}

export function useGetUserBalance(): { balance: IUserBalance | null, isLoading: boolean } {
    const [balance, setBalance] = useState<IUserBalance | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    const prevBalance = useSelector(selectUserBalanceTotal);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const userBalanceResponse = await getUserBalance();
            setLoading(false);

            const userBalance: IUserBalance = {
                total: userBalanceResponse?.totalBalance || 0,
                withdrawable: userBalanceResponse?.withdrawableBalance || 0,
            }
            const balanceDiff = userBalance.total - (prevBalance || 0);
            setBalance(userBalance);
            store.dispatch(updateUserBalanceWithChangeAnimation(userBalance, balanceDiff));
        };

        fetch();
    }, [prevBalance]);

    return { balance, isLoading };
}
