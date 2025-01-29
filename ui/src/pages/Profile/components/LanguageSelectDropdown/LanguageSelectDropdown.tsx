import { Dropdown, IDropdownItem } from '@components/shared/Dropdown';
import styles from './LanguageSelectDropdown.module.scss';
import { useSelector } from 'react-redux';
import { selectLocalValue } from '@store/selectors/localization.selectors';
import { useSupportLocaleItems } from '@hooks/useSupportLocaleItems';
import { selectUserPreferredLocale } from '@store/selectors/user.selectors';
import { useEffect, useState } from 'react';
import { selectUserLocale } from '@services/api/user.service';

export interface ILanguageSelectDropdownProps {
}

export function LanguageSelectDropdown({ }: ILanguageSelectDropdownProps) {
    const dropdownLabel = useSelector(selectLocalValue('txt.lang.language'));
    const supportLocaleItems = useSupportLocaleItems()

    const userLocale = useSelector(selectUserPreferredLocale);
    const [preselectedLocale, setPreselectedLocale] = useState<IDropdownItem | null>(null);

    useEffect(() => {
        if (!userLocale) return;

        setPreselectedLocale({
            text: `lang.${userLocale.toLowerCase()}`,
            icon: null,
            data: userLocale
        })
    }, [userLocale])

    const [selectedLocale, setSelectedLocale] = useState<IDropdownItem | null>(null);
    useEffect(() => {
        if (!selectedLocale) return;

        selectUserLocale(selectedLocale?.data)
    }, [selectedLocale])

    return (
        <div className={styles.dropdownContainer}>
            <span className={styles.dropdownLabel}>{dropdownLabel}</span>
            <Dropdown
                items={supportLocaleItems}
                selectedItem={preselectedLocale}
                locale={selectedLocale?.data}
                onSelect={setSelectedLocale}
            />
        </div>
    );
}
