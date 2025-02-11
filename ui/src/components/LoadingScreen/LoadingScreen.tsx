import { Icon } from '@components/shared/Icon';
import { ProgressBar } from '@components/shared/ProgressBar/ProgressBar';
import { LoaderStyledStyledText } from '@components/shared/StyledText';
import robo_token_double_border from '@icons/robo_token_double_border.svg';
import { LogoHeader } from '@pages/MainView/components/LogoHeader/LogoHeader';
import { ITextStyle } from 'pixi.js-legacy';
import { GeoRestrictionPopup } from './GeoRestrictionPopup';
import { useLoadingPercentHook } from './hooks/useLoadingPercentHook';
import { SystemErrorPopup } from './SystemErrorPopup';

import styles from './LoadingScreen.module.scss';

const poweredByTextStyles: Partial<ITextStyle> = {
    fontSize: 16,
};

const loadingTextStyles: Partial<ITextStyle> = {
    fontSize: 18,
};

export interface ILoadingScreenProps {
    isLoaded: boolean;
}

export function LoadingScreen({ isLoaded }: ILoadingScreenProps) {
    const {
        isVisible,
        percentage,
    } = useLoadingPercentHook(isLoaded);

    const isGeoRestrictionVisible = false;
    const isSystemErrorVisible = false;
    // TODO: Uncomment this line to show the system error popup
    // const appError = useSelector(selectAppError);
    // const isGeoRestrictionVisible = appError === AppErrors.GeoRestriction;
    // const isSystemErrorVisible = appError === AppErrors.SystemError;

    if (!isVisible) return null;

    return (<>
        <div className={styles.contianer}>
            <LogoHeader className={styles.logoHeader} />

            <div className={styles.poweredByTextContainer}>
                <LoaderStyledStyledText
                    text={'Powered by $RBAX'}
                    className={styles.poweredByText}
                    textStyles={poweredByTextStyles}
                />

                <Icon name={robo_token_double_border} className={styles.tokenIcon}></Icon>
            </div>

            <div className={styles.loadingBarContainer}>
                <ProgressBar percentage={percentage} className={styles.loadingBar} />
                <LoaderStyledStyledText
                    text={'Loading...'}
                    className={styles.loadingText}
                    textStyles={loadingTextStyles} />
            </div>
        </div>
        <GeoRestrictionPopup isOpen={isGeoRestrictionVisible} className={styles.modalDialog}/>
        <SystemErrorPopup isOpen={isSystemErrorVisible} className={styles.modalDialog}/>
    </>);
}
