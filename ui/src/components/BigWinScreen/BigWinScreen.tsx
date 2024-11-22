
import { Icon } from '@components/shared/Icon';
import styles from './BigWinScreen.module.scss';


import { WinStyledText } from '@components/shared/StyledText';
import big_win from '@icons/big_win.svg';
import robo_token_gold from '@icons/robo_token_gold.svg';
import { formatNumber } from '@utils/formatters/formatNumber';

export interface IBigWinScreenProps {
    winAmount: number | undefined;
}

export function BigWinScreen({ winAmount }: IBigWinScreenProps) {
    if (!winAmount) return null

    return <div className={styles.container}>
        <Icon name={big_win} className={styles.bigWinIcon} />
        <div className={styles.winAmountContainer}>
            <Icon name={robo_token_gold} className={styles.roboTokenGoldIcon} />
            <WinStyledText
                className={styles.winAmount}
                text={formatNumber(winAmount)}
                textStyles={{ fontSize: 50 }}
            />
        </div>
    </div>
}