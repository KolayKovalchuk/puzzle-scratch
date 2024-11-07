import { useFetchLocalizationData } from '@services/api/localization.service';
import { useLoginUser } from '@services/auth.service';
import { useGetIsPreferredLocaleSelectedFromCloud } from '@services/telegramCloud/preferredLocale.service';
import { useInitTwaSdk } from './useInitTwaSdk';
import { useFontFaceObserver } from './useloadFont';

export function useInitApp() {
    const [, isUserLoggedIn] = useLoginUser();
    const [isLocLoaded] = useFetchLocalizationData()
    const [isPreferredLocaleSelected, setIsPreferredLocaleSelected, isPrefLocLoaded] = useGetIsPreferredLocaleSelectedFromCloud()
    const isFontListLoaded = useFontFaceObserver(`Nunito`);

    useInitTwaSdk();

    const isLoaded = isUserLoggedIn && isLocLoaded && isPrefLocLoaded && isFontListLoaded;

    return [isLoaded, isPreferredLocaleSelected, setIsPreferredLocaleSelected] as const;
}