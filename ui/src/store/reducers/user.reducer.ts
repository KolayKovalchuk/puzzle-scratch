import { User } from '@models/User.model';
import { FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS } from '../actions/user.actions';

// Initial State
export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

// Reducer
export const userReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
