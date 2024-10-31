import { User } from '@models/User.model';
import { FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS, UPDATE_USER_LOCALE } from '../actions/user.actions';
import { stat } from 'fs';

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

        case UPDATE_USER_LOCALE:
            return {
                ...state,
                user: {
                    ...state.user as User,
                    preferredLocale: action.payload,
                },
            }
        default:
            return state;
    }
};
