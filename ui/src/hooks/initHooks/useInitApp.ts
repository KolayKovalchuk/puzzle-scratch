import { useFetchLocalizationData } from '@services/api/localization.service';
import { useLoginUser } from '@services/auth.service';
import { useSaveClickId } from '@services/useSaveClickId';
import { useAssetsBundleLoader } from '../useAssetsBundleLoader';
import { useFixIOSBlinkingElements } from './useFixIOSBlinkingElements';
import { useInitTwaSdk } from './useInitTwaSdk';
import { useFontFaceObserver } from './useloadFont';

export function useInitApp() {
    const {isLoaded: isUserLoggedIn} = useLoginUser();
    useSaveClickId(isUserLoggedIn);
    const [isLocLoaded] = useFetchLocalizationData()
    const isFontListLoaded = useFontFaceObserver(`Nunito`);
    useAssetsBundleLoader();

    useInitTwaSdk();

    const isLoaded = Boolean(isUserLoggedIn && isLocLoaded && isFontListLoaded);

    useFixIOSBlinkingElements(isLoaded);

    return {
        isLoaded,
        isFontListLoaded,
    };
}