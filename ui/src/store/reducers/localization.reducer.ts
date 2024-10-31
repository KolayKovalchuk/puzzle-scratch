// reducers/localizationReducer.ts

import { LocalizationModel } from '@models/LocalizationDataKey.model';
import { SET_LOCALIZATION_DATA } from '@store/actions/localization.actions';

interface LocalizationState {
    localizationData: LocalizationModel[];
}

const initialState: LocalizationState = {
    localizationData: [],
};

export const localizationReducer = (state = initialState, action: any): LocalizationState => {
    switch (action.type) {
        case SET_LOCALIZATION_DATA:
            return {
                ...state,
                localizationData: action.payload,
            };
        default:
            return state;
    }
};