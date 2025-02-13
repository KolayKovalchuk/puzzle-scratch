import { IDropdownItem } from '@components/shared/Dropdown';
import { selectSupportedLocales } from '@store/selectors/localization.selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function getSupportLocalesItems(supportLocales: string[]): IDropdownItem[] {
    return supportLocales.map((locale) => {
        return {
            text: `lang.${locale.toLowerCase()}`,
            icon: null,
            data: locale
        }
    })
}

export function useSupportLocaleItems(): IDropdownItem[] {
    const supportLocales = useSelector(selectSupportedLocales);

    return useMemo(() => getSupportLocalesItems(supportLocales), [supportLocales])
}