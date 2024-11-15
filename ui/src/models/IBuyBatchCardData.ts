export interface ICardData {
    matrix: string[][];
    winAmount: number;
    isWinningCard: boolean;
}

export interface IBuyBatchCardData {
    winning: number;
    cardData: ICardData;
    batchId: string;
    rbaxBalance: number;
    winType: string;
}

export class CardData implements ICardData {
    matrix: string[][];
    winAmount: number;
    isWinningCard: boolean;

    constructor(matrix: string[][], winAmount: number, isWinningCard: boolean) {
        this.matrix = matrix;
        this.winAmount = winAmount;
        this.isWinningCard = isWinningCard;
    }
}

export class BuyBatchCardData implements IBuyBatchCardData {
    winning: number;
    cardData: ICardData;
    batchId: string;
    rbaxBalance: number;
    winType: string;

    constructor(winning: number, cardData: ICardData, batchId: string, rbaxBalance: number, winType: string) {
        this.winning = winning;
        this.cardData = cardData;
        this.batchId = batchId;
        this.rbaxBalance = rbaxBalance;
        this.winType = winType;
    }
}

const respose =
{
    "winning": 0,
    "cardData": {
        "matrix": [
            [
                "1",
                "7",
                "2",
                "3",
                "8",
                "2"
            ],
            [
                "5",
                "4",
                "6",
                "2",
                "5",
                "2"
            ],
            [
                "3",
                "3",
                "7",
                "6",
                "7",
                "6"
            ],
            [
                "3",
                "3",
                "3",
                "7",
                "6",
                "5"
            ],
            [
                "3",
                "4",
                "7",
                "4",
                "6",
                "4"
            ],
            [
                "3",
                "1",
                "4",
                "w5",
                "8",
                "5"
            ]
        ],
        "winAmount": 0,
        "isWinningCard": false
    },
    "batchId": "c163708f-9967-4b3a-937a-5a335c656c81",
    "rbaxBalance": 1025,
    "winType": "S"
}