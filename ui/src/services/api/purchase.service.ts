import { useEffect, useState } from 'react';
import { apiClient } from './api.service';

export interface IStarsConvertOption {
    rbax: number;
    stars: number;
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
