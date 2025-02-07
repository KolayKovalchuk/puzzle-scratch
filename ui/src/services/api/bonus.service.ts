import { apiClient } from './api.service';

export interface ICollectBonusResponse {
    success: boolean;
    amount: number;
    newBalance: number;
    collectLinkErrorStatus: string;
}

export async function postCollectGiftBonus(code: string) {
    try {
        const response = await apiClient.post('/bonus/gift/collect?code=' + code);
        const data: ICollectBonusResponse = response.data;

        console.log('Gift bonus collected successfully:', data);

        return data;
    } catch (error) {
        console.error('Error collecting gift bonus:', error);
        return null
    }
}

export async function postCollectRefferalGift() {
    try {
        const response = await apiClient.post('/bonus/referral/collect');
        const data: ICollectBonusResponse = response.data;

        console.log('Referral bonus collected successfully:', data);

        return data;
    } catch (error) {
        console.error('Error collecting referral bonus:', error);
        return null
    }
}

export async function postCollectDailyGift() {
    try {
        const response = await apiClient.post('/bonus/daily/collect');
        const data: ICollectBonusResponse = response.data;

        console.log('Daily bonus collected successfully:', data);

        return data;
    } catch (error) {
        console.error('Error collecting daily gift bonus:', error);
        return null
    }
}

export async function postCollectEmojiBonus() {
    try {
        const response = await apiClient.post('/bonus/emoji/collect');
        const data: ICollectBonusResponse = response.data;

        console.log('Emoji bonus collected successfully:', data);

        return data;
    } catch (error) {
        console.error('Error collecting Emoji bonus:', error);
        return null
    }
}

export async function postCollectAffiliateBonus(code: string) {
    try {
        const response = await apiClient.post('/bonus/affiliate/collect?code=' + code);
        const data: ICollectBonusResponse = response.data;

        console.log('Affiliate bonus collected successfully:', data);

        return data;
    } catch (error) {
        console.error('Error collecting Affiliate bonus:', error);
        return null
    }
}