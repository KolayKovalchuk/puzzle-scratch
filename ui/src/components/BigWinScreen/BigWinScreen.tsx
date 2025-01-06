

import styles from './BigWinScreen.module.scss';

import { Icon } from '@components/shared/Icon';
import { selectScratchCardTransitionTimeout } from '@store/selectors/config.selectors';
import { useSelector } from 'react-redux';

import { WinStyledText } from '@components/shared/StyledText';
import { formatNumber } from '@utils/formatters/formatNumber';
import { getCoinAnimationName } from '@utils/getCoinAnimationName';
import { CoinAnimation, CoinAnimationName } from './components/CoinAnimation';

import big_win from '@icons/big_win.svg';
import robo_token_gold from '@icons/robo_token_gold.svg';

export interface IBigWinScreenProps {
    winAmount: number;
    topPrize: number;
    className?: string;
    onClick?: () => void;
}

export function BigWinScreen({ winAmount, topPrize, className, onClick }: IBigWinScreenProps) {
    const scratchCardTransitionTimeout = useSelector(selectScratchCardTransitionTimeout);

    if (!winAmount) return null

    const coinAnimationName = getCoinAnimationName(winAmount, topPrize)
    const isBigWinIconVisible = coinAnimationName === CoinAnimationName.coint_l

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
        <CoinAnimation animationName={coinAnimationName} />
    </div>
}