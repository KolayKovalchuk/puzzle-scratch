export class User {
    id: number;
    username: string;
    balance: {
        rbax: number;
        ton: number;
    };
    lastLoginTs: number;
    preferredLocale: string;
    authToken: string;
    authTokenExpiresInMs: number;
    acceptedTerms: boolean;

    constructor(data: User) {
        this.id = data.id;
        this.username = data.username;
        this.balance = data.balance;
        this.lastLoginTs = data.lastLoginTs;
        this.preferredLocale = data.preferredLocale;
        this.authToken = data.authToken;
        this.authTokenExpiresInMs = data.authTokenExpiresInMs;
        this.acceptedTerms = data.acceptedTerms;
    }
}