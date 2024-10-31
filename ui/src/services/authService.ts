import { User } from '@models/User.model';
import { fetchUser, fetchUserError, fetchUserSuccess } from '@store/actions/user.actions';
import { selectUser } from '@store/selectors/user.selectors';
import store from '@store/store';
import { AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiClient, useApiClient } from './api/apiService';
import { setJwtTokenToCloud, useGetJwtTokenFromCloud } from './telegramCloudService';
import WebApp from '@twa-dev/sdk';


let requestAuthInterceptor: number | null = null;
let response401Interceptor: number | null = null;

export function addAuthInterceptor(apiClient: AxiosInstance, jwt_token: string) {
    if (requestAuthInterceptor !== null) {
        apiClient.interceptors.request.eject(requestAuthInterceptor);
        requestAuthInterceptor = null;
    }
    requestAuthInterceptor = apiClient.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${jwt_token}`;
            return config;
        },
    );

    if (response401Interceptor !== null) {
        apiClient.interceptors.response.eject(response401Interceptor);
        response401Interceptor = null;
    }
    response401Interceptor = apiClient.interceptors.response.use(
        async (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await loginUser();
                return apiClient(originalRequest);
            }
            return Promise.reject(error);
        }
    )
}

export async function loginUser() {
    try {
        store.dispatch(fetchUser());
        if (!apiClient) return;

        const data = await apiClient.post('/login', {
            // TODO: remove mock
            initData: WebApp.initData || 'test-test'
            // initData: 'test-test'
        })

        if (data?.status !== 200) {
            throw new Error('Failed to login. User data is empty');
        }

        const user = new User(data.data);
        store.dispatch(fetchUserSuccess({ ...user }));

        if (user.authToken) {
            addAuthInterceptor(apiClient, user.authToken);
            setJwtTokenToCloud(user.authToken);
        }
    } catch (error) {
        if (error instanceof Error) {
            store.dispatch(fetchUserError(error.message));
        } else {
            store.dispatch(fetchUserError('loginUser: An unknown error occurred'));
        }
    }
}

export function useLoginUser() {
    const [, jwt_token] = useGetJwtTokenFromCloud();

    const [apiClient, isSuccess] = useApiClient();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (isSuccess && !jwt_token) {
            loginUser()
        }
    }, [
        apiClient,
        isSuccess,
        jwt_token,
        loginUser,
        fetchUser,
        fetchUserError,
        fetchUserSuccess
    ]);

    return user;
}