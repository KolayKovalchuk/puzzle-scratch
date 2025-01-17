import { AppSounds } from '@config/sounds';
import { BLINK_MATRIX_CELS, PLAY_SOUND, RESET_MATRIX_BLINK_COUNTER, SHOW_AMOUNT_CHANGE_LABEL } from '@store/actions/appState.actions';

// Initial State
export interface IAppState {
    lastAmountChange: number;
    prizeLabelCounter: number;

    soundToPlay: AppSounds | null;
    shouldStopAllSounds: boolean;
    soundPlayerCounter: number;
    duration?: number | null;

    matrixBlinkCounter: number;
}

const initialState: IAppState = {
    lastAmountChange: 0,
    prizeLabelCounter: 0,

    soundToPlay: null,
    duration: null,
    shouldStopAllSounds: true,
    soundPlayerCounter: 0,

    matrixBlinkCounter: 0,
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
        default:
            return state;
    }
};
