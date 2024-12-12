export class AppConfig {
    API_URL: string;
    TELEGRAM_BOT_URL: string;
    TELEGRAM_APP_URL: string;
    TELEGRAM_APP_DOMAIN: string;
    LOCALISATION: string;
    BOT_LOCALISATION: string;
    SCRATCH_CARD_TRANSITION_TIMEOUT_MS: number;
    SPLASH_SCREEN_TIMEOUT_MS: number;
    MAINTENANCE: boolean;
    AFFILIATE_BONUS: number;
    SYSTEM_MSG: string | null;
    SYSTEM_MSG_ONE_TIME: boolean;
    DAILY_BONUS: number[];
    FRIENDS_BONUS: FriendsBonus;
    SEND_RBAX: SendRbax;

    constructor(data: AppConfig) {
        this.API_URL = data.API_URL;
        this.TELEGRAM_BOT_URL = data.TELEGRAM_BOT_URL;
        this.TELEGRAM_APP_URL = data.TELEGRAM_APP_URL;
        this.TELEGRAM_APP_DOMAIN = data.TELEGRAM_APP_DOMAIN;
        this.LOCALISATION = data.LOCALISATION;
        this.BOT_LOCALISATION = data.BOT_LOCALISATION;
        this.SCRATCH_CARD_TRANSITION_TIMEOUT_MS = data.SCRATCH_CARD_TRANSITION_TIMEOUT_MS;
        this.SPLASH_SCREEN_TIMEOUT_MS = data.SPLASH_SCREEN_TIMEOUT_MS;
        this.MAINTENANCE = !!data.MAINTENANCE;
        this.AFFILIATE_BONUS = data.AFFILIATE_BONUS;
        this.SYSTEM_MSG = data.SYSTEM_MSG;
        this.SYSTEM_MSG_ONE_TIME = data.SYSTEM_MSG_ONE_TIME;
        this.DAILY_BONUS = data.DAILY_BONUS;
        this.FRIENDS_BONUS = new FriendsBonus(data.FRIENDS_BONUS);
        this.SEND_RBAX = new SendRbax(data.SEND_RBAX);
    }
}

export class FriendsBonus {
    FRIENDS_TO_INVITE: number;
    RBAX: number;

    constructor(data: FriendsBonus) {
        this.FRIENDS_TO_INVITE = data.FRIENDS_TO_INVITE;
        this.RBAX = data.RBAX;
    }
}

export class SendRbax {
    RBAX: number;
    MAX_RBAX_PER_USER_DAILY: number;
    EXPIRATION_MS: number;
    MAX_USES: number;

    constructor(data: SendRbax) {
        this.RBAX = data.RBAX;
        this.MAX_RBAX_PER_USER_DAILY = data.MAX_RBAX_PER_USER_DAILY;
        this.EXPIRATION_MS = data.EXPIRATION_MS;
        this.MAX_USES = data.MAX_USES;
    }
}

export const linkCodeParam = 'linkCode';
export const refCodeParam = 'refCode';
