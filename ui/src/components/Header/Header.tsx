import { FC } from 'react'

import styles from './Header.module.scss'
import { Icon } from '../shared/Icon/Icon'
import { Dropdown } from '../shared/Dropdown/Dropdown'

export const Header: FC = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.logo}>
                {/* <Icon
                    src="./icons/tocken.png"
                    alt="logo"
                    className={`${styles.icon}`}></Icon> */}
                <Icon name='robo_token' className={styles.icon}></Icon>
            </div>
            <Dropdown className={styles.centeredDropdown}></Dropdown>
            <div className={styles.profileContainer}>
                {/* <Icon
                    src="./icons/wallet.svg"
                    alt="wallet"
                    className={styles.icon}
                ></Icon> */}
                <Icon name='wallet' size={'70%'} className={styles.icon}></Icon>
            </div>
        </div>
    )
}