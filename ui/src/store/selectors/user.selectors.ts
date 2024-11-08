import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Selector
export const selectUser = (state: RootState) => {
    return state.user?.user;
}

export const selectPreferredLocale = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.preferredLocale
    }
)

export const selectUserAcceptedTerms = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.acceptedTerms
    }
)

export const selectUserToken = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.authToken
    }
)

export const selectUserBalanceTon = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.balance?.ton
    }
)

export const selectUserBalanceRbax = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.balance?.rbax
    }
)

export const selectUserNotifications = createSelector(
    selectUser,
    (queryState) => {
        const notifications = queryState?.notifications || []
        return notifications;
    }
)
