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

export const selectUserName = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.username
    }
)

export const selectUserAvatar = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.avatar
    }
)

export const selectUserAcceptedTerms = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.acceptedTerms
    }
)

export const selectUserPreferredLocale = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.preferredLocale
    }
)

export const selectUserToken = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.authToken
    }
)

export const selectUserRefCode = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.refCode
    }
)

export const selectUserBalanceTotal = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.balance?.total
    }
)

export const selectUserBalanceWithdrawable = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.balance?.withdrawable
    }
)

export const selectUserNotifications = createSelector(
    selectUser,
    (queryState) => {
        const notifications = queryState?.notifications || []
        return notifications;
    }
)

export const selectIsQaUser = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.qa
    }
)

export const selectUserClickId = createSelector(
    selectUser,
    (queryState) => {
        return queryState?.clickId
    }
)
