

import { Icon } from '@components/shared/Icon';
import { WinStyledText } from '@components/shared/StyledText';

import styles from './TopPrizeLabel.module.scss';

import robo_token_gold from '@icons/robo_token_gold.svg';
import { formatNumber } from '@utils/formatters/formatNumber';
import { useSelector } from 'react-redux';
import { selectLocalValue } from '@store/selectors/localization.selectors';


export interface ITopPrizeLabelProps {
    topPrize: number;
}

export function TopPrizeLabel({ topPrize }: ITopPrizeLabelProps) {
    const winUptoText = useSelector(selectLocalValue('txt.game.winUpTo')).toUpperCase();

    return (
        <div className={styles.container}>
            <WinStyledText text={winUptoText} textStyles={{ fontSize: 20 }} className={styles.winUpToLabel} />
            <div className={styles.winAmountContainer}>
                <Icon name={robo_token_gold} className={styles.roboTokenGoldIcon} />
                <WinStyledText className={styles.winAmount} text={formatNumber(topPrize)} textStyles={{ fontSize: 26 }} />
            </div>
        </div>
    );
}
