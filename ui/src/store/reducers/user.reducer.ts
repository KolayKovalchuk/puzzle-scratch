import { IUser, IUserBalance } from '@models/User.model';
import { FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS, UPDATE_USER_BALANCE_RBAX, UPDATE_USER_BALANCE_TON, UPDATE_USER_LOCALE, UPDATE_USER_NOTIFICATIONS, UPDATE_USER_TOKEN, UPDATE_USER_ToS } from '../actions/user.actions';

// Initial State
export interface UserState {
    user: IUser | null;
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
                    ...state.user as IUser,
                    preferredLocale: action.payload,
                },
            }

        case UPDATE_USER_BALANCE_TON:
            return {
                ...state,
                user: {
                    ...state.user as IUser,
                    balance: {
                        ...state.user?.balance as IUserBalance,
                        ton: action.payload,
                    }
                },
            }

        case UPDATE_USER_BALANCE_RBAX:
            return {
                ...state,
                user: {
                    ...state.user as IUser,
                    balance: {
                        ...state.user?.balance as IUserBalance,
                        rbax: action.payload,
                    }
                },
            }

        case UPDATE_USER_ToS:
            return {
                ...state,
                user: {
                    ...state.user as IUser,
                    acceptedTerms: action.payload,
                },
            }

        case UPDATE_USER_TOKEN:
            return {
                ...state,
                user: {
                    ...state.user as IUser,
                    authToken: action.payload.authToken,
                    authTokenExpiresInMs: action.payload.authTokenExpiresInMs,
                },
            }

        case UPDATE_USER_NOTIFICATIONS:
            return {
                ...state,
                user: {
                    ...state.user as IUser,
                    notifications: action.payload,
                },
            }
        default:
            return state;
    }
};
