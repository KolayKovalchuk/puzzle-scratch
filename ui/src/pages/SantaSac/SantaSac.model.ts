import { ICardData } from '@models/IBuyBatchCardData';

export interface IItemPrizes {
    [key: number]: number;
}

export interface ISantaSacCardData extends ICardData {
    itemPrizes: IItemPrizes;
    multiplier: number;
    winningItemId: number;
}