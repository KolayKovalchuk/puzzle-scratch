import { AppSounds } from '@config/sounds';
import { BLINK_MATRIX_CELS, PLAY_SOUND, RESET_MATRIX_BLINK_COUNTER, SET_APP_ERROR, SET_CLICK_ID_PARAM, SHOW_AMOUNT_CHANGE_LABEL } from '@store/actions/appState.actions';

export enum AppErrors {
    NoError = 'noError',
    InsufficientBalance = 'InsufficientBalance',
    NoAvailableCards = 'NoAvailableCards',
}

export interface IClickId {
    clickId: string | null;
    scratchCounter: number;
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

    clickIdParam: IClickId;

    error: AppErrors;
}


export const initialScratchCounter = 5;
const initialState: IAppState = {
    lastAmountChange: 0,
    prizeLabelCounter: 0,

    soundToPlay: null,
    duration: null,
    shouldStopAllSounds: true,
    soundPlayerCounter: 0,

    clickIdParam: {
        clickId: null,
        scratchCounter: initialScratchCounter,
    },

    matrixBlinkCounter: 0,

    error: AppErrors.NoError,
};

// Reducer
export const gameReducer = (state = initialState, action: any): IAppState => {
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

        case SET_CLICK_ID_PARAM:
            return {
                ...state,
                clickIdParam: {
                    clickId: action.payload.clickId,
                    scratchCounter: action.payload.scratchCounter,
                },
            };

        default:
            return state;
    }
};
