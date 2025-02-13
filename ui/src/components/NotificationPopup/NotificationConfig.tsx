import { IAffLinkAvailableData, IDaylyBonusData, IDepositSuccessData, INotification, NotificationData, NotificationType } from '@models/Notification.model';
import { updateUserBalance } from '@services/api/balance.service';
import { postCollectAffiliateBonus, postCollectDailyGift, postCollectEmojiBonus, postCollectGiftBonus, postCollectRefferalGift } from '@services/api/bonus.service';
import { updateUserBalanceWithChangeAnimation } from '@store/actions/user.actions';
import store from '@store/store';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { AffLinkAvailableBody } from './components/AffLinkAvailable/AffLinkAvailable';
import { DailyBonusNotificationBody } from './components/DailyBonusNotificationBody/DailyBonusNotificationBody';
import { OnePerXGiftBody } from './components/OnePerXGiftBody/OnePerXGiftBody';
import { SuccessDepositBody } from './components/SuccessDepositBody/SuccessDepositBody';
import { TooManyGifts } from './components/TooManyGiftsBody/TooManyGiftsBody';


export interface NotificationConfigItem {
    title: string;
    content?: string;
    renderChildren?: (notificationData: NotificationData) => ReactNode;
    agreeBtn?: string;
    agreeCallback?: (notification: INotification, setNotificationConfig: Dispatch<SetStateAction<NotificationConfigItem>>) => void | Promise<any>;
    declineBtn?: string;
    declineCallback?: (notification: INotification) => void | Promise<any>;
}

export interface NotificationConfig {
    [key: string]: NotificationConfigItem;
}

export const NotificationConfig: NotificationConfig = {
    [NotificationType.DAILY_BONUS]: {
        title: 'txt.dailybonus.title',
        renderChildren: (data) => <DailyBonusNotificationBody data={data as IDaylyBonusData} />,
        agreeBtn: 'txt.btn.collect',
        agreeCallback: async () => {
            const response = await postCollectDailyGift();

            if (response?.newBalance) {
                console.log('Dayily bonus gift collected successfully:', response);
                store.dispatch(updateUserBalanceWithChangeAnimation({ total: response.newBalance }, response.amount));
            } else {
                // TODO: handle error
            }

            return true;
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
                store.dispatch(updateUserBalanceWithChangeAnimation({ total: response.newBalance }, response.amount));
            } else {
                // TODO: handle error
            }

            return response;
        },
    },
    [NotificationType.EMOJI_BONUS]: {
        title: 'text.gift.rbaxGift',
        content: 'txt.emojiBonus.content',
        agreeBtn: 'txt.btn.collect',
        agreeCallback: async () => {
            const response = await postCollectEmojiBonus();

            if (response?.newBalance) {
                console.log('Emoji bonus collected successfully:', response);
                store.dispatch(updateUserBalanceWithChangeAnimation({ total: response.newBalance }, response.amount));
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
                store.dispatch(updateUserBalanceWithChangeAnimation({ total: response.newBalance }, response.amount));
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
        renderChildren: () => <TooManyGifts />,
        agreeBtn: 'txt.btn.ok',
    },
    [NotificationType.RBAX_GIFT_1_PER_X]: {
        title: 'text.gift.rbaxgift',
        renderChildren: () => <OnePerXGiftBody />,
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


    [NotificationType.DEPOSIT]: {
        title: 'txt.transfer.popup.success.title',
        renderChildren: (data) => <SuccessDepositBody notificationData={data as IDepositSuccessData} />,
        agreeBtn: 'txt.btn.ok',
        agreeCallback: async () => {
            return await updateUserBalance();
        },
    },



    [NotificationType.AFF_LINK_AVAILABLE]: {
        title: 'txt.affpop.title',
        renderChildren: (data) => <AffLinkAvailableBody notificationData={data as IAffLinkAvailableData} />,
        agreeBtn: 'txt.btn.collect',
        agreeCallback: async (notification: INotification, setNotificationConfig: Dispatch<SetStateAction<NotificationConfigItem>>) => {
            const response = await postCollectAffiliateBonus(notification.linkCode);

            if (response?.newBalance) {
                console.log('Affiliate bonus collected successfully:', response);
                store.dispatch(updateUserBalanceWithChangeAnimation({ total: response.newBalance }, response.amount));
            } else if (response?.collectLinkErrorStatus === NotificationType.RBAX_GIFT_EXPIRED) {
                setNotificationConfig(NotificationConfig[NotificationType.RBAX_GIFT_EXPIRED]);
                return false;
            } else {
                // TODO: handle error
            }

            return response;
        },
    },

    [NotificationType.AFF_LINK_TO_MANY]: {
        title: 'txt.affpop.title',
        content: 'txt.affiliate.fail',
        declineBtn: 'txt.btn.close',
    },
};
