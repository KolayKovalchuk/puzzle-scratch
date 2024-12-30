import { apiClient } from './api.service';

const PUZZLE_GAME_SERVICE_URL = process.env.PUZZLE_GAME_SERVICE_URL || '';
console.log('PUZZLE_GAME_SERVICE_URL:', PUZZLE_GAME_SERVICE_URL);
const IS_DEV = process.env.IS_DEV === 'true';
console.log('IS_DEV:', IS_DEV);
const AUTH_TOKEN = IS_DEV ? "***REMOVED***" : process.env.TELEGRAM_INTERNAL_COMM_AUTH_TOKEN || '';

export async function validatePurchase(payload: string): Promise<boolean> {
    try {
        const response = await apiClient.get(`${PUZZLE_GAME_SERVICE_URL}/internal/purchase/preCheckout`, {
            params: { payload },
            headers: { 'X-Auth-Token': AUTH_TOKEN }
        });

        return response.data;
    } catch (error) {
        console.error('Error validating purchase:', error);
        return false;
    }
}

export async function notifySuccessPurchase(payload: string, telegramPaymentChargeId: string): Promise<void> {
    try {
        const response = await apiClient.post(`${PUZZLE_GAME_SERVICE_URL}/internal/purchase/success`, {
            payload,
            telegram_payment_charge_id: telegramPaymentChargeId
        }, {
            headers: { 'X-Auth-Token': AUTH_TOKEN }
        });

        if (response.status === 200) {
            console.log('Successfully notified Puzzle Game Service of successful purchase.');
        } else {
            console.error('Failed to notify Puzzle Game Service of successful purchase:', response.status);
        }
    } catch (error) {
        console.error('Error notifying Puzzle Game Service of successful purchase:', error);
    }
}
