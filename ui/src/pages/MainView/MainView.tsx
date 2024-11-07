import styles from './MainView.module.scss';

import { Header } from '@components/Header';

import { BatchCardContainer } from '@components/BatchCard';
import { LeaderBoard } from './LeaderBoard/LeaderBoard';
import { LogoHeader } from './LogoHeader/LogoHeader';

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

            <div className={styles.leaderboardContainer}>
                <LeaderBoard />
            </div>
        </div>
    );
};
