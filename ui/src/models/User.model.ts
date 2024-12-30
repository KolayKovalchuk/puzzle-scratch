import { INotification, Notification } from './Notification.model';

export interface IUserBalance {
    total: number;
    withdrawable: number;
}

export interface IUser {
    id: number;
    username: string;
    balance: IUserBalance;
    lastLoginTs: number;
    preferredLocale: string;
    authToken: string;
    authTokenExpiresInMs: number;
    acceptedTerms: boolean;
    refCode: string;
    notifications: INotification[];
    avatar: string;
}

export class User implements IUser {
    id: number;
    username: string;
    balance: IUserBalance;
    lastLoginTs: number;
    preferredLocale: string;
    authToken: string;
    authTokenExpiresInMs: number;
    acceptedTerms: boolean;
    refCode: string;
    notifications: Notification[];
    avatar: string;

    constructor(data: IUser) {
        this.id = data.id;
        this.username = data.username;
        this.balance = data.balance;
        this.lastLoginTs = data.lastLoginTs;
        this.preferredLocale = data.preferredLocale;
        this.authToken = data.authToken;
        this.authTokenExpiresInMs = data.authTokenExpiresInMs;
        this.acceptedTerms = data.acceptedTerms;
        this.refCode = data.refCode;
        this.notifications = data.notifications.map(notification => new Notification(notification));
        this.avatar = data.avatar;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            balance: this.balance,
            lastLoginTs: this.lastLoginTs,
            preferredLocale: this.preferredLocale,
            authToken: this.authToken,
            authTokenExpiresInMs: this.authTokenExpiresInMs,
            acceptedTerms: this.acceptedTerms,
            refCode: this.refCode,
            notifications: this.notifications.map(notification => notification.toJSON()),
            avatar: this.avatar,
        };
    }
}