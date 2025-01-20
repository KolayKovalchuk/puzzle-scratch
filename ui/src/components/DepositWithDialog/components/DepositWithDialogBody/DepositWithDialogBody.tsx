import { useButtonConfig } from '@components/shared/Button/hooks/useButtonConfig';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Button, ButtonType } from '@components/shared/Button/Button';
import { Icon } from '@components/shared/Icon';
import { RegularStyledText } from '@components/shared/StyledText';

import styles from './DepositWithDialogBody.module.scss';

import robo_token_gold_no_shining from '@icons/robo_token_gold_no_shining.svg';
import { useGetWidestChild, widestChildTargetClassName } from '@hooks/useGetWidestChild';

export interface IDepositWithDialogBodyProps {
    onSelectStars: () => void;
    onSelectTransfer: () => void;
}

export function DepositWithDialogBody({ onSelectStars, onSelectTransfer }: IDepositWithDialogBodyProps) {
    const contentText = useSelector(selectLocalValue('deposit.select.text'))
    const selectStarsLabel = useSelector(selectLocalValue('deposit.select.stars'))
    const transferBtnText = useSelector(selectLocalValue('deposit.select.transfer'))

    const { textStyles } = useButtonConfig(ButtonType.Confirm, styles);

    const { containerRef, width: btnWidth } = useGetWidestChild();

    const onSelectStarsCb = useCallback(async () => {
        onSelectStars();
    }, [onSelectStars]);

    const onSelectTransferCb = useCallback(() => {
        console.log('Transfer button clicked');
        onSelectTransfer();
    }, [onSelectTransfer]);

    return (<div className={styles.container} ref={containerRef}>
        <span className={styles.contentText}>{contentText}</span>
        <div className={`${styles.btnContainer} ${!btnWidth ? styles.hidden : ''}`}>
            <Button
                className={`${widestChildTargetClassName} ${styles.btn}`}
                text={selectStarsLabel}
                mode={ButtonType.Confirm}
                onClick={onSelectStarsCb}
                style={{ width: btnWidth || 'auto' }}
            >
            </Button>
            <Button
                className={`${widestChildTargetClassName} ${styles.btn} ${styles.iconContainerBtn}`}
                mode={ButtonType.Confirm}
                onClick={onSelectTransferCb}
                style={{ width: btnWidth || 'auto' }}
            >
                <div className={styles.iconContainerBtnContent}>
                    <Icon name={robo_token_gold_no_shining} className={`${styles.icon} ${styles.roboTokenGoldIcon}`} />
                    <RegularStyledText
                        text={transferBtnText}
                        className={styles.iconContainerBtnText}
                        textStyles={textStyles} />
                </div>
            </Button>
        </div>
    </div>);
}
