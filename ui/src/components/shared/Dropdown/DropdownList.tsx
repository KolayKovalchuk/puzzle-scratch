import styles from './Dropdown.module.scss'

import { IDropdownListProps } from './Dropdown.models'
import { DropdownItem } from './DropdownItem'


export function DropdownList({
    items,
    locale,
    handleSelect,
    selectedItem,
    maxHeight,
}: IDropdownListProps) {
    return (
        <ul className={styles.dropdownList} style={{ maxHeight }}>
            {items.map((item, index) => (
                <DropdownItem
                    selected={selectedItem?.text === item.text}
                    key={index}
                    item={item}
                    onClick={(item) => handleSelect(item)}
                    locale={locale}
                />
            ))}
        </ul>
    )
}
