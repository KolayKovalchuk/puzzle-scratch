import { setIsPreferredLocaleSelectedToCloud } from '@services/telegramCloud/preferredLocale.service';
import { apiClient } from './api.service';
import store from '@store/store';
import { updateUserLocale, updateUserTos } from '@store/actions/user.actions';

export async function patchUserLocale(locale: string): Promise<boolean> {
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


export async function patchUserAcceptTerms(): Promise<any> {
    try {
        const response = await apiClient.patch('/user/accept-tos');

        console.log('Terms updated successfully:', response.data);

        return response?.data;
    } catch (error) {
        console.error('Error updating user terms:', error);
        return false;
    }
}

export async function selectUserLocale(locale: string) {
    const patchLocaleResult = await patchUserLocale(locale)
    
    if (!patchLocaleResult) {
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

export async function aprooveUserTerms() {
    const  patchUserAcceptTermsResult = await patchUserAcceptTerms()

    console.log('patchUserAcceptTermsResult', patchUserAcceptTermsResult);
    
    
    if (!patchUserAcceptTermsResult) {
        console.error('Failed to update terms');
        return false;
    }

    store.dispatch(updateUserTos(true));

    return true
}
