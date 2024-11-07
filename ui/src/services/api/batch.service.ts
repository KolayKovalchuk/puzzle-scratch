import { BatchCard } from '@models/BatchCard.model';
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

export async function getBatchById(id: number): Promise<BatchCard | null> {
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

export function useGetBatches(): [BatchCard[], boolean] {
    const [batches, setBatches] = useState<BatchCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            const batchList = await getBatches();
            setBatches(batchList);
            setLoading(false);
        };

        fetch();
    }, []);

    return [ batches, loading ];
}
