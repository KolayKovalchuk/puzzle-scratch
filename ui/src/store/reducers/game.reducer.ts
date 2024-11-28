import { UPDATE_LAST_WIN } from '@store/actions/game.actions';

// Initial State
export interface IPuzzleGameState {
    lastWin: number;
}

const initialState: IPuzzleGameState = {
    lastWin: 0,
};

// Reducer
export const gameReducer = (state = initialState, action: any): IPuzzleGameState => {
    switch (action.type) {
        case UPDATE_LAST_WIN:
            return {
                ...state,
                lastWin: action.payload,
            };
        default:
            return state;
    }
};
