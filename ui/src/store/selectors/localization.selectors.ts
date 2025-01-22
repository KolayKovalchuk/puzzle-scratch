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

export const selectLocalValue = (localizationKey: string, locale?: string) => createSelector(
    [selectLocalizationDataItem(localizationKey), selectPreferredLocale],
    (localizationDataItem, preferredLocale) => {

        if (!localizationDataItem) return localizationKey

        const localizationKeyList = Object.keys(localizationDataItem)

        const targetLocale = locale || preferredLocale || 'EN'

        if (!targetLocale) return localizationKey

        const localeKey = localizationKeyList
            .find((key) =>
                key.toLowerCase() === targetLocale?.toLowerCase()
            )
            || 'EN'

        return localizationDataItem[localeKey as keyof LocalizationModel] || localizationKey;
    }
)

export const selectLocalValueWithLink = (localizationKey: string, locale?: string) => createSelector(
    [selectLocalValue(localizationKey, locale)],
    (localizationValue) => {
        const matchResult = localizationValue.match(/(.*)<link url="(https:\/\/.*)">(.*)<\/link>(.*)/)

        if (!matchResult) return {
            fullMatch: localizationValue,
            prevText: localizationValue,
            linkUrl: localizationValue,
            linkText: localizationValue,
            followingText: localizationValue
        }

        const [
            fullMatch,
            prevText,
            linkUrl,
            linkText,
            followingText
        ] = matchResult;
        
        return {
            fullMatch: fullMatch || '',
            prevText: prevText || '',
            linkUrl: linkUrl || '',
            linkText: linkText || '',
            followingText: followingText || ''
        }
    }
)

export const selectLocalValueWithVars = (config: {localizationKey: string, locale?: string}, ...vars: (string | number)[]) => createSelector(
    [selectLocalValue(config.localizationKey, config.locale)],
    (localizationValue) => {
        const valueStr = vars.reduce<string>((acc, varName, index) => {
            const varNameStr = varName.toString();
            const replaceTarget = `<$var${index + 1}>`

            return acc.replace(replaceTarget, varNameStr)
        }, localizationValue)

        return valueStr;
    }
)

export const iconSign = '<$icon1>'
