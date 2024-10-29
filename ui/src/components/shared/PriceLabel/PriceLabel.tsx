import { FC } from 'react';
import styles from './PriceLabel.module.scss'
import { Icon } from '../Icon/Icon';
import { formatNumber } from '../../../utils/formatters/formatNumber';

import robo_token_no_bg from '../../../assets/icons/robo_token_no_bg.svg';


export interface IPriceLabelProps {
    price: number,
    className?: string
}

export const PriceLabel: FC<IPriceLabelProps> = ({ price, className = '' }) => {
    return (
        <div className={`${styles.price} ${className}`}>
            <Icon name={robo_token_no_bg} className={styles.token_icon}></Icon>
            <span className={styles.priceValue}>{ formatNumber(price) }</span>
        </div>
    )
}