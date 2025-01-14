

import styles from './BigWinScreen.module.scss';

import { Icon } from '@components/shared/Icon';
import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors';
import { useSelector } from 'react-redux';

import { WinType } from '@models/IBuyBatchCardData';
import { WinStyledText } from '@components/shared/StyledText';
import { formatNumber } from '@utils/formatters/formatNumber';
import { getCoinAnimationName } from '@utils/getCoinAnimationName';
import { CoinAnimation, CoinAnimationName } from './components/CoinAnimation';

import big_win from '@icons/big_win.svg';
import robo_token_gold from '@icons/robo_token_gold.svg';
import { useCallback, useEffect } from 'react';
import store from '@store/store';
import { playSound } from '@store/actions/appState.actions';
import { AppSounds } from '@config/sounds';
import { useGetSounds } from '@hooks/usePlaySound';

export interface IBigWinScreenProps {
    winAmount: number;
    winType?: WinType;
    className?: string;
    onClick?: () => void;
}

function usePlayWinSound(animationName: CoinAnimationName) {
    useEffect(() => {
        switch (animationName) {
            case CoinAnimationName.coint_l:
                store.dispatch(playSound(AppSounds.BigWin, false));
                break;
            case CoinAnimationName.coint_m:
                store.dispatch(playSound(AppSounds.MedWin, false));
                break;
            case CoinAnimationName.coint_s:
                store.dispatch(playSound(AppSounds.SmallWin, false));
                break;
        }
    }, [animationName]);

    const { stopSound } = useGetSounds();

    const stopWinSound = useCallback(() => {
        switch (animationName) {
            case CoinAnimationName.coint_l:
                stopSound(AppSounds.BigWin);
                break;
            case CoinAnimationName.coint_m:
                stopSound(AppSounds.MedWin);
                break;
            case CoinAnimationName.coint_s:
                stopSound(AppSounds.SmallWin);
                break;
        }
    }, [animationName]);

    return { stopWinSound };
}


export function BigWinScreen({ winAmount, winType = WinType.M, className, onClick }: IBigWinScreenProps) {
    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);

    const coinAnimationName = getCoinAnimationName(winType)
    const isBigWinIconVisible = coinAnimationName === CoinAnimationName.coint_l

    const { stopWinSound } = usePlayWinSound(coinAnimationName);
    const onAnimationEnd = useCallback(() => stopWinSound(), [stopWinSound]);

    if (!winAmount) return null

    return <div
        className={`${styles.container} ${className || ''}`}
        style={{ animationDuration: `${scratchCardTransitionTimeout}ms` }}
        onClick={onClick}
        onMouseMove={onClick}
    >
        <div className={styles.animatedContainer} style={{ animationDuration: `${scratchCardTransitionTimeout}ms` }}>
            {isBigWinIconVisible && <Icon name={big_win} className={styles.bigWinIcon} />}
            <div className={styles.winAmountContainer}>
                <Icon name={robo_token_gold} className={styles.roboTokenGoldIcon} />
                <WinStyledText
                    className={styles.winAmount}
                    text={formatNumber(winAmount)}
                    textStyles={{ fontSize: 50 }}
                />
            </div>
        </div>
        <CoinAnimation animationName={coinAnimationName} onAnimationEnd={onAnimationEnd}/>
    </div>
}