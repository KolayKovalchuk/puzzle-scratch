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

export interface IBatchCardProps {
    className?: string;
    batchCard: BatchCard;
}

export function BatchCardComponent({ className, batchCard }: IBatchCardProps) {
    const { headerType, batchCardClass, batchImageUrl } = useGetBatchCardConfig(batchCard.cardType, styles);

    const navigate = useNavigate();
    const batchClickHandler = useBatchCardHandler(batchCard, navigate)
    const fontSize = 21;
    return (
        <div
            className={`${styles.container} ${batchCardClass} ${className || ''}`}
            onClick={batchClickHandler}
        >
            <Icon name={coming_soon} className={styles.comingSoonIcon}></Icon>
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
                        <span>Prize pool</span>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.priceLabel}>
                            <Icon name={robo_token_no_bg} className={styles.token_icon}></Icon>
                            <StyledText textStyles={{ fontSize }} className={styles.amount} text={batchCard.pricePerCard + ''}></StyledText>
                        </div>
                        <Icon name={hint} className={styles.hint_icon}></Icon>
                    </div>
                </div>
            </StyledHeader>
        </div>
    )
}