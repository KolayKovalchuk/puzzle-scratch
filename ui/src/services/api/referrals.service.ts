import { IGetReferralsResponse, IReferralData } from '@models/IGetReferralsResponse';
import { useEffect, useState } from 'react';
import { apiClient } from './api.service';

export interface IGetUserReferralsParams {
    page: number;
    size: number;
}

// const getMockReferralDataContent = async ({ page, size }: IGetUserReferralsParams): Promise<IGetReferralsResponse["content"]> => {
//     console.log('getMockReferralDataContent', page, size);
//     await new Promise((resolve) => setTimeout(resolve, 1000 + 10));
//     const mockData: IReferralData[] = [];
//     for (let i = page * size; i <= (page * size + size) - 1; i++) {
//         mockData.push({ nickname: `user${i + 1}` });
//     }
//     return mockData;
// };

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
        // return getMockReferralDataContent({ page, size });
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
