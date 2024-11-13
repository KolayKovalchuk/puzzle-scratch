import store from '@store/store';
import { apiClient } from './api.service';
import { selectTelegramAppUrl } from '@store/selectors/config.selectors';
import { selectUserRefCode } from '@store/selectors/user.selectors';

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

export const linkCodeParam = 'linkCode';
export const refCodeParam = 'refCode';

export function getAppLinkWithParam(code: string, param: string) {
    const appUrl = selectTelegramAppUrl(store.getState());
    return `${appUrl}?startapp=${param}=${code}`;
}

export function getReferralLink() {
    const refCode = selectUserRefCode(store.getState())

    if (!refCode) {
        return null;
    }

    const url = getAppLinkWithParam(refCode, refCodeParam);
    return url
}
