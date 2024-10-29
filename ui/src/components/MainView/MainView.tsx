import styles from './MainView.module.scss';

import { BatchCard } from '@components/BatchCard';
import { Header } from '@components/Header';
import { FC } from 'react';

export const MainView: FC = () => {

    return (
        <div className={styles.mainContainer}>
            <Header></Header>
            <BatchCard></BatchCard>
        </div>
    );
};
