import { Icon } from '@components/shared/Icon'
import { selectLocalValue } from '@store/selectors/localization.selectors'
import { useSelector } from 'react-redux'
import { IDropdownItemProps } from './Dropdown.models'
import styles from './Dropdown.module.scss'

export function DropdownItem({ item, selected, onClick = () => {} }: IDropdownItemProps) {
    let className = styles.dropdownListItem
    if (selected) {
        className += ` ${styles.selected}`
    }

    const label = useSelector(selectLocalValue(item.text))

    return (
        <div className={className} onClick={() => onClick(item)}>
            { item.icon ? <Icon name={item.icon} className={styles.icon} /> : null }
            <span>{label}</span>
        </div>
    )
}
