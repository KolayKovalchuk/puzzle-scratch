import { BatchCard, BatchCardType } from '@src/models/BatchCard.model';

export const START_PUZZLE_GAME = 'START_PUZZLE_GAME';

// TODO: move to models
export interface IStartPuzzleGamePayload {
    cardType: BatchCardType;
    batchId: string;
}

export const startPuzzleGame = (payload: BatchCard) => ({
    type: START_PUZZLE_GAME,
    payload,
});