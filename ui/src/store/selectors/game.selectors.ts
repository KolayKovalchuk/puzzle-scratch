import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Selector
export const selectGame = (state: RootState) => {
    return state.game;
}

export const selectLastWin = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.lastWin;
    }
)
