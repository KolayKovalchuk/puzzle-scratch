import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Selector
export const selectGame = (state: RootState) => {
    return state.game;
}

export const selectLastAmountIncrease = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.lastAmountIncrease;
    }
)

export const selectPrizeLabelCounter = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.prizeLabelCounter;
    }
)

export const selectIsMainLoaderOpen = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.isMainLoaderOpen;
    }
)

export const selectIsModalDialogOpen = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.isModalDialogOpen;
    }
)
