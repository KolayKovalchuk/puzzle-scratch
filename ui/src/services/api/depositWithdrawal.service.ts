import { apiClient } from './api.service';
import { useState, useEffect } from 'react';

export enum SupportedDepositWallets {
    RBAX = 'RBAX',
    USDT = 'USDT',
    TON = 'TON',
}

export interface IDepositAdress {
    coin?: SupportedDepositWallets
    address: string
    memo: number
    minDeposit: number
}

class DepositAdress implements IDepositAdress {
    coin?: SupportedDepositWallets
    address: string
    memo: number
    minDeposit: number

    constructor(data: IDepositAdress) {
        this.coin = data.coin;
        this.address = data.address;
        this.memo = data.memo;
        this.minDeposit = data.minDeposit;
    }
}

export async function getDepositAdress(coin: SupportedDepositWallets): Promise<IDepositAdress | null> {
    try {
        const response = await apiClient.get(`/dw/deposit-address/${coin}`);

        console.log('Deposit adress fetched successfully:', response.data);

        const depositData = new DepositAdress(response.data);
        if (!depositData.coin) {
            depositData.coin = coin;
        }
        return depositData;
    } catch (error) {
        console.error('Error fetching deposit adress:', error);
        return null;
    }
}

export function useDepositAddress(coin: SupportedDepositWallets): { depositAddress: IDepositAdress | null, loading: boolean } {
    const [depositAddress, setDepositAddress] = useState<IDepositAdress | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            const address = await getDepositAdress(coin);
            setDepositAddress(address);
            setLoading(false);
        };

        fetch();
    }, [coin]);

    return { depositAddress, loading };
}

export interface IDWHistory {
    date: number;
    walletAddress: string | null;
    amount: number;
    stars: number | null;
    type: 0 | 1; // 0 - withdraw, 1 - deposit
}

export async function getDWHistory(): Promise<IDWHistory[] | null> {
    try {
        const response = await apiClient.get('/dw/history');

        console.log('Deposit and withdrawal history fetched successfully:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching deposit and withdrawal history:', error);
        return null;
    }
}

export function useDWHistory(): { historyData: IDWHistory[] | null, loading: boolean } {
    const [historyData, setHistory] = useState<IDWHistory[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getDWHistory();
            setHistory(data);
            setLoading(false);
        };

        fetch();
    }, []);

    return { historyData, loading };
}