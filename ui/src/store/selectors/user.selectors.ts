import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Selector
export const selectUser = (state: RootState) => {
    return state.user?.user;
}

export const preferredLocaleSelector = createSelector(
    selectUser,
    (queryState) => queryState?.preferredLocale
)
