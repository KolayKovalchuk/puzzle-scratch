import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';
import { clickIdParam } from './api/links.service';
import { postUserClickId } from './api/user.service';
import { extractStartparams } from './auth.service';

export function useSaveClickId(isUserLoaded: boolean) {
    useEffect(() => {
        if (!isUserLoaded) return;

        const clickIdStartParam = extractStartparams(WebApp.initDataUnsafe.start_param || '', clickIdParam);
        const urlParams = new URLSearchParams(window.location.search);
        const clickIdUrlParam = urlParams.get(clickIdParam);

        const clickId = clickIdUrlParam || clickIdStartParam;

        console.log('useSaveClickId - clickIdStartParam:', clickIdStartParam);
        console.log('useSaveClickId - clickIdUrlParam:', clickIdUrlParam);
        console.log('useSaveClickId - clickId:', clickId);

        if (clickId) {
            postUserClickId(clickId);
            return;
        }
    }, [isUserLoaded]);
}
