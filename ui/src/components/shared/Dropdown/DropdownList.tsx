import styles from './Dropdown.module.scss'

import { IDropdownListProps } from './Dropdown.models'
import { DropdownItem } from './DropdownItem'


export function DropdownList({ items, handleSelect }: IDropdownListProps) {
    return (
        <ul className={styles.dropdownList}>
            {items.map((item, index) => (
                <DropdownItem key={index} selectedItem={item} onClick={(item) => handleSelect(item)}/>
            ))}
        </ul>
    )
}
