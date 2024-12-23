import { useGetStarsConvertOptions } from '@services/api/purchase.service';

import { Button, ButtonType } from '@components/shared/Button/Button';
import { Icon } from '@components/shared/Icon';
import { RegularStyledText } from '@components/shared/StyledText';

import styles from './DepositWithStarsBody.module.scss';

import { useButtonConfig } from '@components/shared/Button/hooks/useButtonConfig';
import { useGetWidestChild, widestChildTargetClassName } from '@hooks/useGetWidestChild';
import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import telegram_star from '@icons/telegram_star.svg';
import { SpinnerIcon } from '@components/shared/Icon/SpinnerIcon';

export interface IDepositWithStarsBodyProps {
}

export function DepositWithStarsBody({ }: IDepositWithStarsBodyProps) {
    const { isLoading, starsConvertOptions } = useGetStarsConvertOptions();
    const { textStyles } = useButtonConfig(ButtonType.Confirm, styles);
    const { containerRef, width: btnWidth } = useGetWidestChild(isLoading);

    return (
        <div className={styles.container} ref={containerRef}>
            {
                isLoading ? <SpinnerIcon name={robo_token_gold_no_shining} className={styles.spinnerIcon} />
                    : <div className={`${styles.btnContainer} ${!btnWidth ? styles.hidden : ''}`}>{
                        starsConvertOptions.map((option, index) => {
                            const rbaxValue = Math.round(option.rbax);
                            const starsValue = Math.round(option.stars);

                            const isLastBtn = index === starsConvertOptions.length - 1;

                            return (
                                <Button
                                    key={index}
                                    mode={ButtonType.Confirm}
                                    onClick={() => { }}
                                    className={`${widestChildTargetClassName} ${styles.btn} ${styles.iconContainerBtn}`}
                                    style={isLastBtn ? {} : { width: btnWidth }}
                                >
                                    <div className={styles.iconContainerBtnContent}>
                                        <div className={styles.iconContainerBtnLabel}>
                                            <Icon name={telegram_star} className={`${styles.icon} ${styles.starIcon}`} />
                                            <RegularStyledText
                                                className={styles.iconContainerBtnText}
                                                textStyles={textStyles}
                                                text={rbaxValue.toString()}
                                            />
                                        </div>

                                        <RegularStyledText
                                            text=" > "
                                            className={`${styles.iconContainerBtnText} ${styles.arrowText}`}
                                            textStyles={textStyles}
                                        />
                                        <div className={styles.iconContainerBtnLabel}>
                                            <Icon name={robo_token_gold_no_shining} className={`${styles.icon} ${styles.roboTokenGoldIcon}`} />
                                            <RegularStyledText
                                                className={styles.iconContainerBtnText}
                                                textStyles={textStyles}
                                                text={starsValue.toString()}
                                            />
                                        </div>
                                    </div>
                                </Button>
                            );
                        })
                    }</div>
            }
        </div>
    );
}
