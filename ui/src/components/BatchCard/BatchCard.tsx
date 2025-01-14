import { useNavigate } from 'react-router-dom';
import styles from './BatchCard.module.scss';


import { Icon } from '@components/shared/Icon';
import { StyledHeader } from '@components/shared/StyledHeader';
import { StyledText } from '@components/shared/StyledText';
import { BatchCard } from '@models/BatchCard.model';

import { useBatchCardHandler, useGetBatchCardConfig } from './hooks/useGetBatchCardConfig';

import coming_soon from '@icons/coming_soon.svg';
import hint from '@icons/hint.svg';
import robo_token_no_bg from '@icons/robo_token_no_bg.svg';
import { formatNumber } from '@utils/formatters/formatNumber';
import { GameInfoPopup } from './GameInfoPopup/GameInfoPopup';
import { MouseEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsQaUser } from '@store/selectors/user.selectors';

export interface IBatchCardProps {
    className?: string;
    batchCard: BatchCard;
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

    const isQaUser = useSelector(selectIsQaUser);
    return (
        <div
            className={`${styles.container} ${batchCardClass} ${className || ''}`}
            onClick={batchClickHandler}
        >
            {!isQaUser && <Icon name={coming_soon} className={styles.comingSoonIcon}></Icon>}
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
                            <StyledText textStyles={{ fontSize }} className={styles.amount} text={batchCard.pricePerCard + ''}></StyledText>
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