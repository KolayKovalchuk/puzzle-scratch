import { IUserAcceptTermsResponse } from '@models/IUserAcceptTermsResponse';
import { INotification } from '@models/Notification.model';
import { IUser } from '@models/User.model';

// Action Types
export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

// Action Creators
export const fetchUser = () => ({
    type: FETCH_USER,
});

export const fetchUserSuccess = (user: IUser) => ({
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

export const UPDATE_USER_BALANCE_TON = 'UPDATE_USER_BALANCE_TON';

export const updateUserBalanceTon = (payload: number) => ({
    type: UPDATE_USER_BALANCE_TON,
    payload,
});

export const UPDATE_USER_BALANCE_RBAX = 'UPDATE_USER_BALANCE_RBAX';

export const updateUserBalanceRbax = (payload: number) => ({
    type: UPDATE_USER_BALANCE_RBAX,
    payload,
});


export const UPDATE_USER_ToS = 'UPDATE_USER_ToS';

export const updateUserTos = (isAprooved: boolean) => ({
    type: UPDATE_USER_ToS,
    payload: isAprooved,
});

export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';

export const updateUserToken = (payload: IUserAcceptTermsResponse) => ({
    type: UPDATE_USER_TOKEN,
    payload,
});

export const UPDATE_USER_NOTIFICATIONS = 'UPDATE_USER_NOTIFICATIONS';

export const updateUserNotifications = (payload: INotification[]) => ({
    type: UPDATE_USER_NOTIFICATIONS,
    payload,
});