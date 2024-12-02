import { INotification, Notification } from '@models/Notification.model';
import { apiClient } from './api.service';
import { useEffect, useState } from 'react';

export async function getNotifications(): Promise<Notification[] | null> {
    try {
        const response = await apiClient.get('/notifications');
        const referralData = response.data.map((notification: any) => new Notification(notification));

        return referralData;
    } catch (error) {
        console.error('Error creating share link code:', error);
        return null
    }
}


export function useGetNotifications() {
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        async function fetchNotifications() {
            setIsLoading(true);
            const result = await getNotifications();

            if (result) {
                setNotifications(result);
            }

            setIsLoading(false);
        }

        fetchNotifications();
    }, []);

    const removeNotification = (notification: INotification) => {
        setNotifications(notifications.filter(n => n.createdAt !== notification.createdAt));
    }

    return {
        isLoading,
        notifications,
        removeNotification,
    }
}