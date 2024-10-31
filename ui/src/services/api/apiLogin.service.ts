import { AppConfig } from '@models/AppConfig.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

const VITE_CONFIG_URL = import.meta.env.VITE_CONFIG_URL;

export const configApi = createApi({
    reducerPath: 'configApi',
    baseQuery: fetchBaseQuery({ baseUrl: VITE_CONFIG_URL }),
    endpoints: (builder) => ({
        getAppConfig: builder.query<AppConfig, void>({
            query: () => '',
        }),
    }),
})

export const apiLoginClient: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosRetry(apiLoginClient, {
    retries: 3,
    retryCondition: (error: AxiosError) => {
        console.log('retryCondition error', error);
        
        switch (error.response?.status) {
            case 500:
            case 401:
                return true;
            default:
                return false;
        }
    },
});

export function useLoginApiClient(): [AxiosInstance | null, boolean] {
    const { data, isSuccess } = configApi.useGetAppConfigQuery();
    const apiUrl = data?.API_URL;

    if (isSuccess && apiUrl) {
        apiLoginClient.defaults.baseURL = apiUrl;
    }

    if (isSuccess) {
        return [apiLoginClient, isSuccess];
    }

    return [null, isSuccess];
}
