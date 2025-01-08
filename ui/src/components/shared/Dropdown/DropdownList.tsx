import styles from './Dropdown.module.scss'

import { IDropdownListProps } from './Dropdown.models'
import { DropdownItem } from './DropdownItem'


export function DropdownList({ items, locale, handleSelect, selectedItem }: IDropdownListProps) {
    return (
        <ul className={styles.dropdownList}>
            {items.map((item, index) => (
                <DropdownItem
                    selected={selectedItem === item}
                    key={index}
                    item={item}
                    onClick={(item) => handleSelect(item)}
                    locale={locale}
                />
            ))}
        </ul>
    )
}
