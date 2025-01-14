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
