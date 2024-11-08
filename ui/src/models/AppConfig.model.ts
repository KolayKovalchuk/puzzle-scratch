export class AppConfig {
    API_URL: string;
    TELEGRAM_APP_URL: string;
    LOCALISATION: string;
    MAINTENANCE: boolean;
    AFFILIATE_BONUS: number;
    SYSTEM_MSG: string | null;
    SYSTEM_MSG_ONE_TIME: boolean;
    DAILY_BONUS: number[];
    FRIENDS_BONUS: FriendsBonus;

    constructor(data: AppConfig) {
        this.API_URL = data.API_URL;
        this.TELEGRAM_APP_URL = data.TELEGRAM_APP_URL;
        this.LOCALISATION = data.LOCALISATION;
        this.MAINTENANCE = !!data.MAINTENANCE;
        this.AFFILIATE_BONUS = data.AFFILIATE_BONUS;
        this.SYSTEM_MSG = data.SYSTEM_MSG;
        this.SYSTEM_MSG_ONE_TIME = data.SYSTEM_MSG_ONE_TIME;
        this.DAILY_BONUS = data.DAILY_BONUS;
        this.FRIENDS_BONUS = new FriendsBonus(data.FRIENDS_BONUS);
    }
}

export class FriendsBonus {
    FRIEND_TO_INVITE: number;
    RBAX: number;

    constructor(data: any) {
        this.FRIEND_TO_INVITE = data.FRIEND_TO_INVITE;
        this.RBAX = data.RBAX;
    }
}