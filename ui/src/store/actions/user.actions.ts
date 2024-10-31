import { User } from '@models/User.model';

// Action Types
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

// Action Creators
export const fetchUser = () => ({
    type: FETCH_USER,
});

export const fetchUserSuccess = (user: User) => ({
    type: FETCH_USER_SUCCESS,
    payload: user,
});

export const fetchUserError = (error: string) => ({
    type: FETCH_USER_ERROR,
    payload: error,
});

export const UPDATE_USER_LOCALE = 'UPDATE_USER_LOCALE';

export const updateUserLocale = (locale: string) => ({
    type: UPDATE_USER_LOCALE,
    payload: locale,
});