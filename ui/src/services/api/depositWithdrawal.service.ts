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

        console.log('Batches fetched successfully:', response.data);

        const depositData = new DepositAdress(response.data);
        depositData.coin = coin;
        return depositData;
    } catch (error) {
        console.error('Error fetching batches:', error);
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