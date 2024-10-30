import styles from './MainView.module.scss';

import { BatchCard } from '@components/BatchCard';
import { Header } from '@components/Header';

export function MainView() {

    return (
        <div className={styles.mainContainer}>
            <Header></Header>
            <BatchCard></BatchCard>
        </div>
    );
};
