import { IBuyBatchCardData, ICardData } from '@models/IBuyBatchCardData';
import { updateUserBalanceRbax } from '@store/actions/user.actions';
import store from '@store/store';
import { useState } from 'react';
import { apiClient } from './api.service';

export async function postBuyCard<CardData extends ICardData>(batchId: string) {
    try {
        const response = await apiClient.post('/cards/buy', { batchId });
        const data: IBuyBatchCardData<CardData> = response.data;

        console.log('Card bought succesfully:', data);

        return data;
    } catch (error) {
        console.error('Error buying batch card: ', error);
        return null
    }
}

export interface IUseBuyCardReturn<CardData extends ICardData> {
    card: IBuyBatchCardData<CardData> | null;
    loading: boolean;
    buyCard: (batchId: string) => Promise<IBuyBatchCardData<CardData> | null>;
}

export function useBuyCard<CardData extends ICardData>(): IUseBuyCardReturn<CardData> {
    const [card, setCard] = useState<IBuyBatchCardData<CardData> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const buyCard = async (batchId: string) => {
        try {
            const cardData = await postBuyCard<CardData>(batchId);

            if (!cardData) throw new Error('Error buying card');

            setCard(cardData);
            setLoading(false);

            store.dispatch(updateUserBalanceRbax(cardData.rbaxBalance));

            return cardData;
        } catch (error) {
            return null;
        }
    };

    return { card, loading, buyCard };
}
