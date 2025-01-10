import { ROUTES } from '@routers/routerConfig';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useFixNavigateForTelegramWebApp() {
    const [navigateTimeout, setNavigateTimeout] = useState<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();
    const navigateBack = useCallback(() => {
        navigate(-1);

        const timeout = setTimeout(() => {
            console.log('timeout!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            navigate(ROUTES.Home);
        }, 0);

        setNavigateTimeout(timeout);
    }, [navigate]);

    useEffect(() => {
        return () => {
            if (navigateTimeout) {
                clearTimeout(navigateTimeout);
            }
        }
    }, [navigateTimeout]);

    return navigateBack;
}