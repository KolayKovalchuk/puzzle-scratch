import { Dropdown, IDropdownItem } from '@components/shared/Dropdown';
import styles from './LanguageSelect.module.scss';
import { useSelector } from 'react-redux';
import { selectSupportedLocales } from '@store/selectors/localization.selectors';
import { selectPreferredLocale } from '@store/selectors/user.selectors';
import { postUserLocale } from '@services/api/user.service';

export interface ILanguageSelectProps {
    onLangSelected: (lang: string) => void | Promise<void>
}

function getSupportLocalesItems(supportLocales: string[]): IDropdownItem[] {
    return supportLocales.map((locale) => {
        return {
            text: `lang.${locale.toLowerCase()}`,
            icon: null,
            data: locale
        }
    })
}

function getPreselectedLocale(supportLocaleItems: IDropdownItem[], preferredLocale: string): IDropdownItem {
    const preselectedLocale = supportLocaleItems.find((item) => item.data.toLowerCase() === preferredLocale.toLowerCase())

    return preselectedLocale || supportLocaleItems[0]
}

export function LanguageSelect({ onLangSelected }: ILanguageSelectProps) {
    const onLangSelect = async (lang: IDropdownItem) => {
        try {
            console.log('lang selected:', lang);
            const result = await postUserLocale(lang.data)
    
            if (!result) {
                console.error('Failed to update locale:', lang);
            }
    
            onLangSelected(lang.data)
        
        } catch (error) {
            console.error('Error updating locale:', error);
        }
    }

    const supportLocales = useSelector(selectSupportedLocales)
    const supportLocaleItems = getSupportLocalesItems(supportLocales)
    const preferredLocale = useSelector(selectPreferredLocale)
    const preselectedLocale = getPreselectedLocale(supportLocaleItems, preferredLocale || '')

    return (
        <div className={styles.container}>
            <Dropdown
                items={supportLocaleItems}
                selectedItem={preselectedLocale}
                onSelect={(data) => {
                    onLangSelect(data)
                }}
            />
        </div>
    );
}
