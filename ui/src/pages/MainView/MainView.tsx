import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BatchCardContainer } from '@components/BatchCard';
import { Footer } from '@components/Footer/Footer';
import { NotificationPopup } from '@components/NotificationPopup/NotificationPopup';

import { getAppLinkWithParam, linkCodeParam, postCreateShareLinkCode } from '@services/api/links.service';
import { useGetNotifications } from '@services/api/notificationAPI.service';
import { useShowLoginNotificationsPopups } from '@services/loginNotifications.service';
import { shareLinkToFriends } from '@services/telegramWebApp/telegramWebApp.service';

import { selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { selectPreferredLocale, selectUserName } from '@store/selectors/user.selectors';


import { LeaderBoard } from './components/LeaderBoard/LeaderBoard';
import { LogoHeader } from './components/LogoHeader/LogoHeader';

import { ROUTES } from '@routers/routerConfig';

import styles from './MainView.module.scss';

export function MainView() {
    const userName = useSelector(selectUserName);
    const shareLinkText = useSelector(selectLocalValueWithVars('txt.gift.msg', userName || ''));
    const [userLoginNotifications, removeLoginNotification] = useShowLoginNotificationsPopups();

    const navigate = useNavigate()

    const onInviteClicked = useCallback(() => {
        navigate(ROUTES.InviteFriends);
    }, []);

    const onSendRbaxClicked = useCallback(async () => {
        const linkCode = await postCreateShareLinkCode();

        if (!linkCode) {
            return;
        }

        const url = getAppLinkWithParam(linkCode, linkCodeParam);
        shareLinkToFriends(shareLinkText, url);
    }, [shareLinkText]);

    const containerClassName = `${styles.container}`;

    const { notifications, removeNotification } = useGetNotifications();

    const isUserLoginNotificationsEmpty = userLoginNotifications.length === 0;
    const isNotificationsEmpty = notifications.length === 0;
    const preferredLocale = useSelector(selectPreferredLocale);
    const inviteFriendImgName = `mainView/invite_friend_bunner_${preferredLocale?.toLocaleLowerCase()}.png`;
    const sendRbaxImgName = `mainView/send_rbax_to_a_friend_${preferredLocale?.toLocaleLowerCase()}.png`;

    return (<>
        <div className={styles.mainContainer}>
            <div className={containerClassName}>
                <LogoHeader className={styles.logoHeader}></LogoHeader>
                <BatchCardContainer></BatchCardContainer>


                <div className={styles.banner} onClick={() => onInviteClicked()}>
                    <img src={inviteFriendImgName} alt="Invite Friend" />
                </div>
                <div className={styles.banner} onClick={() => onSendRbaxClicked()}>
                    <img src={sendRbaxImgName} alt="Send Rbax to a Friend" />
                </div>

                <div className={styles.leaderboardContainer}>
                    <LeaderBoard />
                </div>
            </div>
            <Footer className={styles.footer} />
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
