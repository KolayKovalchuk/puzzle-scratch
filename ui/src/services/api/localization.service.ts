import { setLocalizationData } from '@store/actions/localization.actions';
import { selectLocalizationUrl } from '@store/selectors/config.selectors';
import store from '@store/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export async function fetchLocalizationFile(localization_url: string): Promise<any> {
    try {
        if (!localization_url) {
            console.error('Localization url is not set');
            return null;
        }

        const response = await axios.get(localization_url);
        return response.data;
    } catch (error) {
        console.error('Error fetching localization file:', error);
        return null;
    }
}

export async function fetchLocalizationData(localization_url: string): Promise<object> {
    try {
        const data = await fetchLocalizationFile(localization_url);
        store.dispatch(setLocalizationData(data));
        return data;
    } catch (error) {
        console.error('Error setting localization data:', error);
        return {};
    }
}

export function useFetchLocalizationData() {
    const [isLoaded, setIsLoaded ] = useState<boolean>(false);

    const localization_url = useSelector(selectLocalizationUrl);
    useEffect(() => {
        const fetch = async () => {
            if (!localization_url) return;
            
            fetchLocalizationData(localization_url);
            setIsLoaded(true);
        }

        fetch();
    }, [localization_url]);

    return [isLoaded];
}