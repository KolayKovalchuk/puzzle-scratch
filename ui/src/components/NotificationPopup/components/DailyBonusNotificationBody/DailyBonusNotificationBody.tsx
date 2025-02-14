import { selectDailyBonusConfig } from '@store/selectors/config.selectors';
import { useSelector } from 'react-redux';

import { Icon } from '@components/shared/Icon';
import { selectLocalValue, selectLocalValueWithVars } from '@store/selectors/localization.selectors';
import { useEffect, useState } from 'react';
import styles from './DailyBonusNotificationBody.module.scss';

import { GameCellStyledText, GameCellTextStyle } from '@components/shared/StyledText/components/GameCellStyledText';

import { DefaultTextStyleConfig, StyledText } from '@components/shared/StyledText';
import robo_token_no_bg from '@icons/robo_token_no_bg.svg';
import store from '@store/store';
import { ITextStyle } from 'pixi.js-legacy';
import { getCoinIcon, getDailyContainerStyles, isDayToday } from './utils/utils';
import { IDaylyBonusData } from '@models/Notification.model';


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

    useEffect(() => {
        if (!dayliBonusConfig) return

        const config = dayliBonusConfig.map<IDailyBonusContainerConfig>((bonus, index) => {
            const isToday = isDayToday(index, data.day);
            const headerText: string = isToday
                ? selectLocalValue('txt.dailybonus.today')(store.getState())
                : selectLocalValueWithVars({ localizationKey: 'txt.dailybonus.day' }, index + 1)(store.getState());

            return {
                bonus: bonus,
                bgClass: getDayContainerBgIconClass(index, dayliBonusConfig.length, data.day),
                coinIconName: getCoinIcon(index, isToday),
                headerText,
            }
        });

        setConfig(config);
    }, [dayliBonusConfig, data.day]);

    return (
        <div className={styles.container}>
            <div className={styles.mainContentText}>{mainContentText}</div>
            <div className={styles.dayRowContainer}>
                {config.map((item, index) => {
                    const dayContainerStyle = getDailyContainerStyles(index, config.length, data.day);

                    const isToday = isDayToday(index, data.day);
                    const footerFontSize = isToday ? 18 : 12;
                    const textFitCoefficient = isToday ? 0.9 : 1;

                    return (<div
                        key={index}
                        className={`${styles.dayContainer} ${item.bgClass}`}
                        style={dayContainerStyle}
                    >
                        <GameCellStyledText
                            className={styles.headerText}
                            text={item.headerText}
                            textStyles={headerTextStyles}
                            textFitCoefficient={textFitCoefficient}
                        />
                        <div className={styles.coinIcon}>
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
