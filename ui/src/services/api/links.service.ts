import { selectBotUrl } from '@store/selectors/config.selectors';
import { selectUserRefCode } from '@store/selectors/user.selectors';
import store from '@store/store';
import { apiClient } from './api.service';

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
export const clickIdParam = 'clickId';
export const msgIdParam = 'msgId';

export function getAppLinkWithParam(code: string, param: string) {
    const botUrl = selectBotUrl(store.getState()) || '';
    const url = botUrl.endsWith('/') ? botUrl.slice(0, -1) : botUrl;
    return `${url}?start=${param}=${code}`;
}

export function getReferralLink() {
    const refCode = selectUserRefCode(store.getState())

    if (!refCode) {
        return null;
    }

    const url = getAppLinkWithParam(refCode, refCodeParam);
    return url
}
