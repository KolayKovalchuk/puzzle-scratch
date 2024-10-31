import styles from './MainView.module.scss';

import { Header } from '@components/Header';

export function MainView() {

    return (
        <div className={styles.mainContainer}>
            <Header></Header>
        </div>
    );
};
