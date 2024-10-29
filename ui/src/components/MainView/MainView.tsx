import styles from './MainView.module.scss';

import { FC } from 'react';
import { Header } from '../Header/Header';
import { BatchCard } from '../BatchCard/BatchCard';

export const MainView: FC = () => {

    return (
        <div className={styles.mainContainer}>
            <Header></Header>
            <BatchCard></BatchCard>
        </div>
    );
};
