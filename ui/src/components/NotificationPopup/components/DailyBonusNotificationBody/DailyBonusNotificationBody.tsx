import { selectDailyBonusConfig } from '@store/selectors/config.selectors';
import { useSelector } from 'react-redux';

import { Icon } from '@components/shared/Icon';
import { selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useCallback, useEffect, useState } from 'react';
import styles from './DailyBonusNotificationBody.module.scss';

import { GameCellStyledText, GameCellTextStyle } from '@components/shared/StyledText/components/GameCellStyledText';

import { DefaultTextStyleConfig, StyledText } from '@components/shared/StyledText';
import robo_token_no_bg from '@icons/robo_token_no_bg.svg';
import { IDaylyBonusData } from '@models/Notification.model';
import { selectPreferredLocale } from '@store/selectors/user.selectors';
import store from '@store/store';
import { ITextStyle } from 'pixi.js-legacy';
import { getCoinIcon, getDailyContainerStyles, isDayToday } from './utils/utils';


export function getDayContainerBgIconClass(index: number, length: number, dayNumber: number) {
    const isToday = isDayToday(index, dayNumber);
    const todayClass = isToday ? styles.todayArrowBlock : '';

    if (index === 0) {
        return `${styles.leftArrowBlock} ${todayClass}`;
    }

    if (index === length - 1) {
        return `${styles.rightArrowBlock} ${todayClass}`;
    }

    return `${styles.centerArrowBlock} ${todayClass}`;
}

const headerTextStyles: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    ...GameCellTextStyle,
    dropShadow: false,
    strokeThickness: 2,
    wordWrap: true,
    lineHeight: undefined,
    fontSize: 20,
}

const bonusAmountTextStyles: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    dropShadow: false,
    strokeThickness: 2,
}

export interface IDailyBonusContainerConfig {
    bonus: number;
    bgClass: string;
    coinIconName: string;
    headerText: string;
}

export interface IDailyBonusNotificationBodyProps {
    data: IDaylyBonusData;
}

export function DailyBonusNotificationBody({ data }: IDailyBonusNotificationBodyProps) {
    const mainContentText = useSelector(selectLocalValue('txt.dailybonus.text'))

    const dayliBonusConfig = useSelector(selectDailyBonusConfig);
    const [config, setConfig] = useState<IDailyBonusContainerConfig[]>([]);

    const currentLocale = useSelector(selectPreferredLocale);

    useEffect(() => {
        if (!dayliBonusConfig) return

        const config = dayliBonusConfig.map<IDailyBonusContainerConfig>((bonus, index) => {
            const isToday = isDayToday(index, data.day);
            const headerText: string = isToday
                ? selectLocalValue('txt.dailybonus.today')(store.getState())
                : selectLocalValueWithVars({ localizationKey: 'txt.dailybonus.day' }, index + 1)(store.getState());


            let bgClass = getDayContainerBgIconClass(index, dayliBonusConfig.length, data.day)
            if (currentLocale?.toLowerCase() === 'fil') {
                bgClass = bgClass + ` ${styles.fil}`
            }

            return {
                bonus: bonus,
                bgClass: bgClass,
                coinIconName: getCoinIcon(index, isToday),
                headerText,
            }
        });

        setConfig(config);
    }, [dayliBonusConfig, data.day, currentLocale]);

    return (
        <div className={styles.container}>
            <div className={styles.mainContentText}>{mainContentText}</div>
            <div className={styles.dayRowContainer}>
                {config.map((item, index) => {
                    const dayContainerStyle = getDailyContainerStyles(index, config.length, data.day);

                    const isToday = isDayToday(index, data.day);
                    const footerFontSize = isToday ? 18 : 12;
                    const isMdIcon = index === 2;
                    const coinIconMdClass = isMdIcon ? styles.md : '';

                    return (<div
                        key={index}
                        className={`${styles.dayContainer} ${item.bgClass}`}
                        style={dayContainerStyle}
                    >
                        <GameCellStyledText
                            className={styles.headerText}
                            text={item.headerText}
                            textStyles={headerTextStyles}
                            yShift={0.5}
                        />
                        <div className={`${styles.coinIcon} ${coinIconMdClass}`}>
                            <Icon name={item.coinIconName} />
                        </div>
                        <div className={styles.dayContainerBonus}>
                            <Icon name={robo_token_no_bg} className={styles.roboTokenIcon} />
                            <StyledText
                                className={styles.bonusAmount}
                                text={item.bonus + ''}
                                shouldFitHorizontally={false}
                                shouldFitVertically={false}
                                textStyles={{ ...bonusAmountTextStyles, fontSize: footerFontSize }}
                                yShift={0.5}
                            ></StyledText>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}
