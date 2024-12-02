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
import { ITextStyle } from 'pixi.js';
import { getCoinIcon, getDailyContainerStyles, isMiddleDay } from './utils/utils';


export function getDayContaunerBgIcon(index: number, length: number) {
    if (index === 0) {
        return styles.leftArrowBlock;
    }

    if (index === length - 1) {
        return styles.rightArrowBlock;
    }

    if (isMiddleDay(index, length)) {
        return styles.todayArrowBlock;
    }

    return styles.centerArrowBlock;
}

const headerTextStyles: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    ...GameCellTextStyle,
    dropShadow: false,
}

export interface IDailyBonusContainerConfig {
    bonus: number;
    bgClass: string;
    coinIconName: string;
    headerText: string;
}

export function DailyBonusNotificationBody() {
    const mainContentText = useSelector(selectLocalValue('txt.dailybonus.text'))

    const dayliBonusConfig = useSelector(selectDailyBonusConfig);
    const [config, setConfig] = useState<IDailyBonusContainerConfig[]>([]);

    useEffect(() => {
        if (!dayliBonusConfig) return

        const config = dayliBonusConfig.map<IDailyBonusContainerConfig>((bonus, index) => {
            const headerText: string = isMiddleDay(index, dayliBonusConfig.length)
                ? selectLocalValue('txt.dailybonus.today')(store.getState())
                : selectLocalValueWithVars('txt.dailybonus.day', index + 1)(store.getState());

            return {
                bonus: bonus,
                bgClass: getDayContaunerBgIcon(index, dayliBonusConfig.length),
                coinIconName: getCoinIcon(index),
                headerText,
            }
        });

        setConfig(config);
    }, [dayliBonusConfig, setConfig]);

    return (
        <div className={styles.container}>
            <div className={styles.mainContentText}>{mainContentText}</div>
            <div className={styles.dayRowContainer}>
                {config.map((item, index) => {
                    const dayContainerStyle = getDailyContainerStyles(index, config.length);

                    const footerFontSize =  isMiddleDay(index, config.length) ? 18 : 12;
                    const textFitCoefficient =  isMiddleDay(index, config.length) ? 0.9 : 1;


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
                        <Icon name={item.coinIconName} className={styles.coinIcon} />
                        <div className={styles.dayContainerBonus}>
                            <Icon name={robo_token_no_bg} className={styles.roboTokenIcon} />
                            <StyledText
                                className={styles.bonusAmount}
                                text={item.bonus + ''}
                                shouldFitFontSize={false}
                                textStyles={{ fontSize: footerFontSize, dropShadow: false, strokeThickness: 1 }}
                            ></StyledText>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    );
}
