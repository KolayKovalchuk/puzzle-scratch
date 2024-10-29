import { Icon } from '@components/shared/Icon';
import { PriceLabel } from '@components/shared/PriceLabel/PriceLabel';
import { FC } from 'react';
import styles from './BatchCard.module.scss';

import play_text from '@icons/play_text.svg';


export interface IBatchCardProps { }

export const BatchCard: FC<IBatchCardProps> = ({ }) => {
    return (
        <div className={styles.container}>
            <div className={styles.mainCover}>
                <img src="/batchCoverExample1.png" alt="cover" />
                <PriceLabel price={100} className={styles.priceLabel}></PriceLabel>
            </div>
            <div className={styles.footer}>
                <div className={styles.playButton}>
                    {/* <span className={styles.playLabel}>Play</span> */}
                    <Icon name={play_text} className={styles.playIcon}></Icon>
                </div>
            </div>
        </div>
    )
}