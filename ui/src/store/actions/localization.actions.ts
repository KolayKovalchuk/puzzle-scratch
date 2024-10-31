import { LocalizationModel } from '@models/LocalizationDataKey.model';

export const SET_LOCALIZATION_DATA = 'SET_LOCALIZATION_DATA';

export const setLocalizationData = (data: LocalizationModel[]) => ({
    type: SET_LOCALIZATION_DATA,
    payload: data,
});
