import { FC, useRef, useState } from 'react'
import { useHandleClickOutside } from '@hooks/useHandleClickOutside'
import { IDropdownItem, IDropdownProps } from './Dropdown.models'
import styles from './Dropdown.module.scss'
import { DropdownItem } from './DropdownItem'
import { DropdownList } from './DropdownList'

export const Dropdown: FC<IDropdownProps> = ({ className, items, onSelect }: IDropdownProps) => {
    const [selectedItem, setSelectedItem] = useState<IDropdownItem | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

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
                    <DropdownItem selectedItem={selectedItem}/>
                ) : (
                    <span>Select: </span>
                )}
            </div>
            {isOpen && (<DropdownList items={items} handleSelect={handleSelect} />)}
        </div>
    )
}