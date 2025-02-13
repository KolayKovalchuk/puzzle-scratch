import { AppSounds } from '@config/sounds';
import { BLINK_MATRIX_CELS, PLAY_SOUND, RESET_MATRIX_BLINK_COUNTER, SET_APP_ERROR, SHOW_AMOUNT_CHANGE_LABEL } from '@store/actions/appState.actions';

export enum AppErrors {
    NoError = 'noError',
    InsufficientBalance = 'InsufficientBalance',
    NoAvailableCards = 'NoAvailableCards',
    GeoRestriction = 'GeoRestriction',
    SystemError = 'SystemError',
}

// Initial State
export interface IAppState {
    lastAmountChange: number;
    prizeLabelCounter: number;

    soundToPlay: AppSounds | null;
    shouldStopAllSounds: boolean;
    soundPlayerCounter: number;
    duration?: number | null;

    matrixBlinkCounter: number;

    withdrawCooldownExpiry: number | null;

    error: AppErrors;
}


const initialState: IAppState = {
    lastAmountChange: 0,
    prizeLabelCounter: 0,

    soundToPlay: null,
    duration: null,
    shouldStopAllSounds: true,
    soundPlayerCounter: 0,

    matrixBlinkCounter: 0,

    withdrawCooldownExpiry: null,

    error: AppErrors.NoError,
};

// Reducer
export const appStateReducer = (state = initialState, action: any): IAppState => {
    switch (action.type) {
        case SHOW_AMOUNT_CHANGE_LABEL:
            return {
                ...state,
                lastAmountChange: action.payload,
                prizeLabelCounter: state.prizeLabelCounter + 1,
            };
        case PLAY_SOUND:
            return {
                ...state,
                soundToPlay: action.payload.soundName,
                shouldStopAllSounds: action.payload.shouldStopAllSounds,
                soundPlayerCounter: state.soundPlayerCounter + 1,
                duration: action.payload.duration,
            };

        case BLINK_MATRIX_CELS:
            return {
                ...state,
                matrixBlinkCounter: state.matrixBlinkCounter + 1,
            };

        case RESET_MATRIX_BLINK_COUNTER:
            return {
                ...state,
                matrixBlinkCounter: 0,
            };

        case SET_APP_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        case 'SET_WITHDRAW_COOLDOWN_EXPIRY':
            return {
                ...state,
                withdrawCooldownExpiry: action.payload,
            };

        default:
            return state;
    }
};
