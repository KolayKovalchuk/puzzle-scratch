import WebApp from '@twa-dev/sdk';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const isPreferredLocaleSelectedKey = 'isPreferredLocaleSelected';

export async function getIsPreferredLocaleSelectedFromCloud() {
    try {
        const isPreferredLocaleSelected = await new Promise<boolean>((resolve, reject) => {
            WebApp.CloudStorage.getItem(isPreferredLocaleSelectedKey, (error, isPreferredLocaleSelected) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(isPreferredLocaleSelected === 'true');
                }
            });
        });

        return isPreferredLocaleSelected;
    } catch (error) {
        console.error('Error fetching isPreferredLocaleSelected:', error);
        return false;
    }
}

export function useGetIsPreferredLocaleSelectedFromCloud(): [boolean, Dispatch<SetStateAction<boolean>>, boolean] {
    const [isPreferredLocaleSelected, setIsPreferredLocaleSelected] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const getIsPreferredLocaleSelected = async () => {
            const isPreferredLocaleSelected = await getIsPreferredLocaleSelectedFromCloud();

            setIsLoaded(true);
            setIsPreferredLocaleSelected(isPreferredLocaleSelected);
        }

        getIsPreferredLocaleSelected()
    }, []);

    return [isPreferredLocaleSelected, setIsPreferredLocaleSelected, isLoaded];
}

export async function setIsPreferredLocaleSelectedToCloud(isPreferredLocaleSelected: boolean) {
    try {
        const stringValue = isPreferredLocaleSelected ? 'true' : 'false';
        await new Promise<void>((resolve, reject) => {
            WebApp.CloudStorage.setItem(isPreferredLocaleSelectedKey, stringValue, (error, result) => {
                if (result) {
                    console.log('isPreferredLocaleSelected set successfully');
                    resolve();
                } else {
                    console.log(`Failed to set isPreferredLocaleSelected: ${error}`);
                    reject();
                }
            });
        });
        return true;
    } catch (error) {
        console.error('Error setting isPreferredLocaleSelected:', error);
        return false
    }
}
