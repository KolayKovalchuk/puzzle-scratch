export interface ICardData {
    matrix: (number | string)[][];
    winAmount: number;
    // TODO: Create CandyMazeCardData and SantaSacCardData
    // isWinningCard: boolean;
}

export interface IBuyBatchCardData<CardData extends ICardData = ICardData> {
    winning: number;
    cardData: CardData;
    batchId: string;
    rbaxBalance: number;
    winType: string;
}
