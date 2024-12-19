import { INotification, NotificationType } from '@models/Notification.model';
import { updateUserNotifications } from '@store/actions/user.actions';
import { selectUserNotifications } from '@store/selectors/user.selectors';
import store from '@store/store';
import { useSelector } from 'react-redux';

export function useShowLoginNotificationsPopups(): [INotification[], (notification: INotification) => void] {
    const notifications = useSelector(selectUserNotifications);

    const removeNotification = (notification: INotification) => {

        const notificationIndex = notifications.indexOf(notification);
        if (notificationIndex > -1) {
            const updatedUserNotifications = notifications.filter(n => n !== notification);
            
            store.dispatch(updateUserNotifications(updatedUserNotifications));
        }
    }

    return [ [
        {
            "type": NotificationType.RBAX_GIFT_AVAILABLE,
            "message": '',
            "createdAt": 1734606600692,
            "linkCode": "lQgrATTzDwUskXH",
        }
    ], removeNotification ];
}