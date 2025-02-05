import { setClickIdParam } from '@store/actions/appState.actions';
import { selectClickIdParam } from '@store/selectors/appState.selectors';
import { selectPixelFireUrl } from '@store/selectors/config.selectors';
import { selectUserClickId } from '@store/selectors/user.selectors';
import store from '@store/store';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clickIdParam } from './api/links.service';
import { postUserClickId } from './api/user.service';
import { extractStartparams } from './auth.service';

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


export function useSaveClickId(isUserLoaded: boolean) {
    const userClickId = useSelector(selectUserClickId);

    useEffect(() => {
        if (!isUserLoaded) return;

        const clickIdStartParam = extractStartparams(WebApp.initDataUnsafe.start_param || '', clickIdParam);
        const urlParams = new URLSearchParams(window.location.search);
        const clickIdUrlParam = urlParams.get(clickIdParam);

        const clickId = clickIdUrlParam || clickIdStartParam;
        const isNewClickId = userClickId !== clickId;

        console.log('useSaveClickId - clickIdStartParam:', clickIdStartParam);
        console.log('useSaveClickId - clickIdUrlParam:', clickIdUrlParam);
        console.log('useSaveClickId - clickId:', clickId);
        console.log('useSaveClickId - userClickId:', userClickId);
        console.log('useSaveClickId - isNewClickId:', isNewClickId);

        if (clickId && isNewClickId) {
            postUserClickId(clickId);
            store.dispatch(setClickIdParam(clickId));
        }
    }, [isUserLoaded, userClickId]);
}
