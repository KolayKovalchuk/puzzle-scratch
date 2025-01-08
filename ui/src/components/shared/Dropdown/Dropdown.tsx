import { useHandleClickOutside } from '@hooks/useHandleClickOutside'
import { useEffect, useRef, useState } from 'react'
import { IDropdownItem, IDropdownProps } from './Dropdown.models'
import styles from './Dropdown.module.scss'
import { SelectedDropdownItem } from './DropdownItem'
import { DropdownList } from './DropdownList'

export function Dropdown({
    className,
    items,
    placeholder = 'Select: ',
    locale,
    selectedItem: selectedItemProp,
    onSelect,
    onOpenClose,
}: IDropdownProps) {
    const [selectedItem, setSelectedItem] = useState<IDropdownItem | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selectedItemProp && selectedItemProp !== selectedItem) {
            setSelectedItem(selectedItemProp)
        }
    }, [selectedItemProp])

    useEffect(() => {
        onOpenClose && onOpenClose(isOpen)
    }, [isOpen])

    const handleSelect = (item: IDropdownItem) => {
        setSelectedItem(item)
        onSelect(item)
        setIsOpen(false)
    }

    useHandleClickOutside(dropdownRef, () => setIsOpen(false))

    return (
        <div
            ref={dropdownRef}
            className={`${styles.dropdown} ${className}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className={styles.dropdownSelected}>
                {selectedItem ? (
                    <SelectedDropdownItem
                        isOpen={isOpen}
                        item={selectedItem}
                        locale={locale}
                    />
                ) : (
                    <span>{placeholder}</span>
                )}
            </div>
            {isOpen &&
                (<DropdownList
                    items={items}
                    selectedItem={selectedItem}
                    handleSelect={handleSelect}
                    locale={locale}
                />)
            }
        </div>
    )
}