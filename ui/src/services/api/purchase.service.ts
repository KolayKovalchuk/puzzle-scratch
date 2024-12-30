import { useEffect, useState } from 'react';
import { apiClient } from './api.service';

export interface IStarsConvertOption {
    rbax: number;
    stars: number;
}

export interface IInvoiceData {
    invoiceUrl: string;
    invoiceId: string;
}

export interface IPostConvertStarsResponse {
    success: boolean;
    updatedPackages: IStarsConvertOption[];
    invoiceData: IInvoiceData;
}

export async function getStarsConvertOptions(): Promise<IStarsConvertOption[]> {
    try {
        const response = await apiClient.get('/purchase/stars');

        console.log('Stars convert options:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching stars convert options:', error);
        return [];
    }
}

export interface IPostConvertStarsResponse {
    paid: boolean,
    rbaxBalance: number,
    rbaxDelta: number,
}
export async function getStarsConvertResult(invoiceId: string): Promise<IPostConvertStarsResponse | null> {
    try {
        const url = `/purchase/stars/${invoiceId}`;
        const response = await apiClient.get(url);

        console.log('Stars convert options:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching stars convert options:', error);
        return null;
    }
}

export async function postConvertStars(option: IStarsConvertOption): Promise<IPostConvertStarsResponse> {
    try {
        const response = await apiClient.post('/purchase/stars', option);

        console.log('Post convert stars response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error posting convert stars option:', error);
        throw error;
    }
}

export function useGetStarsConvertOptions() {
    const [starsConvertOptions, setStarsConvertOptions] = useState<IStarsConvertOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getStarsConvertOptions().then((options) => {
            setStarsConvertOptions(options);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }, []);

    return { starsConvertOptions, isLoading };
}
