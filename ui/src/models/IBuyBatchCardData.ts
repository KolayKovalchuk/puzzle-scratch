export interface ICardData {
    matrix: (number | string | [])[][];
    winAmount: number;
    winningCells?: [number, number][];
}

export enum WinType {
    S = 'S',
    M = 'M',
    B = 'B',
}

export interface IBuyBatchCardData<CardData extends ICardData = ICardData> {
    winning: number;
    cardData: CardData;
    batchId: string;
    rbaxBalance: number;
    rbaxBalanceBefore: number;
    winType: WinType;
}
