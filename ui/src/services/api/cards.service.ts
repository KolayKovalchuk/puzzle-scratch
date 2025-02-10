import { IBuyBatchCardData, ICardData, WinType } from '@models/IBuyBatchCardData';
import { setAppError } from '@store/actions/appState.actions';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { apiClient } from './api.service';
import store from '@store/store';
import { AppErrors } from '@store/reducers/appState.reducer';

const cardMock: IBuyBatchCardData<ICardData> = {
    "winning": 5,
    "cardData": {
        "matrix": [
            [
                "w1",
                "1",
                "2",
                "8",
                "6"
            ],
            [
                "2",
                "w3",
                "5",
                "8",
                "2"
            ],
            [
                "6",
                "3",
                "w4",
                "8",
                "1"
            ],
            [
                "4",
                "4",
                "4",
                "w5",
                "4"
            ],
            [
                "1",
                "2",
                "5",
                "6",
                "w6"
            ]
        ],
        "winAmount": 5,
        "potentialWin": 5,
        "winningCells": [
            [
                3,
                0
            ],
            [
                3,
                1
            ],
            [
                3,
                2
            ],
            [
                3,
                3
            ],
            [
                3,
                4
            ]
        ]
    },
    "batchId": "59e80b0b-6398-4448-9bb4-2a6d13fc9629",
    "rbaxBalance": 1172880.09,
    "rbaxBalanceBefore": 1172885.09,
    "winType": WinType.S
}

export async function postBuyCard<CardData extends ICardData>(batchId: string) {
    try {
        const response = await apiClient.post('/cards/buy', { batchId });
        const data: IBuyBatchCardData<CardData> = response.data;

        console.log('Card bought succesfully:', data);

        // return data;

        return cardMock;
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
