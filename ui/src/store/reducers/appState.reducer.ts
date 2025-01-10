import { SHOW_AMOUNT_CHANGE_LABEL } from '@store/actions/appState.actions';

// Initial State
export interface IPuzzleGameState {
    lastAmountChange: number;
    prizeLabelCounter: number;
}

const initialState: IPuzzleGameState = {
    lastAmountChange: 0,
    prizeLabelCounter: 0,
};

// Reducer
export const gameReducer = (state = initialState, action: any): IPuzzleGameState => {
    switch (action.type) {
        case SHOW_AMOUNT_CHANGE_LABEL:
            return {
                ...state,
                lastAmountChange: action.payload,
                prizeLabelCounter: state.prizeLabelCounter + 1,
            };
        default:
            return state;
    }
};
