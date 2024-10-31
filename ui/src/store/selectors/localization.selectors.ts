import { LocalizationModel } from '@models/LocalizationDataKey.model';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { preferredLocaleSelector } from './user.selectors';

// Base selector to access the query state
const selectLocalizationState = (state: RootState) => state.localization;

export const selectLocalizationData = createSelector(
    selectLocalizationState,
    (queryState) => queryState.localizationData
)

export const selectLocalizationDataItem = (localizationKey: string) => createSelector(
    selectLocalizationData,
    (queryState) => queryState.find((data) => data.Key === localizationKey)
)

export const selectLocalizationDataKey = (localizationKey: string) => createSelector(
    [selectLocalizationDataItem(localizationKey), preferredLocaleSelector],
    (localizationDataItem, preferredLocale) => {

        if (!localizationDataItem) return ''

        const localizationKeyList = Object.keys(localizationDataItem)
        const localizationKey = localizationKeyList
            .find((key) =>
                key.toLocaleLowerCase() === preferredLocale?.toLocaleLowerCase()
            )
            || 'EN'

        return localizationDataItem[localizationKey as keyof LocalizationModel] || '';
    }
)
