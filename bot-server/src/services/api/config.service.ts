import axios from 'axios';
import { AppConfig } from '../../models/AppConfig.model';

let _configCache: AppConfig | null = null;

export async function fetchConfigData(): Promise<AppConfig | null> {
    if (_configCache) {
        return _configCache;
    }

    try {
        const CONFIG_URL = process.env.CONFIG_URL;

        if (!CONFIG_URL) {
            throw new Error('CONFIG_URL is not set');
        }

        if (_configCache) {
            console.log('Returning cached config data');
            return _configCache;
        }

        const response = await axios.get(CONFIG_URL);

        if (!response.data) {
            console.error('Config file is empty');
            return null;
        }

        _configCache = new AppConfig(response.data);
        return _configCache;
    } catch (error) {
        console.error('Error fetching config file:', error);
        return null;
    }
}
