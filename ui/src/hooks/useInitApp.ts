import { useApp } from '@pixi/react';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

export const useInitApp = () => {
    const app = useApp()
    useEffect(() => {
        WebApp.ready();
    }, [app]);

    return app;
}