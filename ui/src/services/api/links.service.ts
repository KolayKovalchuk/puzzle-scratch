import store from '@store/store';
import { apiClient } from './api.service';
import { selectTelegramAppUrl } from '@store/selectors/config.selectors';

export async function postCreateShareLinkCode() {
    try {
        const response = await apiClient.post('/links/gift/create');
        const shareLink = response.data.code;

        console.log('Share link created successfully:', shareLink);

        return shareLink;
    } catch (error) {
        console.error('Error creating share link code:', error);
        return null
    }
}

export function getCollectBonusLink(code: string) {
    const appUrl = selectTelegramAppUrl(store.getState());
    return appUrl + '?startapp=' + code;
}