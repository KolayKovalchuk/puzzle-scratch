import { FC } from 'react'
import { Icon } from '../Icon/Icon'
import { IDropdownItemProps } from './Dropdown.models'
import styles from './Dropdown.module.scss'


export const DropdownItem: FC<IDropdownItemProps> = ({ selectedItem, onClick = () => {} }) => {
    return (
        <div className={styles.dropdownListItem} onClick={() => onClick(selectedItem)}>
            { selectedItem.icon ? <Icon name={selectedItem.icon} className={styles.icon} /> : null }
            <span>{selectedItem.text}</span>
        </div>
    )
}
