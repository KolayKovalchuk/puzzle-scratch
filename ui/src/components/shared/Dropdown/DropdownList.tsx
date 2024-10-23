import styles from './Dropdown.module.scss'

import { FC } from 'react'
import { IDropdownListProps } from './Dropdown.models'
import { DropdownItem } from './DropdownItem'


export const DropdownList: FC<IDropdownListProps> = ({ items, handleSelect }) => {
    return (
        <ul className={styles.dropdownList}>
            {items.map((item, index) => (
                <DropdownItem key={index} selectedItem={item} onClick={(item) => handleSelect(item)}/>
            ))}
        </ul>
    )
}
