
import ModalDialog from '@components/shared/ModalDialog/ModalDialog';
import { INotification } from '@models/Notification.model';
import { selectLocalValue, selectLocalValueWithLink } from '@store/selectors/localization.selectors';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NotificationConfig, NotificationConfigItem } from './NotificationConfig.tsx';

export interface INotificationPopupProps {
    onConfirm?: (notification: INotification) => void;
    onClose?: (notification: INotification) => void;
    isOpen: boolean;
    notification: INotification;
}

export function NotificationPopup({ isOpen, notification, onConfirm, onClose }: INotificationPopupProps) {
    const [notificationConfig, setNotificationConfig] = useState<NotificationConfigItem>(NotificationConfig[notification.type]);

    useEffect(() => {
        setNotificationConfig(NotificationConfig[notification.type]);
    }, [notification.type])

    const titleText = useSelector(selectLocalValue(notificationConfig?.title))
    const content = useSelector(selectLocalValue(notificationConfig?.content || ''))
    const agreeBtnText = useSelector(selectLocalValue(notificationConfig?.agreeBtn || ''))

    const declineBtnConfig = useSelector(selectLocalValueWithLink(notificationConfig?.declineBtn || ''))
    
    if (!notificationConfig) {
        return null;
    }

    const onCloseCb = () => {
        onClose && onClose(notification);
        notificationConfig.declineCallback && notificationConfig.declineCallback(notification);
    }

    const onConfirmCB = async () => {
        const isAgreed = notificationConfig.agreeCallback && await notificationConfig.agreeCallback(notification, setNotificationConfig);
        if (!notificationConfig.agreeCallback || isAgreed) {
            onConfirm && onConfirm(notification);
        }
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
            onClose={() => onCloseCb()}
            onConfirm={() => onConfirmCB()}
            confirmText={agreeBtnText}
            cancelText={declineBtnConfig.linkText}
        >
            {renderBody()}
        </ModalDialog>
    );
};
