import styles from './MainView.module.scss';

import { Header } from '@components/Header';

import { LogoHeader } from './LogoHeader/LogoHeader';

export function MainView() {
    return (
        <div className={styles.mainContainer}>
            <Header></Header>
            <LogoHeader></LogoHeader>
        </div>
    );
};
