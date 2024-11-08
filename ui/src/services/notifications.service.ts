import { INotification } from '@models/Notification.model';
import { updateUserNotifications } from '@store/actions/user.actions';
import { selectUserNotifications } from '@store/selectors/user.selectors';
import store from '@store/store';
import { useSelector } from 'react-redux';

export function useShowNotificationsPopups(): [INotification[], (notification: INotification) => void] {
    const notifications = useSelector(selectUserNotifications);

    const removeNotification = (notification: INotification) => {

        const notificationIndex = notifications.indexOf(notification);
        if (notificationIndex > -1) {
            const updatedUserNotifications = notifications.filter(n => n !== notification);
            
            store.dispatch(updateUserNotifications(updatedUserNotifications));
        }
    }

    return [ notifications, removeNotification ];
}