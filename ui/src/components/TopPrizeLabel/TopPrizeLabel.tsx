

import { Icon } from '@components/shared/Icon';
import { WinStyledText } from '@components/shared/StyledText';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { formatNumber } from '@utils/formatters/formatNumber';
import { ITextStyle } from 'pixi.js-legacy';
import { useSelector } from 'react-redux';

import styles from './TopPrizeLabel.module.scss';

import robo_token_gold from '@icons/robo_token_gold.svg';
import { useEffect, useState } from 'react';


export interface ITopPrizeLabelProps {
    topPrize: number;
    className?: string;
}

const winUpToTextStyles: Partial<ITextStyle> = {
    fontSize: 20
}

const winAmountTextStyles: Partial<ITextStyle> = {
    fontSize: 26
}

export function TopPrizeLabel({ topPrize, className }: ITopPrizeLabelProps) {
    const winUptoText = useSelector(selectLocalValue('txt.game.winUpTo')).toUpperCase();
    const [ formattedTopPrize, setFormattedTopPrize ] = useState<string>('');

    useEffect(() => {
        setFormattedTopPrize(formatNumber(topPrize));
    }, [topPrize]);

    return (
        <div className={`${styles.container} ${className || ''}`}>
            <WinStyledText text={winUptoText} textStyles={winUpToTextStyles} className={styles.winUpToLabel} />
            <div className={styles.winAmountContainer}>
                <Icon name={robo_token_gold} className={styles.roboTokenGoldIcon} />
                <WinStyledText
                    className={styles.winAmount}
                    text={formattedTopPrize}
                    textStyles={winAmountTextStyles}
                    shouldFitVertically={false}
                    shouldFitHorizontally={false}
                />
            </div>
        </div>
    );
}
