import { Icon } from '@components/shared/Icon';
import styles from './BatchCard.module.scss';

import { StyledHeader } from '@components/shared/StyledHeader';

import { StyledHeaderText } from '@components/shared/StyledHeaderText';
import hint from '@icons/hint.svg';
import robo_token_no_bg from '@icons/robo_token_no_bg.svg';
import { BatchCard } from '@models/BatchCard';
import { useGetBatchCardConfig } from './hooks/useGetBatchCardConfig';

export interface IBatchCardProps {
    className?: string;
    batchCard: BatchCard;
}

export function BatchCardComponent({ className, batchCard }: IBatchCardProps) {
    const { headerType, batchCardClass, batchImageUrl } = useGetBatchCardConfig(batchCard.cardType, styles);
    const fontSize = 21;
    return (
        <div className={`${styles.container} ${batchCardClass} ${className || ''}`}>
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
                        <div className={styles.prizePool}>
                            <span>Prize pool</span>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <Icon name={robo_token_no_bg} className={styles.token_icon}></Icon>
                        <StyledHeaderText fontSize={fontSize} className={styles.amount} text='1500'></StyledHeaderText>
                        <Icon name={hint} className={styles.hint_icon}></Icon>
                    </div>
                </div>
            </StyledHeader>
        </div>
    )
}