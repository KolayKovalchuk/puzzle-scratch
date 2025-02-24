import { IBuyBatchCardData, ICardData, WinType } from '@models/IBuyBatchCardData';
import { setAppError } from '@store/actions/appState.actions';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { apiClient } from './api.service';
import store from '@store/store';
import { AppErrors } from '@store/reducers/appState.reducer';

const mock = {
    "winning": 2,
    "cardData": {
        "win": 2,
        "matrix": [
            [
                "0",
                "4",
                "0",
                "0",
                "98",
                "0"
            ],
            [
                "14",
                "2",
                "83",
                "86",
                "8",
                "62"
            ],
            [
                "0",
                "16",
                "0",
                "0",
                "55",
                "0"
            ],
            [
                "0",
                "10",
                "0",
                "0",
                "98",
                "0"
            ],
            [
                "86",
                "50",
                "51",
                "9",
                "5",
                "57"
            ],
            [
                "0",
                "82",
                "0",
                "0",
                "44",
                "0"
            ]
        ],
        "clovers": 1,
        "winAmount": 2,
        "winningLine": [
            "16",
            "83",
            "14",
            "26",
            "4",
            "91"
        ],
        "winningCells": [
            [
                1,
                1
            ],
            [
                1,
                4
            ],
            [
                4,
                1
            ],
            [
                4,
                4
            ],

            [6,1],
            [6,3]
        ]
    },
    "batchId": "71f9e638-c2cc-477c-ba99-f2167cbe7409",
    "rbaxBalance": 1165918.09,
    "rbaxBalanceBefore": 1165926.09,
    "winType": WinType.S
}

export async function postBuyCard<CardData extends ICardData>(batchId: string) {
    try {
        // const response = await apiClient.post('/cards/buy', { batchId });
        // const data: IBuyBatchCardData<CardData> = response.data;

        // console.log('Card bought succesfully:', data);

        // return data;
        return mock;
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
        switch (error.response.data?.error) {
            case AppErrors.InsufficientBalance:
                store.dispatch(setAppError(AppErrors.InsufficientBalance));
                break;
            case AppErrors.NoAvailableCards:
                store.dispatch(setAppError(AppErrors.NoAvailableCards));
                break;
        }
    } else {
        console.error('Error buying batch card: ', error);
    }
}
