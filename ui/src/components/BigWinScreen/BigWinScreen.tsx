

import { Icon } from '@components/shared/Icon';
import styles from './BigWinScreen.module.scss';


import { WinStyledText } from '@components/shared/StyledText';
import { BIG_WIN_TIMEOUT } from '@hooks/useScratchGame';
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
    if (!winAmount) return null

    const coinAnimationName = getCoinAnimationName(winAmount, topPrize)
    const isBigWinIconVisible = coinAnimationName === CoinAnimationName.coint_l

    return <div
        className={`${styles.container} ${className || ''}`}
        style={{ animationDuration: `${BIG_WIN_TIMEOUT}ms` }}
        onClick={onClick}
        >
        <div className={styles.animatedContainer} style={{ animationDuration: `${BIG_WIN_TIMEOUT}ms` }}>
            { isBigWinIconVisible && <Icon name={big_win} className={styles.bigWinIcon} /> }
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