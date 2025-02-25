import { Button, ButtonType } from '@components/shared/Button';
import { useButtonConfig } from '@components/shared/Button/hooks/useButtonConfig';
import { RegularStyledText } from '@components/shared/StyledText';
import { widestChildTargetClassName } from '@hooks/useGetWidestChild';
import { IStarsConvertOption } from '@services/api/purchase.service';

import { Icon } from '@components/shared/Icon';
import styles from '../../DepositWithStarsBody.module.scss';

import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';


export interface IDepositWithStarsButtonsProps {
    starsConvertOptions: IStarsConvertOption[];
    btnWidth: number | 'auto';
    onOptionSelected: (option: IStarsConvertOption) => void;
}

export function DepositWithStarsButtons({ starsConvertOptions, btnWidth, onOptionSelected }: IDepositWithStarsButtonsProps) {
    const { textStyles } = useButtonConfig(ButtonType.Confirm, styles);
    textStyles.fontSize = 26;

    return (
        <div className={`${styles.btnContainer} ${!btnWidth ? styles.hidden : ''}`}>{
            starsConvertOptions.map((option, index) => {
                const rbaxValue = Math.floor(option.rbax);
                const starsValue = Math.floor(option.stars);

                const isLastBtn = index === starsConvertOptions.length - 1;

                return (
                    <Button
                        key={index}
                        mode={ButtonType.Confirm}
                        onClick={() => onOptionSelected(option)}
                        className={`${widestChildTargetClassName} ${styles.btn} ${styles.iconContainerBtn}`}
                        style={isLastBtn ? {} : { width: btnWidth }}
                    >
                        <div className={styles.iconContainerBtnContent}>
                            <div className={styles.iconContainerBtnLabel}>
                                <Icon className={`${styles.icon} ${styles.starIcon}`}>
                                    <img src='/telegram_star.png' alt="star" width='100%'/>
                                </Icon>
                                <RegularStyledText
                                    className={styles.iconContainerBtnText}
                                    textStyles={textStyles}
                                    text={starsValue.toString()}
                                />
                            </div>

                            <RegularStyledText
                                text=" > "
                                className={`${styles.iconContainerBtnText} ${styles.arrowText}`}
                                textStyles={textStyles}
                            />
                            <span style={{ fontSize: textStyles.fontSize }}
                                className={styles.arrowTextPlaceholder}>{' > '}</span>
                            <div className={styles.iconContainerBtnLabel}>
                                <Icon name={robo_token_gold_no_shining} className={`${styles.icon} ${styles.roboTokenGoldIcon}`} />
                                <RegularStyledText
                                    className={styles.iconContainerBtnText}
                                    textStyles={textStyles}
                                    text={rbaxValue.toString()}
                                />
                            </div>
                        </div>
                    </Button>
                );
            })
        }</div>
    )
}