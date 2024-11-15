import { IBuyBatchCardData } from '@src/models/IBuyBatchCardData';
import { apiClient } from './api.service';
import { useState } from 'react';
import store from '@src/store/store';
import { updateUserBalanceRbax } from '@src/store/actions/user.actions';

export async function postBuyCard(batchId: string) {
    try {
        const response = await apiClient.post('/cards/buy', { batchId });
        const data: IBuyBatchCardData = response.data;

        console.log('Card bought succesfully:', data);

        return data;
    } catch (error) {
        console.error('Error buying batch card: ', error);
        return null
    }
}

export function useBuyCard(): { card: IBuyBatchCardData | null, loading: boolean, buyCard: (batchId: string) => Promise<IBuyBatchCardData | null> } {
    const [card, setCard] = useState<IBuyBatchCardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const buyCard = async (batchId: string) => {
        try {
            const cardData = await postBuyCard(batchId);

            if (!cardData) throw new Error('Error buying card');

            console.log('Card bought succesfully:', cardData);
            

            setCard(cardData);
            setLoading(false);

            store.dispatch(updateUserBalanceRbax(cardData.rbaxBalance));

            return cardData;
        } catch (error) {
            console.error('Error buying card:', error);
            return null;
        }
    };

    return { card, loading, buyCard };
}
