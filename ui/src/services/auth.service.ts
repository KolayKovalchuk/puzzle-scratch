import { User } from '@models/User.model';
import { fetchUser, fetchUserError, fetchUserSuccess } from '@store/actions/user.actions';
import { selectUser } from '@store/selectors/user.selectors';
import store from '@store/store';
import WebApp from '@twa-dev/sdk';
import { AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiClient, useApiClient } from './api/api.service';
import { apiLoginClient, useLoginApiClient } from './api/apiLogin.service';
import { setJwtTokenToCloud, useGetJwtTokenFromCloud } from './telegramCloud/jwtToken.service';


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

interface ILoginBody {
    initData: string,
    local?: boolean
}

export async function loginUser() {
    try {
        store.dispatch(fetchUser());
        if (!apiLoginClient) return;

        // const isDevMode = import.meta.env.MODE === 'development'
        const body: ILoginBody = {
            initData: WebApp.initData
        }

        // if (isDevMode) {
        //     body.initData = WebApp.initData || 'test-test';
        //     body.local = true;
        // }

        const data = await apiLoginClient.post('/login', body);

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
    const [isJwtLoaded] = useGetJwtTokenFromCloud();

    const [, isLoginApiLoaded] = useLoginApiClient();
    const [, isApiLoaded] = useApiClient();

    const user = useSelector(selectUser);

    useEffect(() => {
        if (isLoginApiLoaded) {
            loginUser()
        }
    }, [
        isLoginApiLoaded,
        loginUser,
    ]);

    const isLoaded = isJwtLoaded && isLoginApiLoaded && isApiLoaded && !!user;
    return [user, isLoaded];
}
