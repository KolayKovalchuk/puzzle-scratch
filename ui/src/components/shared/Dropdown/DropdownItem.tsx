import { Icon } from '@components/shared/Icon'
import { IDropdownItemProps } from './Dropdown.models'
import styles from './Dropdown.module.scss'

export function DropdownItem({ selectedItem, onClick = () => {} }: IDropdownItemProps) {
    return (
        <div className={styles.dropdownListItem} onClick={() => onClick(selectedItem)}>
            { selectedItem.icon ? <Icon name={selectedItem.icon} className={styles.icon} /> : null }
            <span>{selectedItem.text}</span>
        </div>
    )
}
