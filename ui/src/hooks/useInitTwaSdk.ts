import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

export function useInitTwaSdk() {
    useEffect(() => {
        WebApp.enableClosingConfirmation();
        WebApp.ready();

        console.log('Twa sdk initialized', WebApp);
        
    }, [])
}