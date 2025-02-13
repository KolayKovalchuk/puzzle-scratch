import { useNavigate } from 'react-router-dom';
import styles from './BatchCard.module.scss';


import { Icon } from '@components/shared/Icon';
import { StyledHeader } from '@components/shared/StyledHeader';
import { StyledText } from '@components/shared/StyledText';
import { BatchCard, BatchStatus } from '@models/BatchCard.model';

import { useBatchCardHandler, useGetBatchCardConfig } from './hooks/useGetBatchCardConfig';

import batch_ribbon from '@icons/batch_ribbon.svg';
import hint from '@icons/hint.svg';
import robo_token_no_bg from '@icons/robo_token_no_bg.svg';
import { formatNumber } from '@utils/formatters/formatNumber';
import { GameInfoPopup } from './GameInfoPopup/GameInfoPopup';
import { MouseEvent, useCallback, useState } from 'react';

export interface IBatchCardProps {
    className?: string;
    batchCard: BatchCard;
}

function getRibbonLabel(status: BatchStatus) {
    switch (status) {
        case BatchStatus.SCHEDULED:
            return 'COMING SOON!';
        case BatchStatus.EXPIRED:
        case BatchStatus.DEPLETED:
        case BatchStatus.STOPPED:
            return 'SOLD OUT';
        default:
            return '';
    }
}

export function BatchCardComponent({ className, batchCard }: IBatchCardProps) {
    const { headerType, batchCardClass, batchImageUrl } = useGetBatchCardConfig(batchCard.cardType, styles);

    const [isGameInfoPopupOpen, setIsGameInfoPopupOpen] = useState(false);

    const onCloseGameInfoPopup = useCallback(() => {
        setIsGameInfoPopupOpen(false);
    }, []);

    const onHintIconClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsGameInfoPopupOpen(true);
    }, []);

    const navigate = useNavigate();
    const batchClickHandler = useBatchCardHandler(batchCard, navigate)
    const fontSize = 21;

    const isRibbonVisible = batchCard.status !== BatchStatus.AVAILABLE;
    const ribbonLabel = getRibbonLabel(batchCard.status);
    return (
        <div
            className={`${styles.container} ${batchCardClass} ${className || ''}`}
            onClick={batchClickHandler}
        >
            {isRibbonVisible &&
                <div className={styles.ribbonContainer}>
                    <Icon name={batch_ribbon} className={styles.ribbonIcon}></Icon>
                    <span
                        className={styles.ribbonText}
                    >{ribbonLabel}</span>
                </div>
            }
            <StyledHeader
                title={batchCard.batchName}
                className={styles.styledHeader}
                type={headerType}
                fontSize={fontSize}
                height='42px'
            >
                <div className={`${styles.content}`}>
                    <div className={styles.mainCover}>
                        <img src={batchImageUrl} alt="cover" />
                    </div>
                    <div className={styles.prizePool}>
                        <span className={styles.prizePoolLabel}>{formatNumber(batchCard.maxPrize)}</span>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.priceLabel}>
                            <Icon name={robo_token_no_bg} className={styles.token_icon}></Icon>
                            <StyledText
                                textStyles={{ fontSize }}
                                className={styles.amount}
                                text={batchCard.pricePerCard + ''}
                                textFitCoefficient={1.2}
                            ></StyledText>
                        </div>
                        <Icon name={hint} className={styles.hint_icon} onClick={onHintIconClick}></Icon>
                    </div>
                </div>
            </StyledHeader>
            <GameInfoPopup
                isOpen={isGameInfoPopupOpen}
                onClose={onCloseGameInfoPopup}
                batchCardType={batchCard.cardType}
            />
        </div>
    )
}