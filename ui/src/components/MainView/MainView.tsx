import styles from './MainView.module.scss';

import { FC } from 'react';
import { Header } from '../Header/Header';

export const MainView: FC = () => {

    return (
        <div className={styles.mainContainer}>
            <Header></Header>
        </div>
    );
};
