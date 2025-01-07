import { ICardData } from '@models/IBuyBatchCardData';

export interface IIceBoxCardData extends ICardData {
    bonus: number[];
    x2: number;
    x5: number;
}