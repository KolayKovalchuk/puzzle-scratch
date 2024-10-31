import { apiClient } from './api.service';

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
