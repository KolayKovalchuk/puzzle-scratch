import { useCallback, useEffect, useState } from 'react';

import { INotification, Notification } from '@models/Notification.model';
import { apiClient } from './api.service';

export async function getNotifications(): Promise<Notification[] | null> {
    try {
        const response = await apiClient.get('/notifications');
        const referralData = response.data.map((notification: any) => new Notification(notification));

        return referralData;
        // return [];
    } catch (error) {
        console.error('Error creating share link code:', error);
        return null
    }
}

export interface IGetNotificationResponse {
    isLoading: boolean;
    notifications: Notification[];
    removeNotification: (notification: INotification) => void
}

export function useGetNotifications(): IGetNotificationResponse  {
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

    const removeNotification = useCallback((notification: INotification) => {
        setNotifications(notifications.filter(n => n !== notification));
    }, [notifications]);

    return {
        isLoading,
        notifications,
        removeNotification,
    }
}