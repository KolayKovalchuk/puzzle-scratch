import { Icon } from '@components/shared/Icon';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { UserStats } from '@models/UserStats.model';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { formatNumber } from '@utils/formatters/formatNumber';
import { useSelector } from 'react-redux';
import styles from './UserStatistic.module.scss';

export interface IUserStatisticProps {
    userStats: UserStats | null
}

export function UserStatistic({ userStats }: IUserStatisticProps) {
    const cardsPlayedText = useSelector(selectLocalValue('profile.statistic.cardsPlayed'));
    const rbaxWonText = useSelector(selectLocalValue('profile.statistic.rbaxWon'));
    const biggestWinText = useSelector(selectLocalValue('profile.statistic.biggestWin'));

    return (
        <div className={styles.statisticContianer}>
            <div className={styles.statisticRow}>
                <div className={styles.statisticLabel}>
                    {cardsPlayedText}
                </div>
                <div className={styles.statisticValue}>
                    {formatNumber(userStats?.totalCardsPlayed || 0)}
                </div>
            </div>
            <div className={styles.statisticRow}>
                <div className={styles.statisticLabel}>
                    {rbaxWonText}
                </div>
                <div className={styles.statisticValue}>
                    <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                    {formatNumber(userStats?.totalRbaxWon || 0)}
                </div>
            </div>
            <div className={styles.statisticRow}>
                <div className={styles.statisticLabel}>
                    {biggestWinText}
                </div>
                <div className={styles.statisticValue}>
                    <Icon name={robo_token_gold_no_shining} className={styles.roboTokenGoldIcon} />
                    {formatNumber(userStats?.biggestWin || 0)}
                </div>
            </div>
        </div>

    );
}
