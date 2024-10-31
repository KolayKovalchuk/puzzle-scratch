import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { configApi } from './apiLogin.service';

export const apiClient: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosRetry(apiClient, {
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

export function useApiClient(): [AxiosInstance | null, boolean] {
    const { data, isSuccess } = configApi.useGetAppConfigQuery();
    const apiUrl = data?.API_URL;

    if (isSuccess && apiUrl) {
        apiClient.defaults.baseURL = `${apiUrl}/api`;
    }

    if (isSuccess) {
        return [apiClient, isSuccess];
    }

    return [null, isSuccess];
}
