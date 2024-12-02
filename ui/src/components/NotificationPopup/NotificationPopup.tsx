
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { INotification } from '@models/Notification.model';
import { selectLocalValue, selectLocalValueWithLinkConfig, selectLocalValueWithLinkHTML } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';
import { NotificationConfig } from './NotificationConfig.tsx';

export interface INotificationPopupProps {
    onConfirm?: (notification: INotification) => void;
    isOpen: boolean;
    notification: INotification;
}

export function NotificationPopup({ isOpen, notification, onConfirm }: INotificationPopupProps) {
    const notificationConfig = NotificationConfig[notification.type];

    const titleText = useSelector(selectLocalValue(notificationConfig?.title))
    const content = useSelector(selectLocalValueWithLinkHTML(notificationConfig?.content || ''))
    const agreeBtnText = useSelector(selectLocalValue(notificationConfig?.agreeBtn))

    const declineBtnConfig = useSelector(selectLocalValueWithLinkConfig(notificationConfig?.declineBtn || ''))
    
    if (!notificationConfig) {
        return null;
    }

    const onClose = () => {
        
    }

    const onConfirmCB = async () => {
        onConfirm && onConfirm(notification);
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
            {notificationConfig.content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : notificationConfig.children}
        </ModalDialog>
    );
};
