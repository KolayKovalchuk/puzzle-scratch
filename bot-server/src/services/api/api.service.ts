import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

export async function getAuthenticatedClient() {
    try {
        return await auth.getIdTokenClient('https://puzzle-game-telegram-adapter-svc-0-231746083649.us-central1.run.app');
    } catch (error) {
        console.error('Error getting authenticated client:', error);
    }
}

export const apiClient: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the authentication token
// apiClient.interceptors.request.use(async (config) => {
//     const client = await auth.getClient();
//     const token = await client.getAccessToken();
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

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
