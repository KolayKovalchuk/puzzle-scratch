import { useHandleClickOutside } from '@hooks/useHandleClickOutside'
import { useEffect, useRef, useState } from 'react'
import { IDropdownItem, IDropdownProps, TextAlign } from './Dropdown.models'
import styles from './Dropdown.module.scss'
import { SelectedDropdownItem } from './DropdownItem'
import { DropdownList } from './DropdownList'
import { useContainerDimensions } from '@hooks/useContainerDimensions'

function getTextAlignCssClass(textAlign: TextAlign) {
    switch (textAlign) {
        case 'left':
            return styles.left
        case 'right':
            return styles.right
        default:
            return styles.center
    }
}

export function Dropdown({
    className,
    items,
    placeholder = 'Select: ',
    locale,
    selectedItem: selectedItemProp,
    onSelect,
    onOpenClose,
    textAlign = 'left',
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

    const { dimensions } = useContainerDimensions(dropdownRef)
    const maxDropdownListHeight = dimensions.height * 4.6

    const textAlignClassname = getTextAlignCssClass(textAlign)

    return (
        <div
            ref={dropdownRef}
            className={`${styles.dropdown} ${textAlignClassname} ${className}`}
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
                    maxHeight={maxDropdownListHeight}
                />)
            }
        </div>
    )
}