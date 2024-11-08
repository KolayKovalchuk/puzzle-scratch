import styles from './MainView.module.scss';

import { Header } from '@components/Header';

import { BatchCardContainer } from '@components/BatchCard';
import { NotificationPopup } from '@components/NotificationPopup/NotificationPopup';
import { useShowNotificationsPopups } from '@services/notifications.service';
import { shareLinkToFriends } from '@services/telegramWebApp/telegramWebApp.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';
import { LeaderBoard } from './LeaderBoard/LeaderBoard';
import { LogoHeader } from './LogoHeader/LogoHeader';

export function MainView() {
    const shareLinkText = useSelector(selectLocalValue('txt.invite.msg'))
    const [userNotifications, removeNotification] = useShowNotificationsPopups();

    const onSharedClicked = () => {
        shareLinkToFriends(shareLinkText);
    }

    return (<>
        <div className={styles.mainContainer}>
            <Header></Header>
            <LogoHeader></LogoHeader>
            <BatchCardContainer></BatchCardContainer>

            <div className={styles.banner}>
                <img src="/invite_frind_bunner.png" alt="Invite Friend" />
            </div>
            <div className={styles.banner} onClick={() => onSharedClicked()}>
                <img src="/send_rbax_to_a_friend.png" alt="Send Rbax to a Friend" />
            </div>

            <div className={styles.leaderboardContainer}>
                <LeaderBoard />
            </div>
        </div>
        {userNotifications.length && <NotificationPopup
            isOpen={userNotifications.length > 0}
            notification={userNotifications[0]}
            onConfirm={(notification) => {
                removeNotification(notification);
            }}
        />}
    </>);
};
