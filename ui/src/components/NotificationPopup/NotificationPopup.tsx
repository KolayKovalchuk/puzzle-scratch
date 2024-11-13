
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { INotification, NotificationType } from '@models/Notification.model';
import { postCollectGiftBonus, postCollectRefferalGift } from '@services/api/bonus.service';
import { updateUserBalanceRbax } from '@store/actions/user.actions';
import { selectLocalValue, selectLocalValueWithLinkConfig, selectLocalValueWithLinkHTML } from '@store/selectors/localization.selectors';
import store from '@store/store';
import { useSelector } from 'react-redux';


export interface INotificationPopupProps {
    onConfirm: (notification: INotification) => void;
    isOpen: boolean;
    notification: INotification;
}

interface NotificationConfigItem {
    title: string;
    content: string;
    agreeBtn: string;
    agreeCallback?: (notification: INotification) => void | Promise<any>;
    declineBtn?: string;
    declineCallback?: (notification: INotification) => void | Promise<any>;
}

interface NotificationConfig {
    [key: string]: NotificationConfigItem;
}

const NotificationConfig: NotificationConfig = {
    [NotificationType.REFERRALS_BONUS]: {
        title: 'text.gift.rbaxGift',
        content: 'txt.btn.friendjoined',
        agreeBtn: 'txt.btn.collect',
        agreeCallback: async () => {
            const response = await postCollectRefferalGift();

            if (response?.newBalance) {
                console.log('Referral gift collected successfully:', response);
                store.dispatch(updateUserBalanceRbax(response.newBalance));
            } else {
                // TODO: handle error
            }

            return response;
        },
    },
    [NotificationType.RBAX_GIFT_AVAILABLE]: {
        title: 'text.gift.rbaxGift',
        content: 'txt.btn.friendgift',
        agreeBtn: 'txt.btn.collect',
        agreeCallback: async (notification: INotification) => {
            const response = await postCollectGiftBonus(notification.linkCode);

            if (response?.success) {
                console.log('Gift collected successfully:', response);
                store.dispatch(updateUserBalanceRbax(response.newBalance));
            } else {
                // TODO: handle error
            }

            return response;
        },
    },
    [NotificationType.RBAX_GIFT_LINK_COLLECTED]: {
        title: 'text.gift.rbaxgift',
        content: 'txt.gift.alreadycollected',
        agreeBtn: 'txt.btn.ok',
    },
    [NotificationType.RBAX_GIFT_TO_MANY]: {
        title: 'text.gift.rbaxgift',
        content: 'txt.limit.reached',
        agreeBtn: 'txt.btn.ok',
    },
    [NotificationType.RBAX_GIFT_1_PER_X]: {
        title: 'text.gift.rbaxgift',
        content: 'txt.limit.collection',
        agreeBtn: 'txt.btn.ok',
    },
    [NotificationType.RBAX_GIFT_1_PER_FRIEND]: {
        title: 'text.gift.rbaxgift',
        content: 'txt.limit.friend',
        agreeBtn: 'txt.btn.ok',
    },
    [NotificationType.RBAX_GIFT_EXPIRED]: {
        title: 'text.gift.rbaxgift',
        content: 'txt.limit.expired',
        agreeBtn: 'txt.btn.ok',
    },
};

export function NotificationPopup({ isOpen, notification, onConfirm }: INotificationPopupProps) {
    const notificationConfig = NotificationConfig[notification.type];

    const titleText = useSelector(selectLocalValue(notificationConfig?.title))
    const content = useSelector(selectLocalValueWithLinkHTML(notificationConfig?.content))
    const agreeBtnText = useSelector(selectLocalValue(notificationConfig?.agreeBtn))

    const declineBtnConfig = useSelector(selectLocalValueWithLinkConfig(notificationConfig?.declineBtn || ''))
    
    if (!notificationConfig) {
        return null;
    }

    const onClose = () => {
        
    }

    const onConfirmCB = async () => {
        onConfirm(notification);
        notificationConfig.agreeCallback && await notificationConfig.agreeCallback(notification);
    }

    return (
        <ModalDialog
            isOpen={isOpen}
            title={titleText}
            content={content}
            onClose={() => onClose()}
            onConfirm={() => onConfirmCB()}
            confirmText={agreeBtnText}
            cancelText={declineBtnConfig.linkText}
        >
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </ModalDialog>
    );
};
