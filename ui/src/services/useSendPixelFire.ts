import { selectPixelFireUrl } from '@store/selectors/config.selectors';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { clickIdParam } from './api/links.service';
import { extractStartparams } from './auth.service';

export function useSendPixelFire() {
    const pixelFireUrl = useSelector(selectPixelFireUrl);
    
    useEffect(() => {
        const clickIdStartParam = extractStartparams(WebApp.initDataUnsafe.start_param || '', clickIdParam);
        const urlParams = new URLSearchParams(window.location.search);
        const clickIdUrlParam = urlParams.get(clickIdParam);

        const clickId = clickIdUrlParam || clickIdStartParam;

        console.log('useSendPixelFire - clickIdStartParam:', clickId);
        console.log('useSendPixelFire - pixelFireUrl:', pixelFireUrl);

        if (!clickId || !pixelFireUrl) return;

        const url = `${pixelFireUrl}?${clickIdParam}=${clickId}`;
        console.log('useSendPixelFire - Pixel fire URL:', url);

        try {
            axios.get(url);
        } catch (error) {
            console.error('useSendPixelFire - Error sending pixel fire request:', error);
        }
    }, [pixelFireUrl]);
}
