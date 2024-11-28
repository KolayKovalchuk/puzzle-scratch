export interface ICardData {
    matrix: (number | string)[][];
    winAmount: number;
}

export interface IBuyBatchCardData<CardData extends ICardData = ICardData> {
    winning: number;
    cardData: CardData;
    batchId: string;
    rbaxBalance: number;
    rbaxBalanceBefore: number;
    winType: string;
}
