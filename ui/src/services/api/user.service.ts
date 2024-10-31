import { setIsPreferredLocaleSelectedToCloud } from '@services/telegramCloud/preferredLocale.service';
import { apiClient } from './api.service';
import store from '@store/store';
import { updateUserLocale } from '@store/actions/user.actions';

export async function postUserLocale(locale: string): Promise<boolean> {
    try {
        const response = await apiClient.patch('/user/locale', {
            preferredLocale: locale.toLowerCase(),
        });

        console.log('Locale updated successfully:', response.data);
        return true;
    } catch (error) {
        console.error('Error updating locale:', error);
        return false;
    }
}

export async function selectUserLocale(locale: string) {
    const postLocaleResult = await postUserLocale(locale)
    
    if (!postLocaleResult) {
        console.error('Failed to update locale:', locale);
        return false;
    }

    const setToCloudeLocaleResult = await setIsPreferredLocaleSelectedToCloud(true)

    if (!setToCloudeLocaleResult) {
        console.error('Failed to set isPreferredLocaleSelected to cloud');
        return false;
    }

    store.dispatch(updateUserLocale(locale));

    return true
}
