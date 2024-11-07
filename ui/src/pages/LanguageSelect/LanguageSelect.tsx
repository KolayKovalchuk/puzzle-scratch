import { Dropdown, IDropdownItem } from '@components/shared/Dropdown';
import { TosApprovePopup } from '@components/TosApprovePopup/TosApprovePopup';
import { ROUTES } from '@routers/routerConfig';
import { aprooveUserTerms, selectUserLocale } from '@services/api/user.service';
import { selectSupportedLocales } from '@store/selectors/localization.selectors';
import { selectPreferredLocale, selectUserAcceptedTerms } from '@store/selectors/user.selectors';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './LanguageSelect.module.scss';

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

            if (!result) {
                console.error('Failed to set isPreferredLocaleSelected to cloud');
                return;
            }

            if (onLangSelected) onLangSelected(lang.data)
        } catch (error) {
            console.error('Error updating locale:', error);
        }
    }

    const [isTosApprovePopupOpen, setIsTosApprovePopupOpen] = useState<boolean>(false);
    const isUserAcceptedTerms = useSelector(selectUserAcceptedTerms)

    useEffect(() => {
        const isTosApprovePopupOpen = isPreferredLocaleSelected && !isUserAcceptedTerms
        setIsTosApprovePopupOpen(isTosApprovePopupOpen);
    }, [isPreferredLocaleSelected, isUserAcceptedTerms]);

    const navigate = useNavigate();

    const onTosApprove = async () => {
        const result = await aprooveUserTerms();

        if (!result) return;

        setIsTosApprovePopupOpen(false)
        navigate(ROUTES.Home)
    }

    const onTosDecline = () => {
        setIsTosApprovePopupOpen(false)
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
            <TosApprovePopup
                isOpen={isTosApprovePopupOpen}
                onConfirm={() => onTosApprove()}
                onClose={() => onTosDecline()}
            ></TosApprovePopup>
        </div>
    );
}
