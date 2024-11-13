import WebApp from '@twa-dev/sdk';

const TELEGRAM_BASE_URL = 'https://t.me/';
const TELEGRAM_SHARE_BASE_URL = TELEGRAM_BASE_URL + 'share/';

export async function shareLinkToFriends(text: string, url: string) {
    try {
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(text);
        WebApp.openTelegramLink(`${TELEGRAM_SHARE_BASE_URL}url?url=${encodedUrl}&text=${encodedText}`);
    } catch (error) {
        console.error('Failed to share link to friends:', error);
    }
}
