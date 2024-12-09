import { selectSplashScreenTimeout } from '@store/selectors/config.selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useLoadingPercentHook(isLoaded: boolean) {
    const splashScreenTimeout = useSelector(selectSplashScreenTimeout);

    const [isVisible, setIsVisible] = useState(true);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const setInvisibleDelay = splashScreenTimeout / 10;
        const animationDuration = (splashScreenTimeout - setInvisibleDelay);
        const interval = animationDuration / 100;

        const timer = setInterval(() => {
            setPercentage(prev => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(timer);

                    if (!isLoaded) return 100;

                    setTimeout(() => {
                        setIsVisible(false);
                    }, setInvisibleDelay);

                    return 100;
                }
            });
        }, interval);

        if (isLoaded && percentage === 100) {
            clearInterval(timer);
            setIsVisible(false);
        }

        return () => clearInterval(timer);
    }, [splashScreenTimeout, isLoaded]);

    return {
        isVisible,
        percentage,
    }
}