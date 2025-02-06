import { INotification } from '@models/Notification.model';
import { updateUserNotifications } from '@store/actions/user.actions';
import { selectUserNotifications } from '@store/selectors/user.selectors';
import store from '@store/store';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export function useShowLoginNotificationsPopups(): [INotification[], (notification: INotification) => void] {
    const notifications = useSelector(selectUserNotifications);

    const removeNotification = useCallback((notification: INotification) => {

        const notificationIndex = notifications.indexOf(notification);
        if (notificationIndex > -1) {
            const updatedUserNotifications = notifications.filter(n => n !== notification);
            
            store.dispatch(updateUserNotifications(updatedUserNotifications));
        }
    }, [notifications]);

    return [ notifications, removeNotification ];
}