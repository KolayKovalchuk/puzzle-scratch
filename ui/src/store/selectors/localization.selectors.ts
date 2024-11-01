import { LocalizationModel } from '@models/LocalizationDataKey.model';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { selectPreferredLocale } from './user.selectors';

// Base selector to access the query state
const selectLocalizationState = (state: RootState) => state.localization;

export const selectLocalizationData = createSelector(
    selectLocalizationState,
    (queryState) => queryState.localizationData
)

export const selectSupportedLocales = createSelector(
    selectLocalizationData,
    (queryState) => {
        if (!queryState?.length) return []

        return Object.keys(queryState[0]).filter((key) => key.toLowerCase() !== 'Key'.toLowerCase())
    }
)

export const selectLocalizationDataItem = (localizationKey: string) => createSelector(
    selectLocalizationData,
    (queryState) => queryState.find((data) => {
        return data.Key.toLowerCase() === localizationKey.toLowerCase()
    })
)

export const selectLocalValue = (localizationKey: string) => createSelector(
    [selectLocalizationDataItem(localizationKey), selectPreferredLocale],
    (localizationDataItem, preferredLocale) => {

        if (!localizationDataItem) return ''

        const localizationKeyList = Object.keys(localizationDataItem)

        if (!preferredLocale) return 'EN'

        const localizationKey = localizationKeyList
            .find((key) =>
                key.toLowerCase() === preferredLocale?.toLowerCase()
            )
            || 'EN'

        return localizationDataItem[localizationKey as keyof LocalizationModel] || '';
    }
)
