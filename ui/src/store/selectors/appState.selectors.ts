import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Selector
export const selectGame = (state: RootState) => {
    return state.game;
}

export const selectLastAmountChange = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.lastAmountChange;
    }
)

export const selectPrizeLabelCounter = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.prizeLabelCounter;
    }
)
