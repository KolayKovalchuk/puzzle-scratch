import { getCollectBonusLink, postCreateShareLinkCode } from '@services/api/links.service';
import WebApp from '@twa-dev/sdk';

const TELEGRAM_BASE_URL = 'https://t.me/';
const TELEGRAM_SHARE_BASE_URL = TELEGRAM_BASE_URL + 'share/';

export async function shareLinkToFriends(text: string) {
    const linkCode = await postCreateShareLinkCode();

    if (!linkCode) {
        return;
    }

    const url = getCollectBonusLink(linkCode);
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    WebApp.openTelegramLink(`${TELEGRAM_SHARE_BASE_URL}url?url=${encodedUrl}&text=${encodedText}`);
}
