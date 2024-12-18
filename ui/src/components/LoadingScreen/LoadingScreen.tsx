import { ITextStyle } from 'pixi.js';

import { Icon } from '@components/shared/Icon';
import { ProgressBar } from '@components/shared/ProgressBar/ProgressBar';
import { LoaderStyledStyledText } from '@components/shared/StyledText';
import { LogoHeader } from '@pages/MainView/components/LogoHeader/LogoHeader';
import { useLoadingPercentHook } from './hooks/useLoadingPercentHook';

import styles from './LoadingScreen.module.scss';

import robo_token_double_border from '@icons/robo_token_double_border.svg';
import { setIsMainLoaderOpen } from '@store/actions/appState.actions';
import { useEffect } from 'react';
import store from '@store/store';

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
    } = useLoadingPercentHook(isLoaded);

    // const containerClassName = `${styles.contianer} ${isVisible ? styles.visible : ''}`;

    useEffect(() => {
        store.dispatch(setIsMainLoaderOpen(isVisible));
    }, [isVisible]);

    if (!isVisible) return null;

    return (
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
    );
}
