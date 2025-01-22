

import { Icon } from '@components/shared/Icon';
import { WinStyledText } from '@components/shared/StyledText';
import big_win from '@icons/big_win.svg';
import robo_token_gold from '@icons/robo_token_gold.svg';
import { WinType } from '@models/IBuyBatchCardData';
import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors';
import { formatNumber } from '@utils/formatters/formatNumber';
import { getCoinAnimationName } from '@utils/getCoinAnimationName';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styles from './BigWinScreen.module.scss';
import { CoinAnimation, CoinAnimationName } from './components/CoinAnimation';

export interface IBigWinScreenProps {
    winAmount: number;
    winType?: WinType;
    className?: string;
    onClick?: () => void;
}


export function BigWinScreen({ winAmount, winType = WinType.M, className, onClick }: IBigWinScreenProps) {
    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);

    const coinAnimationName = getCoinAnimationName(winType)
    const isBigWinIconVisible = coinAnimationName === CoinAnimationName.coint_l
    
    const onClickCb = useCallback(() => {
        if (onClick) onClick();
    }, [onClick]);

    if (!winAmount) return null

    return <div
        className={`${styles.container} ${className || ''}`}
        style={{ animationDuration: `${scratchCardTransitionTimeout}ms` }}
        onClick={onClickCb}
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
        <CoinAnimation animationName={coinAnimationName}/>
    </div>
}