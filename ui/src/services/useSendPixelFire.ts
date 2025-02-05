import { setClickIdParam } from '@store/actions/appState.actions';
import { initialScratchCounter } from '@store/reducers/appState.reducer';
import { selectClickIdParam } from '@store/selectors/appState.selectors';
import { selectPixelFireUrl } from '@store/selectors/config.selectors';
import { selectUserClickId } from '@store/selectors/user.selectors';
import store from '@store/store';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clickIdParam } from './api/links.service';
import { postUserClickId } from './api/user.service';
import { extractStartparams } from './auth.service';

async function _updateClickId(clickId: string, scratchCounter: number) {
    const result = await postUserClickId(`${clickId}${clickIdSeparator}${scratchCounter}`);
    if (result) store.dispatch(setClickIdParam({ clickId, scratchCounter: scratchCounter }));
}

export async function sendPixelFire() {
    const { clickId, scratchCounter} = selectClickIdParam(store.getState());

    console.log('sendPixelFire - clickId:', clickId);
    console.log('sendPixelFire - scratchCounter:', scratchCounter);

    if (clickId && scratchCounter > 1) {
        const newScratchCounter = scratchCounter - 1;
        console.log('sendPixelFire - Decrementing scratchCounter:', newScratchCounter);
        _updateClickId(clickId, newScratchCounter);
        return;
    }

    if (scratchCounter < 1) {
        return;
    }

    const pixelFireUrl = selectPixelFireUrl(store.getState());

    if (!clickId || !pixelFireUrl) return;

    const url = `${pixelFireUrl}?${clickIdParam}=${clickId}`;
    console.log('sendPixelFire - Pixel fire URL:', url);

    try {
        const newScratchCounter = scratchCounter - 1;
        console.log('sendPixelFire - Decrementing scratchCounter:', scratchCounter, newScratchCounter);
        _updateClickId(clickId, newScratchCounter);
        axios.get(url);
    } catch (error) {
        console.error('sendPixelFire - Error sending pixel fire request:', error);
    }
}

export const clickIdSeparator = '_scratchCounter_';

export function useSaveClickId(isUserLoaded: boolean) {
    const { clickId: userClickId, scratchCounter } = useSelector(selectUserClickId);

    const updateClickId = useCallback(async (clickId: string) => {
        console.log('updateClickId - clickId:', clickId);
        console.log('updateClickId - userClickId:', userClickId);

        if (clickId && !userClickId) {
            console.log('updateClickId - with clickId');
            _updateClickId(clickId, initialScratchCounter);
            return;
        }

        if (userClickId) {
            console.log('updateClickId - with userClickId', userClickId, scratchCounter);
            store.dispatch(setClickIdParam({ clickId: userClickId, scratchCounter: scratchCounter }));
        }
    }, [userClickId]);

    useEffect(() => {
        if (!isUserLoaded) return;

        const clickIdStartParam = extractStartparams(WebApp.initDataUnsafe.start_param || '', clickIdParam);
        const urlParams = new URLSearchParams(window.location.search);
        const clickIdUrlParam = urlParams.get(clickIdParam);

        const clickId = clickIdUrlParam || clickIdStartParam;

        console.log('useSaveClickId - clickIdStartParam:', clickIdStartParam);
        console.log('useSaveClickId - clickIdUrlParam:', clickIdUrlParam);
        console.log('useSaveClickId - clickId:', clickId);
        console.log('useSaveClickId - userClickId:', userClickId);

        updateClickId(clickId);
    }, [isUserLoaded, userClickId]);
}
