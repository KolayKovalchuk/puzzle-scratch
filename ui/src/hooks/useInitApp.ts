import { useFetchLocalizationData } from '@services/api/localization.service';
import { useLoginUser } from '@services/auth.service';
import { useInitTwaSdk } from './useInitTwaSdk';
import { useFontFaceObserver } from './useloadFont';
import { useAssetsBundleLoader } from './useAssetsBundleLoader';

export function useInitApp() {
    const {isLoaded: isUserLoggedIn} = useLoginUser();
    const [isLocLoaded] = useFetchLocalizationData()
    const isFontListLoaded = useFontFaceObserver(`Nunito`);
    useAssetsBundleLoader();

    useInitTwaSdk();

    const isLoaded = Boolean(isUserLoggedIn && isLocLoaded && isFontListLoaded);

    return {
        isLoaded,
        isFontListLoaded,
    };
}