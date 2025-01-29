export interface IRecentGame {
    cardType: string;
    batchName: string;
    datePlayed: number;
    prizeWon: number;
}

export interface IUserStats {
    totalCardsPlayed: number;
    totalRbaxWon: number;
    biggestWin: number;
    recentGames: IRecentGame[];
}

export class UserStats implements IUserStats {
    totalCardsPlayed: number;
    totalRbaxWon: number;
    biggestWin: number;
    recentGames: IRecentGame[];

    constructor(data: IUserStats) {
        this.totalCardsPlayed = data.totalCardsPlayed;
        this.totalRbaxWon = data.totalRbaxWon;
        this.biggestWin = data.biggestWin;
        this.recentGames = data.recentGames;
    }

    toJSON() {
        return {
            totalCardsPlayed: this.totalCardsPlayed,
            totalRbaxWon: this.totalRbaxWon,
            biggestWin: this.biggestWin,
            recentGames: this.recentGames
        };
    }
}
