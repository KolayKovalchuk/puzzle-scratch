import styles from './Dropdown.module.scss'

import { IDropdownItem, IDropdownListProps } from './Dropdown.models'
import { DropdownItem } from './DropdownItem'
import { useEffect, useState } from 'react'


export function DropdownList({
    items,
    locale,
    handleSelect,
    selectedItem,
    maxHeight,
    showSelectedItemInList = true
}: IDropdownListProps) {
    const [ itemsToShow, setItemsToShow ] = useState<IDropdownItem[]>(items)

    useEffect(() => {
        if (!showSelectedItemInList && selectedItem) {
            const newItems = items.filter(item => item !== selectedItem)
            setItemsToShow(newItems)
        } else {
            setItemsToShow(items)
        }
    }, [items, selectedItem, showSelectedItemInList])
    
    return (
        <ul className={styles.dropdownList} style={{ maxHeight }}>
            {itemsToShow.map((item, index) => (
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
