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

export const selectSoundToPlay = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.soundToPlay;
    }
)

export const selectSoundPlayerCounter = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.soundPlayerCounter;
    }
)

export const selectShouldStopAllSounds = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.shouldStopAllSounds;
    }
)

export const selectSoundDuration = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.duration;
    }
)

export const selectMatrixBlinkCounter = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.matrixBlinkCounter;
    }
)

export const selectAppError = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.error;
    }
)

export const selectClickIdParam = createSelector(
    selectGame,
    (queryState) => {
        return queryState?.clickIdParam;
    }
)
