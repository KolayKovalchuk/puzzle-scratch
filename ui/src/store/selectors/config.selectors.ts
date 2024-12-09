import { AppConfig } from '@models/AppConfig.model'
import { createSelector } from '@reduxjs/toolkit'
import { configApi } from '@services/api/apiLogin.service'
import { RootState } from '@store/store'

// Base selector to access the query state
const selectConfigQueryState = (state: RootState) => {
    return state[configApi.reducerPath]
}

const selectConfigQueryCache = createSelector(
    selectConfigQueryState,
    (queryState) => {
        const queryKeyList = Object.keys(queryState.queries)
        
        if (!queryKeyList.length) return null
    
        const queryKey = queryKeyList[queryKeyList.length - 1]
        const config = queryState.queries[queryKey];
        return config;
    }
)

// Selector to get the status of the query
export const selectConfigQueryStatus = createSelector(
    selectConfigQueryCache,
    (queryState) => queryState?.status
)

// Selector to get the error of the query
export const selectConfigQueryError = createSelector(
    selectConfigQueryCache,
    (queryState) => queryState?.error
)

// Selector to get the data of the query
export const selectConfigQueryData = createSelector(
    selectConfigQueryCache,
    (queryState) => queryState?.data as AppConfig | undefined
)

export const selectLocalizationUrl = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.LOCALISATION
    }
)

const VITE_TELEGRAM_APP_URL = import.meta.env.VITE_TELEGRAM_APP_URL

export const selectTelegramAppUrl = createSelector(
    selectConfigQueryData,
    (config) => {
        if (VITE_TELEGRAM_APP_URL) return VITE_TELEGRAM_APP_URL;

        return config?.TELEGRAM_APP_URL
    }
)

export const selectScratchCardTransitionTimeout = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.SCRATCH_CARD_TRANSITION_TIMEOUT_MS || 1500
    }
)

export const selectDailyBonusConfig = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.DAILY_BONUS
    }
)

export const selectSendRBaxAmount = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.SEND_RBAX.RBAX
    }
)

export const selectFriendsBonusConfig = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.FRIENDS_BONUS
    }
)

export const selectFriendToInvite = createSelector(
    selectFriendsBonusConfig,
    (config) => {
        return config?.FRIEND_TO_INVITE
    }
)

export const selectFriendRBax = createSelector(
    selectFriendsBonusConfig,
    (config) => {
        return config?.RBAX
    }
)
