import { AppSounds } from '@config/sounds';
import { PLAY_SOUND, SHOW_AMOUNT_CHANGE_LABEL } from '@store/actions/appState.actions';

// Initial State
export interface IAppState {
    lastAmountChange: number;
    prizeLabelCounter: number;
    soundToPlay: AppSounds | null;
    soundPlayerCounter: number;
}

const initialState: IAppState = {
    lastAmountChange: 0,
    prizeLabelCounter: 0,
    soundToPlay: null,
    soundPlayerCounter: 0,
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
                soundToPlay: action.payload,
                soundPlayerCounter: state.soundPlayerCounter + 1,
            };
        default:
            return state;
    }
};
