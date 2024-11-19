import { BatchCard } from '@models/BatchCard.model';
import { START_PUZZLE_GAME } from '../actions/game.actions';

// Initial State
export interface IPuzzleGameState {
    batchCard: BatchCard | null;
}

const initialState: IPuzzleGameState = {
    batchCard: null,
};

// Reducer
export const gameReducer = (state = initialState, action: any): IPuzzleGameState => {
    switch (action.type) {
        case START_PUZZLE_GAME:
            return {
                ...state,
                batchCard: {
                    ...action.payload
                },
            };
        default:
            return state;
    }
};
