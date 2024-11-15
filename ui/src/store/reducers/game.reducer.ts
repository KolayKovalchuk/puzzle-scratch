import { IUser, IUserBalance } from '@models/User.model';
import { FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS, UPDATE_USER_BALANCE_RBAX, UPDATE_USER_BALANCE_TON, UPDATE_USER_LOCALE, UPDATE_USER_NOTIFICATIONS, UPDATE_USER_TOKEN, UPDATE_USER_ToS } from '../actions/user.actions';
import { BatchCard, BatchCardType } from '@src/models/BatchCard.model';
import { START_PUZZLE_GAME } from '../actions/game.actions';

// Initial State
export interface IPuzzleGameState {
    // cardType: BatchCardType | null;
    // batchId: string | null;
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
                batchCard: action.payload,
            };
        default:
            return state;
    }
};
