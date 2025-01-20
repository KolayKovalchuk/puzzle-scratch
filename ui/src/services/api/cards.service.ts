import { IBuyBatchCardData, ICardData } from '@models/IBuyBatchCardData';
import { setAppError } from '@store/actions/appState.actions';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { apiClient } from './api.service';
import store from '@store/store';
import { AppErrors } from '@store/reducers/appState.reducer';

export async function postBuyCard<CardData extends ICardData>(batchId: string) {
    try {
        const response = await apiClient.post('/cards/buy', { batchId });
        const data: IBuyBatchCardData<CardData> = response.data;

        console.log('Card bought succesfully:', data);

        return data;
    } catch (error) {
        console.error('Error buying batch card: ', error);
        throw error;
    }
}

export interface IUseBuyCardReturn<CardData extends ICardData> {
    card: IBuyBatchCardData<CardData> | null;
    loading: boolean;
    buyCard: (batchId: string) => Promise<IBuyBatchCardData<CardData> | null>;
}

export function useBuyCard<CardData extends ICardData>(): IUseBuyCardReturn<CardData> {
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

            return cardData;
        } catch (error) {
            setLoading(false);
            _handleError(error as Error);
            
            return null;
        }
    }, []);

    return { card, loading, buyCard };
}

function _handleError(error: Error) {
    
    if (error instanceof AxiosError && error.response?.status === 400) {
        const isInnsufficientBalanceError = error.response.data?.error === AppErrors.InsufficientBalance;
        if (isInnsufficientBalanceError) {
            console.log('!!!!', error);
            // insufficientBalanceErrorHandle();
            store.dispatch(setAppError(AppErrors.InsufficientBalance));
        }
    } else {
        console.error('Error buying batch card: ', error);
    }
}
