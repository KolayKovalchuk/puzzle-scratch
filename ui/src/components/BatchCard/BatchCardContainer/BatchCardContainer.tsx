import { useGetBatches } from '@services/api/batch.service';
import { BatchCardComponent } from '../BatchCard';
import styles from './BatchCardContainer.module.scss';

export interface IBatchCardContainerProps { }

export function BatchCardContainer() {
    const [batches, loading] = useGetBatches();

    if (loading) {
        return <div className={styles.loadingContainer}>Loading...</div>;
    }

    

    return (
        <div className={styles.container}>
            {
                batches.map((batch) => (
                    <BatchCardComponent batchCard={batch} key={batch.batchId} className={styles.batchCard}></BatchCardComponent>
                ))
            }
        </div>
    )
}