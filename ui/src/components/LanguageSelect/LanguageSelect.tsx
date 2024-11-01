import { Dropdown, IDropdownItem } from '@components/shared/Dropdown';
import { selectUserLocale } from '@services/api/user.service';
import { selectSupportedLocales } from '@store/selectors/localization.selectors';
import { selectPreferredLocale } from '@store/selectors/user.selectors';
import { useSelector } from 'react-redux';
import styles from './LanguageSelect.module.scss';
import WebApp from '@twa-dev/sdk';

export interface ILanguageSelectProps {
    onLangSelected?: (lang: string) => void | Promise<void>,
    isPreferredLocaleSelected: boolean
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

function getPreselectedLocale(
    supportLocaleItems: IDropdownItem[],
    preferredLocale: string,
): IDropdownItem {
    if (!preferredLocale) return supportLocaleItems[0]

    const preselectedLocale = supportLocaleItems.find((item) => {
        return item.data.toLowerCase() === preferredLocale.toLowerCase()
    })

    return preselectedLocale || supportLocaleItems[0]
}

export function LanguageSelect({ onLangSelected, isPreferredLocaleSelected }: ILanguageSelectProps) {
    const onLangSelect = async (lang: IDropdownItem) => {
        try {
            const result = await selectUserLocale(lang.data)
            if (!result) return

            if (onLangSelected) onLangSelected(lang.data)
        } catch (error) {
            console.error('Error updating locale:', error);
        }
    }

    const supportLocales = useSelector(selectSupportedLocales)
    const supportLocaleItems = getSupportLocalesItems(supportLocales)
    const preferredLocaleState = useSelector(selectPreferredLocale)
    const telegramLocale = WebApp.initDataUnsafe.user?.language_code
    const preferredLocale: string | undefined = isPreferredLocaleSelected ? preferredLocaleState : telegramLocale

    const preselectedLocale = getPreselectedLocale(
        supportLocaleItems,
        preferredLocale || '',
    )

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
