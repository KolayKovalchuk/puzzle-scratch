import DOMPurify from 'dompurify';

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

        return localizationDataItem[localizationKey as keyof LocalizationModel] || localizationKey;
    }
)

const linkTagStr = '<link url="'
const linkTagStrEnd = '">'
const linkTagClose = '</link>'

export const selectLocalValueWithLinkHTML = (localizationKey: string) => createSelector(
    [selectLocalValue(localizationKey)],
    (localizationValue) => {
        const str = localizationValue.replace(linkTagStr, '<a href="').replace(linkTagClose, '</a>')
        return DOMPurify.sanitize(str)
    }
)

export const selectLocalValueWithLinkConfig = (localizationKey: string) => createSelector(
    [selectLocalValue(localizationKey)],
    (localizationValue) => {
        const linkUrlRegEx = `${linkTagStr}(.*)${linkTagStrEnd}`
        const linkUrl = localizationValue.match(linkUrlRegEx)?.[1] || ''

        const linkTextRegex = `${linkTagStrEnd}(.*)${linkTagClose}`
        const linkText = localizationValue.match(linkTextRegex)?.[1] || localizationKey
        return { linkUrl, linkText }
    }
)