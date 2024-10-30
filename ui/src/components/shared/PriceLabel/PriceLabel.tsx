import { Icon } from '@components/shared/Icon';
import { formatNumber } from '@utils/formatters/formatNumber';
import styles from './PriceLabel.module.scss';

import robo_token_no_bg from '@icons/robo_token_no_bg.svg';


export interface IPriceLabelProps {
    price: number,
    className?: string
}

export function PriceLabel({ price, className = '' }: IPriceLabelProps) {
    return (
        <div className={`${styles.price} ${className}`}>
            <Icon name={robo_token_no_bg} className={styles.token_icon}></Icon>
            <span className={styles.priceValue}>{ formatNumber(price) }</span>
        </div>
    )
}