import { IBuyBatchCardData, ICardData } from '@models/IBuyBatchCardData';
import { updateUserBalance } from '@store/actions/user.actions';
import store from '@store/store';
import { useCallback, useState } from 'react';
import { apiClient } from './api.service';
import { showAmountChangeLabel } from '@store/actions/appState.actions';

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

export function useBuyCard<CardData extends ICardData>(updateUserBalanceOnSuccess = false): IUseBuyCardReturn<CardData> {
    const [card, setCard] = useState<IBuyBatchCardData<CardData> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const buyCard = useCallback(async (batchId: string) => {
        try {
            setLoading(true);
            setCard(null);
            const cardData = await postBuyCard<CardData>(batchId);

            if (!cardData) throw new Error('Error buying card');

            setCard(cardData);
            setLoading(false);

            if (updateUserBalanceOnSuccess) {
                store.dispatch(updateUserBalance({ total: cardData.rbaxBalance }));
                store.dispatch(showAmountChangeLabel(cardData.cardData.winAmount));
            }

            return cardData;
        } catch (error) {
            return null;
        }
    }, [updateUserBalance]);

    return { card, loading, buyCard };
}
