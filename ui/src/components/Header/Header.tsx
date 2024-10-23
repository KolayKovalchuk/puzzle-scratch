import { FC } from 'react'

import styles from './Header.module.scss'
import { Icon } from '../shared/Icon/Icon'
import { Dropdown } from '../shared/Dropdown/Dropdown'

export const Header: FC = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.logo}>
                <Icon name='robo_token' iconSize='70%' className={styles.icon}></Icon>
            </div>
            <Dropdown
                items={[
                    { text: 'Item 1', icon: 'robo_token' },
                    { text: 'Item 2', icon: 'wallet' },
                    { text: 'Item 3', icon: 'avatar_placeholder' },
                ]}
                onSelect={(item) => console.log(item)}
                className={styles.dropdown}
            ></Dropdown>
            <div className={styles.profileContainer}>
                <Icon name='wallet' iconSize='58%' className={styles.icon}></Icon>
                <Icon name='avatar_placeholder' iconSize='85%' className={styles.icon}></Icon>
            </div>
        </div>
    )
}