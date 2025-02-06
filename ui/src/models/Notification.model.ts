export enum NotificationType {
    EMOJI_BONUS = 'EMOJI_BONUS',
    REFERRALS_BONUS = 'REFERRALS_BONUS',
    DAILY_BONUS = 'DAILY_BONUS', // daily

    RBAX_GIFT_AVAILABLE = 'RBAX_GIFT_AVAILABLE', // RBAX gift is ready to be collected
    RBAX_GIFT_LINK_COLLECTED = 'RBAX_GIFT_LINK_COLLECTED', // 1. This message will show if the player already collected the gift from the link.
    RBAX_GIFT_TO_MANY = 'RBAX_GIFT_TO_MANY', // 2. here were too many collection of the gift as it might have been sent to many people.
    RBAX_GIFT_1_PER_FRIEND = 'RBAX_GIFT_1_PER_FRIEND', // 4. This message is shown when the friend tries to collect more RBAX from the same friend on same day from different link
    RBAX_GIFT_1_PER_X = 'RBAX_GIFT_1_PER_X', // 3. This message is shown when the user is collecting more than Y gifts a day.
    RBAX_GIFT_EXPIRED = 'RBAX_GIFT_EXPIRED', // link expired

    AFF_LINK_TO_MANY = 'AFF_LINK_TO_MANY', // 1. This message will show if the player already collected the gift from the link.
    AFF_LINK_AVAILABLE = 'AFF_LINK_AVAILABLE', // 1. This message will show if the player already collected the gift from the link.

    DEPOSIT = 'DEPOSIT',
}

export type NotificationData = IDaylyBonusData | IDepositSuccessData | IAffLinkAvailableData;

export interface IDaylyBonusData {
    day: number;
}

export interface IDepositSuccessData {
    rbaxDepositAmount: number;
}

export interface IAffLinkAvailableData {
    bonusAmount: number;
}

export interface INotification<Data = NotificationData> {
    type: NotificationType;
    message: string;
    createdAt: number;
    linkCode: string;
    data: Data;
}

export class Notification<Data = NotificationData> implements INotification<Data> {
    type: NotificationType;
    message: string;
    createdAt: number;
    linkCode: string;
    data: Data

    constructor(data: INotification<Data>) {
        this.type = NotificationType[data.type as unknown as keyof typeof NotificationType];
        this.message = data.message;
        this.createdAt = data.createdAt;
        this.linkCode = data.linkCode;
        this.data = data.data;
    }

    toJSON() {
        return {
            type: this.type,
            message: this.message,
            createdAt: this.createdAt,
            linkCode: this.linkCode,
            data: this.data
        };
    }
}
