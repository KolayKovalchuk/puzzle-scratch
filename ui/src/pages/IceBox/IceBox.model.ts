import { ICardData } from '@models/IBuyBatchCardData';

export interface IIceBoxCardData extends ICardData {
    winningNumbers: number[];
    bonus: number[];
    multi: number[];
}