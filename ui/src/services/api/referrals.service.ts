import { useEffect, useState } from 'react';
import { apiClient } from './api.service';
import { IGetReferralsResponse, IReferralData } from '@models/IGetReferralsResponse';

export interface IGetUserReferralsParams {
    page: number;
    size: number;
}

export async function getUserReferrals({ page, size }: IGetUserReferralsParams): Promise<IReferralData[] | null> {
    try {
        const response = await apiClient.get('/referrals', {
            params: {
                page,
                size
            }
        });
        const referralData = response.data as IGetReferralsResponse;

        return referralData.content;
    } catch (error) {
        console.error('Error creating share link code:', error);
        return null
    }
}

export function useGetUserReferrals({ page, size }: IGetUserReferralsParams) {
    const [isLoading, setIsLoading] = useState(false);
    const [referrals, setReferrals] = useState<IReferralData[]>([]);

    useEffect(() => {
        async function fetchUserReferrals() {
            setIsLoading(true);
            const result = await getUserReferrals({ page, size });

            if (result) {
                setReferrals(result);
            }

            setIsLoading(false);
        }

        fetchUserReferrals();
    }, [page, size]);

    return {
        isLoading,
        referrals
    }
}