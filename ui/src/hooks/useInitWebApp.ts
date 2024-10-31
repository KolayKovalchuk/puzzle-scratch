import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

export function useInitWebApp() {
    useEffect(() => {
        WebApp.enableClosingConfirmation();
        WebApp.ready();

        console.log('WebApp initialized', WebApp);
        
    }, [])
}