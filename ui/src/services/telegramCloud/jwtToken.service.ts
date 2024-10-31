import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

export async function getJwtTokenFromCloud() {
    try {
        const jwt_token = await new Promise<string>((resolve, reject) => {
            WebApp.CloudStorage.getItem('jwt_token', (error, jwt_token) => {
                if (error) {
                    reject(error);
                } else
                if (jwt_token) {
                    resolve(jwt_token);
                } else {
                    reject('No token found');
                }
            });
        });

        return jwt_token;
    } catch (error) {
        console.error('Error fetching jwt_token:', error);
        return null;
    }
}

export function useGetJwtTokenFromCloud(): [boolean, string | null] {
    const [jwt_token, setJwtToken] = useState<string | null>(null);
    const [isLoaded, setIsLoaded ] = useState<boolean>(false);

    useEffect(() => {
        const getToken = async () => {
            const jwt_token = await getJwtTokenFromCloud();
            setIsLoaded(true);
            setJwtToken(jwt_token);
        }

        getToken()
    }, []);

    return [isLoaded, jwt_token];
}

export async function setJwtTokenToCloud(token: string) {
    try {
        await new Promise<void>((resolve, reject) => {
            WebApp.CloudStorage.setItem('jwt_token', token, (error, result) => {
                if (result) {
                    console.log('Token set successfully');
                    resolve();
                } else {
                    console.log(`Failed to set token: ${error}`);
                    reject();
                }
            });
        });
        return true;
    } catch (error) {
        console.error('Error setting jwt_token:', error);
        return false
    }
}

export function useSetJwtTokenToCloud(jwt_token: string | null) {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (!jwt_token) {
            return;
        }

        const setToken = async () => {
            const isSuccess = await setJwtTokenToCloud(jwt_token);
            setIsSuccess(isSuccess);
        }

        setToken()
    }, [jwt_token]);

    return isSuccess
}
