import axios from 'axios';
import { LocalizationModel } from '../../models/LocalizationDataKey.model';
import { fetchConfigData } from './config.service';

let _localization_url = '';
let localizationData: LocalizationModel[] = [];

export async function getUserLocale(telegramId: number | null, baseUrl: string): Promise<string> {
    try {
        const url = baseUrl + '/public/locale?userId=' + telegramId;
        const response = await axios.get(url);

        const userLocale = response.data;

        return userLocale || 'EN';
    } catch (error) {
        console.error('Error fetching user locale:', error);
        return 'EN';
    }
}


export async function fetchLocalizationFile(localization_url: string): Promise<LocalizationModel[]> {
    try {
        if (!localization_url) {
            console.error('Localization url is not set');
            return [];
        }

        if (localizationData.length > 0 || _localization_url === localization_url) {
            console.log('Returning cached localization data');
            return localizationData;
        }

        _localization_url = localization_url;
        const response = await axios.get(_localization_url);

        if (!response.data) {
            console.error('Localization file is empty');
            return [];
        }

        localizationData = response.data;

        return localizationData;
    } catch (error) {
        console.error('Error fetching localization file:', error);
        return [];
    }
}

export async function getLocalizationData(): Promise<LocalizationModel[]> {
    const config = await fetchConfigData();

    if (!config) {
        throw new Error('Config data is not available');
    }

    const localizationData = await fetchLocalizationFile(config.BOT_LOCALISATION);

    if (!localizationData) {
        throw new Error('Localization data is not available');
    }
    return localizationData;
}
