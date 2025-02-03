import { selectPixelFireUrl } from '@store/selectors/config.selectors';
import store from '@store/store';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { clickIdParam } from './api/links.service';
import { extractStartparams } from './auth.service';
import { useEffect } from 'react';
import { setClickIdParam } from '@store/actions/appState.actions';
import { selectClickIdParam } from '@store/selectors/appState.selectors';

export async function sendPixelFire() {
    const pixelFireUrl = selectPixelFireUrl(store.getState());
    const clickId = selectClickIdParam(store.getState());

    console.log('sendPixelFire - clickIdStartParam:', clickId);
    console.log('sendPixelFire - pixelFireUrl:', pixelFireUrl);

    if (!clickId || !pixelFireUrl) return;

    const url = `${pixelFireUrl}?${clickIdParam}=${clickId}`;
    console.log('sendPixelFire - Pixel fire URL:', url);

    try {
        axios.get(url);
    } catch (error) {
        console.error('sendPixelFire - Error sending pixel fire request:', error);
    }
}


export function useSaveClickId() {
    useEffect(() => {
        const clickIdStartParam = extractStartparams(WebApp.initDataUnsafe.start_param || '', clickIdParam);
        const urlParams = new URLSearchParams(window.location.search);
        const clickIdUrlParam = urlParams.get(clickIdParam);

        const clickId = clickIdUrlParam || clickIdStartParam;

        if (clickId) {
            store.dispatch(setClickIdParam(clickId));
        }
    }, []);
}
