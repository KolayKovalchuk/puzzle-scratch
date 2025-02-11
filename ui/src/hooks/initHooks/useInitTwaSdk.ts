import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

export function useInitTwaSdk() {
    useEffect(() => {
        WebApp.enableClosingConfirmation();
        WebApp.isVerticalSwipesEnabled = false;

        WebApp.setBackgroundColor('#380850')
        WebApp.setHeaderColor('#380850')
        WebApp.setBottomBarColor('#380850')


        if (!WebApp.isExpanded) {
            WebApp.expand();
        }

        WebApp.ready();
        console.log('Twa sdk initialized', WebApp);
    }, [])
}