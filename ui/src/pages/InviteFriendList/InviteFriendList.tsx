import { ITextStyle } from 'pixi.js-legacy';
import { useSelector } from 'react-redux';

import styles from './InviteFriendList.module.scss';

import { Footer } from '@components/Footer/Footer';
import { BackButton } from '@components/shared/Button/BackButton';
import { Button, ButtonType, defaultBtnYShift } from '@components/shared/Button/Button';
import { CopyButton } from '@components/shared/Button/CopyButton';
import { useButtonConfig } from '@components/shared/Button/hooks/useButtonConfig';
import { Icon } from '@components/shared/Icon';
import { RegularStyledText, SecondaryStyledText } from '@components/shared/StyledText';
import { useScrollTo } from '@hooks/useScrollTo';
import { getReferralLink } from '@services/api/links.service';
import { shareLinkToFriends } from '@services/telegramWebApp/telegramWebApp.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { selectUserPreferredLocale } from '@store/selectors/user.selectors';
import { useEffect, useState } from 'react';
import { InvitedFriendsTable } from './components/InvitedFriendsTable/InvitedFriendsTable';

import invite_friend_icon from '@icons/invite_friend_icon.svg';
import invite_friends_coins_header from '@icons/invite_friends_coins_header.svg';

export interface InviteFriendListProps {
    className?: string;
    // onCloseClick: () => void;
}

const headerLabelStyles: Partial<ITextStyle> = {
    fontWeight: 'bold',
    fontSize: 46,
}

function useFixForHindiLocale() {
    const hindiBtnYShift = defaultBtnYShift;
    const initialBtnYShift = 0.45;

    const userLocale = useSelector(selectUserPreferredLocale);
    const [yShift, setYShift] = useState(initialBtnYShift);

    useEffect(() => {
        const isHindiLocale = userLocale?.toLowerCase() === 'hi';
        if (isHindiLocale) {
            setYShift(hindiBtnYShift);
        } else {
            setYShift(initialBtnYShift);
        }

    }, [
        userLocale,
        initialBtnYShift,
        hindiBtnYShift,
    ]);

    return {
        yShift,
    };
}

export function InviteFriendList({ className }: InviteFriendListProps) {
    const shareLinkText = useSelector(selectLocalValue('txt.invite.msg'))
    const inviteFriendBtnText = useSelector(selectLocalValue('txt.btn.inviteFriends'))

    const { textStyles } = useButtonConfig(ButtonType.Confirm, styles);
    textStyles.fill = 'white';
    textStyles.strokeThickness = 3;
    textStyles.letterSpacing = 2;
    textStyles.fontSize = 24;

    const { targetRef } = useScrollTo();
    const { yShift } = useFixForHindiLocale();

    const onInviteClicked = async () => {
        const url = getReferralLink();

        if (!url) return

        shareLinkToFriends(shareLinkText, url);
    }

    return (<>
        <div className={`${styles.container} ${className}`} ref={targetRef}>
            <div className={styles.headerContainer}>
                <BackButton className={styles.backButton}/>

                <SecondaryStyledText
                    text={inviteFriendBtnText}
                    className={styles.headerText}
                    textStyles={headerLabelStyles}
                    shouldFitVertically={false}
                ></SecondaryStyledText>
            </div>

            <div className={styles.body}>

                <Icon name={invite_friends_coins_header} className={styles.headerBgIcon} />

                <div className={styles.bodyHeader}>
                    <Button
                        className={`${styles.btn} ${styles.inviteFriendsBtn}`}
                        text={inviteFriendBtnText}
                        mode={ButtonType.Confirm}
                        onClick={() => onInviteClicked()}
                        is3d={true}
                    >
                        <div className={styles.btnContent}>
                            <RegularStyledText
                                className={styles.btnText}
                                textStyles={textStyles}
                                text={inviteFriendBtnText}
                                yShift={yShift}
                            />
                            <Icon name={invite_friend_icon} className={styles.inviteFriendIcon} />
                        </div>
                    </Button>
                    <CopyButton className={`${styles.btn} ${styles.copyBtn}`} getCopyValue={getReferralLink} is3d/>
                </div>
                <div className={styles.tableContainer}>
                    <InvitedFriendsTable className={styles.table}/>
                </div>
                <Footer />
            </div>
        </div>
    </>);
}