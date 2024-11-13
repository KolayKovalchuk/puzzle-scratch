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
        return queryState.queries[queryKey]
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