import { SHOW_AMOUNT_CHANGE_LABEL } from '@store/actions/game.actions';

// Initial State
export interface IPuzzleGameState {
    lastAmountIncrease: number;
    prizeLabelCounter: number;
}

const initialState: IPuzzleGameState = {
    lastAmountIncrease: 0,
    prizeLabelCounter: 0,
};

// Reducer
export const gameReducer = (state = initialState, action: any): IPuzzleGameState => {
    switch (action.type) {
        case SHOW_AMOUNT_CHANGE_LABEL:
            return {
                ...state,
                lastAmountIncrease: action.payload,
                prizeLabelCounter: state.prizeLabelCounter + 1,
            };
        default:
            return state;
    }
};
