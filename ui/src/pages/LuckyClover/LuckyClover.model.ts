import { ICardData } from '@models/IBuyBatchCardData';

export interface ILuckyCloverCardData extends ICardData {
    win: number;
    winSum: number;
    clovers: number;
    winningLine: string[];
}