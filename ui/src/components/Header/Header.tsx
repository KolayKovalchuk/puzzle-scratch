
import { Icon } from '@components/shared/Icon'
import { formatNumber } from '@utils/formatters/formatNumber'
import styles from './Header.module.scss'

import avatar_placeholder from '@icons/avatar_placeholder.svg'
import logo from '@icons/logo.svg'
import robo_token from '@icons/robo_token.svg'
import wallet from '@icons/wallet.svg'

export function Header() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.logo}>
                <Icon name={logo} className={styles.logoIcon}></Icon>
            </div>
            <div className={styles.currency_info_container}>
                <Icon name={robo_token} className={styles.token_icon}></Icon>
                <span className={styles.amount_value}>{formatNumber(10000)}</span>
            </div>
            <div className={styles.profileContainer}>
                <Icon name={wallet} iconSize='58%' className={styles.icon}></Icon>
                <Icon name={avatar_placeholder} iconSize='85%' className={styles.icon}></Icon>
            </div>
        </div>
    )
}