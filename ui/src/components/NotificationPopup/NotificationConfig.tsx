import { INotification, NotificationType } from '@models/Notification.model';
import { postCollectDailyGift, postCollectGiftBonus, postCollectRefferalGift } from '@services/api/bonus.service';
import { updateUserBalanceRbax } from '@store/actions/user.actions';
import store from '@store/store';
import { ReactNode } from 'react';
import { DailyBonusNotificationBody } from './components/DailyBonusNotificationBody/DailyBonusNotificationBody';


export interface NotificationConfigItem {
    title: string;
    content?: string;
    children?: ReactNode;
    agreeBtn: string;
    agreeCallback?: (notification: INotification) => void | Promise<any>;
    declineBtn?: string;
    declineCallback?: (notification: INotification) => void | Promise<any>;
}

export interface NotificationConfig {
    [key: string]: NotificationConfigItem;
}

export const NotificationConfig: NotificationConfig = {
    [NotificationType.DAILY_BONUS]: {
        title: 'txt.dailybonus.title',
        children: <DailyBonusNotificationBody />,
        agreeBtn: 'txt.btn.collect',
        agreeCallback: async () => {
            const response = await postCollectDailyGift();

            if (response?.newBalance) {
                console.log('Dayily bonus gift collected successfully:', response);
                store.dispatch(updateUserBalanceRbax(response.newBalance));
            } else {
                // TODO: handle error
            }

            return response;
        },
    },

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
