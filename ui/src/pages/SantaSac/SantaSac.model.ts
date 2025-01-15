import { ICardData } from '@models/IBuyBatchCardData';

export interface IItemPrizes {
    [key: number]: number;
}

export interface ISantaSacCardData extends ICardData {
    multi: number;
}