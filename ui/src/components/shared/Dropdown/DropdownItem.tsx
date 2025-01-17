import { Icon } from '@components/shared/Icon'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { useSelector } from 'react-redux'
import { IDropdownItemProps, ISelectedDropdownItemProps } from './Dropdown.models'
import styles from './Dropdown.module.scss'

import arrowIcon from '@icons/arrow.svg';


export function DropdownItem({ item, selected, locale, onClick = () => {} }: IDropdownItemProps) {
    let className = styles.dropdownListItem
    if (selected) {
        className += ` ${styles.selected}`
    }

    const label = useSelector(selectLocalValue(item.text, locale))

    return (
        <div className={className} onClick={() => onClick(item)}>
            { item.icon ? <Icon name={item.icon} className={styles.icon} /> : null }
            <span>{label}</span>
        </div>
    )
}

export function SelectedDropdownItem({ item, isOpen, locale }: ISelectedDropdownItemProps) {
    const label = useSelector(selectLocalValue(item.text, locale))

    return (
        <div className={`${styles.dropdownListItem} ${isOpen ? styles.open : ''}`}>
            <span>{label}</span>
            <Icon name={arrowIcon} className={`${styles.arrowIcon} ${isOpen ? styles.open : ''}`} />
        </div>
    )
}
