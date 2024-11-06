import styles from './MainView.module.scss';

import { Header } from '@components/Header';

import { LogoHeader } from './LogoHeader/LogoHeader';
import { BatchCardContainer } from '@components/BatchCard';

export function MainView() {
    return (
        <div className={styles.mainContainer}>
            <Header></Header>
            <LogoHeader></LogoHeader>
            <BatchCardContainer></BatchCardContainer>

            <div className={styles.banner}>
                <img src="/invite_frind_bunner.png" alt="Invite Friend" />
            </div>
            <div className={styles.banner}>
                <img src="/send_rbax_to_a_friend.png" alt="Invite Friend" />
            </div>
        </div>
    );
};
