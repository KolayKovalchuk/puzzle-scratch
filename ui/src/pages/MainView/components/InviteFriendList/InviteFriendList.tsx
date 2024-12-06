import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { StyledHeader } from '@components/shared/StyledHeader';
import { RegularStyledText } from '@components/shared/StyledText';
import { getReferralLink } from '@services/api/links.service';
import { shareLinkToFriends } from '@services/telegramWebApp/telegramWebApp.service';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@components/shared/Icon';

import styles from './InviteFriendList.module.scss';

import header_projectors_light from '@icons/header_projectors_light.svg'
import invite_friends_coins_heder from '@icons/invite_friends_coins_heder.svg'
import { useGetUserReferrals } from '@services/api/referrals.service';
import { Button, ButtonType } from '@components/shared/Button/Button';

export interface InviteFriendListProps {
    className?: string;
    onCloseClick: () => void;
}

export function InviteFriendList({ className, onCloseClick }: InviteFriendListProps) {
    const shareLinkText = useSelector(selectLocalValue('txt.invite.msg'))
    const inviteFriendBtnText = useSelector(selectLocalValue('txt.btn.invitef'))
    const copyLinkBtnText = useSelector(selectLocalValue('txt.invite.link'))
    const invitedFriendsText = useSelector(selectLocalValue('txt.invite.invited'))

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

    const { referrals, isLoading } = useGetUserReferrals({ page: 0, size: 10 });


    const noInvitetFriendsTxt = useSelector(selectLocalValue('txt.invite.noInvitedFriendsYet'));
    const loadingTxt = useSelector(selectLocalValue('txt.loading'));
    const btnCloseTxt = useSelector(selectLocalValue('txt.btn.close'));

    if (!referrals.length) {
        referrals.push({ nickname: isLoading ? loadingTxt : noInvitetFriendsTxt });
    }

    return (<>
        <div className={`${styles.container} ${className}`}>
            <div className={styles.bodyHeader}>
                <Icon name={header_projectors_light} className={styles.projectorsIcon} />
                <Icon name={invite_friends_coins_heder} className={styles.projectorsIcon} />
                <div onClick={() => onInviteClicked()}>
                    <RegularStyledText
                        className={styles.inviteFriends}
                        text={inviteFriendBtnText}
                        isUnderline={true}
                        textStyles={{ fontSize: 28 }}
                    />
                </div>
                <br></br>
                <div onClick={() => onCopyClicked()}>
                    <RegularStyledText
                        className={styles.copyLink}
                        text={copyLinkBtnText}
                        isUnderline={true}
                        textStyles={{ fontSize: 28 }}
                    />
                </div>
            </div>

            <StyledHeader title={invitedFriendsText} className={styles.invitedFriendHeader} noWings>
                <div className={styles.invitedFriendList}>
                    {
                        referrals.map((referral, index) => (
                            <div key={index} className={styles.refferalRow}>
                                <div className={styles.cell}>{index + 1}</div>
                                <div className={styles.cell}>{referral.nickname}</div>
                            </div>
                        ))
                    }
                </div>
            </StyledHeader>

            <Button className={styles.closeBtn} text={btnCloseTxt} mode={ButtonType.Cancel} onClick={() => onCloseClick()}/>
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