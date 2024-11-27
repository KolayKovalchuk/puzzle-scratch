import { ICardData } from '@models/IBuyBatchCardData';

export interface IIceBoxCardData extends ICardData {
    x2: number;
    x5: number;
    winningNumbers: number[];
}