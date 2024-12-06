import styles from './MainView.module.scss';


import { BatchCardContainer } from '@components/BatchCard';
import { NotificationPopup } from '@components/NotificationPopup/NotificationPopup';
import { getAppLinkWithParam, linkCodeParam, postCreateShareLinkCode } from '@services/api/links.service';
import { useShowLoginNotificationsPopups } from '@services/loginNotifications.service';
import { shareLinkToFriends } from '@services/telegramWebApp/telegramWebApp.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { InviteFriendList } from './InviteFriendList/InviteFriendList';
import { LeaderBoard } from './LeaderBoard/LeaderBoard';
import { LogoHeader } from './LogoHeader/LogoHeader';
import { useGetNotifications } from '@services/api/notificationAPI.service';
import { Footer } from '@components/Footer/Footer';

export function MainView() {
    const shareLinkText = useSelector(selectLocalValue('txt.invite.msg'))
    const [userLoginNotifications, removeLoginNotification] = useShowLoginNotificationsPopups();

    const [isInviteFriendVisible, setIsInviteFriendVisible] = useState(false);

    const onInviteClicked = () => {
        setIsInviteFriendVisible(true);
    }

    const onSharedClicked = async () => {
        const linkCode = await postCreateShareLinkCode();

        if (!linkCode) {
            return;
        }

        const url = getAppLinkWithParam(linkCode, linkCodeParam);
        shareLinkToFriends(shareLinkText, url);
    }

    const containerClassName = `${styles.container} ${isInviteFriendVisible ? styles.hidden : ''}`;

    const { notifications, removeNotification } = useGetNotifications();

    const isUserLoginNotificationsEmpty = userLoginNotifications.length === 0;
    const isNotificationsEmpty = notifications.length === 0;

    return (<>
        <div className={styles.mainContainer}>
            {isInviteFriendVisible && <InviteFriendList onCloseClick={() => setIsInviteFriendVisible(false)} />}
            <div className={containerClassName}>
                <LogoHeader></LogoHeader>
                <BatchCardContainer></BatchCardContainer>

                <div className={styles.banner} onClick={() => onInviteClicked()}>
                    <img src="/invite_frind_bunner.png" alt="Invite Friend" />
                </div>
                <div className={styles.banner} onClick={() => onSharedClicked()}>
                    <img src="/send_rbax_to_a_friend.png" alt="Send Rbax to a Friend" />
                </div>

                <div className={styles.leaderboardContainer}>
                    <LeaderBoard />
                </div>
            </div>
            <Footer />
        </div>
        {!isUserLoginNotificationsEmpty && <NotificationPopup
            isOpen={userLoginNotifications.length > 0}
            notification={userLoginNotifications[0]}
            onConfirm={(notification) => {
                removeLoginNotification(notification);
            }}
        />}
        {isUserLoginNotificationsEmpty && !isNotificationsEmpty && <NotificationPopup
            isOpen={notifications.length > 0}
            notification={notifications[0]}
            onConfirm={(notification) => {
                removeNotification(notification);
            }}
        />}
    </>);
};
