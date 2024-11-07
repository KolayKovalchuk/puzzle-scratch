export class LeaderboardEntry {
    constructor(data: LeaderboardEntry) {
        this.position = data.position;
        this.username = data.username;
        this.totalWinning = data.totalWinning;
    }

    position: number;
    username: string;
    totalWinning: number;
}

export class LeaderboardData {
    constructor(data: LeaderboardData) {
        this.daily = data.daily;
        this.weekly = data.weekly;
        this.monthly = data.monthly;
    }

    daily: LeaderboardEntry[];
    weekly: LeaderboardEntry[];
    monthly: LeaderboardEntry[];
}