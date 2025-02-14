import { BatchCard, BatchCardType, BatchStatus } from '@models/BatchCard.model';
import { apiClient } from './api.service';
import { useEffect, useState } from 'react';

export async function getBatches(): Promise<BatchCard[]> {
    try {
        const response = await apiClient.get('/batches');
        const batchList = response.data.map((batch: any) => new BatchCard(batch));

        console.log('Batches fetched successfully:', response.data);

        return batchList;
    } catch (error) {
        console.error('Error fetching batches:', error);
        return [];
    }
}

export async function getBatchById(id: number | string): Promise<BatchCard | null> {
    try {
        const response = await apiClient.get(`/batches/${id}`);
        const batch = new BatchCard(response.data);

        console.log('Batch fetched successfully:', response.data);

        return batch;
    } catch (error) {
        console.error('Error fetching batch:', error);
        return null;
    }
}

export function useGetBatchById(id: number | string | null): { batch: BatchCard | null, loading: boolean } {
    const [batch, setBatch] = useState<BatchCard | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        const fetch = async () => {
            setLoading(true)
            const batch = await getBatchById(id);
            setBatch(batch);
            setLoading(false);
        };

        fetch();
    }, [id]);

    return { batch, loading };
}

const LuckyClowerMock: BatchCard = new BatchCard({
    batchId: 'mockId',
    batchName: 'Lucky Clover',
    cardType: BatchCardType.LUCKY_CLOVER,
    cardsCount: 0,
    scratchedCards: 0,
    totalCardsInBatch: 0,
    winnersCount: 0,
    wonPrizeSum: 0,
    totalPotentialPrizes:0,
    availablePrizes: 0,
    pricePerCard: 10,
    sizeX: 6,
    sizeY: 6,
    maxPrize: 2500,
    status: BatchStatus.SCHEDULED,
});

export function useGetBatches(): [BatchCard[], boolean] {
    const [batches, setBatches] = useState<BatchCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            const batchList = await getBatches();
            batchList.push(LuckyClowerMock);
            setBatches(batchList);
            setLoading(false);
        };

        fetch();
    }, []);

    return [ batches, loading ];
}
