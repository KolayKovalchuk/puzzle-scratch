import { LocalizationModel } from '../models/LocalizationDataKey.model'

export function selectLocalValue(locData: LocalizationModel[], locKey:string, preferredLocale: string) {
    if (!locKey || !locData) return locKey;
    
    const locDataItem = locData.find((data) => {
        return data.Key.toLowerCase() === locKey.toLowerCase()
    })

    if (!locDataItem) return locKey
    if (!preferredLocale) return locKey

    const localizationKeyList = Object.keys(locDataItem)

    const localeKey = localizationKeyList
        .find((key) =>
            key.toLowerCase() === preferredLocale?.toLowerCase()
        )
        || 'EN'

    return locDataItem[localeKey as keyof LocalizationModel] || locKey;
}