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

const VITE_TELEGRAM_BOT_URL = import.meta.env.VITE_TELEGRAM_BOT_URL
export const selectBotUrl = createSelector(
    selectConfigQueryData,
    (config) => {
        if (VITE_TELEGRAM_BOT_URL) return VITE_TELEGRAM_BOT_URL;

        return config?.TELEGRAM_BOT_URL
    }
)

export const selectPixelFireUrl = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.PIXEL_FIRE_URL
    }
)

export const selectScratchCardTransitionTimeout = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.SCRATCH_CARD_TRANSITION_TIMEOUT_MS || 1500
    }
)

export const selectSplashScreenTimeout = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.SPLASH_SCREEN_TIMEOUT_MS || 2000
    }
)

export const selectDailyBonusConfig = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.DAILY_BONUS
    }
)

export const selectSendRBax = createSelector(
    selectConfigQueryData,
    (config) => {
        return config?.SEND_RBAX
    }
)

export const selectSendRBaxAmount = createSelector(
    selectSendRBax,
    (config) => {
        return config?.RBAX
    }
)

export const selectSendRBaxMaxPerUserDaily = createSelector(
    selectSendRBax,
    (config) => {
        return config?.MAX_RBAX_PER_USER_DAILY
    }
)

export const selectSendRBaxMaxUses = createSelector(
    selectSendRBax,
    (config) => {
        return config?.MAX_USES
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
        return config?.FRIENDS_TO_INVITE
    }
)

export const selectFriendRBax = createSelector(
    selectFriendsBonusConfig,
    (config) => {
        return config?.RBAX
    }
)
