import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

export const apiClient: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosRetry(apiClient, {
    retries: 3,
    retryCondition: (error: AxiosError) => {
        switch (error.response?.status) {
            case 500:
            case 401:
                return true;
            default:
                return false;
        }
    },
});
