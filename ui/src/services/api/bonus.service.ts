import { apiClient } from './api.service';

export interface ICollectGiftBonusResponse {
    success: boolean;
    amount: number;
    newBalance: number;
    collectLinkErrorStatus: string;
}

export async function postCollectGiftBonus(code: string) {
    try {
        const response = await apiClient.post('/bonus/gift/collect?code=' + code);
        const data: ICollectGiftBonusResponse = response.data;

        console.log('Gift bonus collected successfully:', data);

        return data;
    } catch (error) {
        console.error('Error collecting gift bonus:', error);
        return null
    }
}

export interface ICollectReferralBonusResponse {
    amount: number;
    newBalance: number;
}

export async function postCollectRefferalGift() {
    try {
        const response = await apiClient.post('/bonus/referral/collect');
        const data: ICollectReferralBonusResponse = response.data;

        console.log('Referral bonus collected successfully:', data);

        return data;
    } catch (error) {
        console.error('Error collecting gift bonus:', error);
        return null
    }
}