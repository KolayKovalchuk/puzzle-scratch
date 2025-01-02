
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { INotification } from '@models/Notification.model';
import { selectLocalValue, selectLocalValueWithLink } from '@store/selectors/localization.selectors';
import { useSelector } from 'react-redux';
import { NotificationConfig } from './NotificationConfig.tsx';
import { useCallback } from 'react';

export interface INotificationPopupProps {
    onConfirm?: (notification: INotification) => void;
    isOpen: boolean;
    notification: INotification;
}

export function NotificationPopup({ isOpen, notification, onConfirm }: INotificationPopupProps) {
    const notificationConfig = NotificationConfig[notification.type];

    const titleText = useSelector(selectLocalValue(notificationConfig?.title))
    const content = useSelector(selectLocalValue(notificationConfig?.content || ''))
    const agreeBtnText = useSelector(selectLocalValue(notificationConfig?.agreeBtn))

    const declineBtnConfig = useSelector(selectLocalValueWithLink(notificationConfig?.declineBtn || ''))
    
    if (!notificationConfig) {
        return null;
    }

    const onClose = () => {
        
    }

    const onConfirmCB = async () => {
        onConfirm && onConfirm(notification);
        notificationConfig.agreeCallback && await notificationConfig.agreeCallback(notification);
    }

    const renderBody = useCallback(() => {
        if (notificationConfig.content){
            return <div>{content}</div>;
        }

        if (notificationConfig.renderChildren) {
            return notificationConfig.renderChildren(notification.data);
        }

        return 
    }, [notificationConfig, content, notification.data])

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
            {renderBody()}
        </ModalDialog>
    );
};
