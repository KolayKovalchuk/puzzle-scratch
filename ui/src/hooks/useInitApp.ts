import { useFetchLocalizationData } from '@services/api/localization.service';
import { useLoginUser } from '@services/auth.service';
import { useAssetsBundleLoader } from './useAssetsBundleLoader';
import { useInitTwaSdk } from './useInitTwaSdk';
import { useFontFaceObserver } from './useloadFont';
import { useSaveClickId } from '@services/useSendPixelFire';

export function useInitApp() {
    useSaveClickId();
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