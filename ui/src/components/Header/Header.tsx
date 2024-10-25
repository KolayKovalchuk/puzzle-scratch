import { FC } from 'react'

import { Icon } from '../shared/Icon/Icon'
import styles from './Header.module.scss'
import { formatNumber } from '../../utils/formatters/numberFormatter'

export const Header: FC = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.logo}>
                <Icon name='logo' className={styles.logoIcon}></Icon>
            </div>
            <div className={styles.currency_info_container}>
                <Icon name='robo_token' className={styles.token_icon}></Icon>
                <span className={styles.amount_value}>{formatNumber(10000)}</span>
            </div>
            <div className={styles.profileContainer}>
                <Icon name='wallet' iconSize='58%' className={styles.icon}></Icon>
                <Icon name='avatar_placeholder' iconSize='85%' className={styles.icon}></Icon>
            </div>
        </div>
    )
}