
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ITextStyle } from 'pixi.js';
import { useNavigate } from 'react-router-dom';

import styles from './InviteFriendList.module.scss';

import { Icon } from '@components/shared/Icon';
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { getReferralLink } from '@services/api/links.service';
import { shareLinkToFriends } from '@services/telegramWebApp/telegramWebApp.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { Footer } from '@components/Footer/Footer';
import { Button, ButtonType } from '@components/shared/Button/Button';
import { useButtonConfig } from '@components/shared/Button/hooks/useButtonConfig';
import { RegularStyledText, SecondaryStyledText } from '@components/shared/StyledText';
import { useScrollTo } from '@hooks/useScrollTo';
import { InvitedFriendsTable } from './components/InvitedFriendsTable/InvitedFriendsTable';

import back_arrow from '@icons/back_arrow.svg';
import copy_icon from '@icons/copy_icon.svg';
import invite_friend_icon from '@icons/invite_friend_icon.svg';
import invite_friends_coins_header from '@icons/invite_friends_coins_header.svg';

export interface InviteFriendListProps {
    className?: string;
    // onCloseClick: () => void;
}

const headerLabelStyles: Partial<ITextStyle> = {
    fontWeight: 'bold',
    letterSpacing: 2,
    strokeThickness: 2,
    fontSize: 46,
}

export function InviteFriendList({ className }: InviteFriendListProps) {
    const shareLinkText = useSelector(selectLocalValue('txt.invite.msg'))
    const inviteFriendBtnText = useSelector(selectLocalValue('txt.btn.inviteFriends'))
    const btnCloseTxt = useSelector(selectLocalValue('txt.btn.close'));

    const { textStyles } = useButtonConfig(ButtonType.Confirm, styles);
    textStyles.fill = 'white';
    textStyles.strokeThickness = 3;
    textStyles.letterSpacing = 2;

    const { targetRef } = useScrollTo();

    const onInviteClicked = async () => {
        const url = getReferralLink();

        if (!url) return

        shareLinkToFriends(shareLinkText, url);
    }

    const [isSuccessCopiedOpen, setIsSuccessCopiedOpen] = useState(false);
    const successCopiedTitleText = useSelector(selectLocalValue('txt.invite.copied'));
    const successCopiedBtnText = useSelector(selectLocalValue('txt.btn.ok'));

    const onCopyClicked = useCallback(async () => {
        const url = getReferralLink();

        await navigator.clipboard.writeText(url || '')
        setIsSuccessCopiedOpen(true);
    }, []);

    const navigate = useNavigate();
    const onBackBtnClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (<>
        <div className={`${styles.container} ${className}`} ref={targetRef}>
            <div className={styles.header}>
                <Button
                    className={styles.backBtn}
                    mode={ButtonType.Default}
                    onClick={onBackBtnClick}
                    iconName={back_arrow}
                />

                <SecondaryStyledText
                    text={inviteFriendBtnText}
                    className={styles.headerText}
                    textStyles={headerLabelStyles}
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
                            />
                            <Icon name={invite_friend_icon} className={styles.inviteFriendIcon} />
                        </div>
                    </Button>
                    <Button
                        className={styles.btn}
                        iconName={copy_icon}
                        mode={ButtonType.Confirm}
                        onClick={() => onCopyClicked()}
                        is3d={true}
                    >
                    </Button>
                </div>

                <InvitedFriendsTable />

                <div className={styles.footer}>
                    <Button className={styles.closeBtn} text={btnCloseTxt} mode={ButtonType.Cancel} onClick={onBackBtnClick} />
                </div>
            </div>
            <Footer />
        </div>

        <ModalDialog
            isOpen={isSuccessCopiedOpen}
            title={successCopiedTitleText}
            content={''}
            onConfirm={() => setIsSuccessCopiedOpen(false)}
            confirmText={successCopiedBtnText}
        ></ModalDialog>
    </>);
}