import { ITextStyle } from 'pixi.js';

import { Icon } from '@components/shared/Icon';
import { ProgressBar } from '@components/shared/ProgressBar/ProgressBar';
import { LoaderStyledStyledText } from '@components/shared/StyledText';
import { LogoHeader } from '@pages/MainView/components/LogoHeader/LogoHeader';
import { useLoadingPercentHook } from './hooks/useLoadingPercentHook';

import styles from './LoadingScreen.module.scss';

import robo_token_double_border from '@icons/robo_token_double_border.svg';

const poweredByTextStyles: Partial<ITextStyle> = {
    fontSize: 20,
};

const loadingTextStyles: Partial<ITextStyle> = {
    fontSize: 25,
};

export interface ILoadingScreenProps {
    isLoaded: boolean;
}

export function LoadingScreen({ isLoaded }: ILoadingScreenProps) {
    const {
        isVisible,
        percentage,
        loadingBlinkAnimationDuration,
    } = useLoadingPercentHook(isLoaded);

    const containerClassName = `${styles.contianer} ${isVisible ? styles.visible : ''}`;

    return (
        <div className={containerClassName}>
            <LogoHeader />

            <div className={styles.poweredByTextContainer}>
                <LoaderStyledStyledText
                    text={'Powered by $RBAX'}
                    className={styles.poweredByText}
                    textStyles={poweredByTextStyles}
                />

                <Icon name={robo_token_double_border} className={styles.tokenIcon}></Icon>
            </div>

            <ProgressBar percentage={percentage} className={styles.loadingBar} />
            <LoaderStyledStyledText
                text={'Loading...'}
                className={styles.loadingByText}
                styles={{ animationDuration: `${loadingBlinkAnimationDuration}ms` }}
                textStyles={loadingTextStyles} />
        </div>
    );
}
