import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Selector
export const selectGame = (state: RootState) => {
    return state.game;
}

export const selectGameBatch = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.batchCard
    }
)

export const selectGameBatchId = createSelector(
    selectGameBatch,
    (queryState) => {
        return queryState?.batchId
    }
)

export const selectGameCardType = createSelector(
    selectGameBatch,
    (queryState) => {
        return queryState?.cardType
    }
)