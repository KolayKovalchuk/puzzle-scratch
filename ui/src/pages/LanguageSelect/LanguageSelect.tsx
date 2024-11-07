import { Dropdown, IDropdownItem } from '@components/shared/Dropdown';
import { SecondaryStyledText } from '@components/shared/StyledText';
import { TosApprovePopup } from '@components/TosApprovePopup/TosApprovePopup';
import { ROUTES } from '@routers/routerConfig';
import { aprooveUserTerms, selectUserLocale } from '@services/api/user.service';
import { selectLocalValue, selectSupportedLocales } from '@store/selectors/localization.selectors';
import { selectPreferredLocale, selectUserAcceptedTerms } from '@store/selectors/user.selectors';
import WebApp from '@twa-dev/sdk';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './LanguageSelect.module.scss';
import { Button } from '@components/shared/Button/Button';
import store from '@store/store';
import { updateUserLocale } from '@store/actions/user.actions';
import { useContainerDimensions } from '@hooks/useContainerDimensions';

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
    const supportLocaleItems = useMemo(() => getSupportLocalesItems(supportLocales), [supportLocales])
    const preferredLocaleState = useSelector(selectPreferredLocale)
    const telegramLocale = WebApp.initDataUnsafe.user?.language_code
    const preferredLocale: string | undefined = isPreferredLocaleSelected ? preferredLocaleState : telegramLocale

    const preselectedLocale = useMemo(() => getPreselectedLocale(
        supportLocaleItems,
        preferredLocale || '',
    ), [supportLocaleItems, preferredLocale])

    useEffect(() => {
        store.dispatch(updateUserLocale(preselectedLocale.data));
    }, [preselectedLocale]);

    const headerText = useSelector(selectLocalValue('txt.lang.title'))
    const secondHeaderText = useSelector(selectLocalValue('txt.languageSelect.selectYourLanguage'))
    const dropdownLabel = useSelector(selectLocalValue('txt.lang.language'))
    const buttonText = useSelector(selectLocalValue('txt.btn.select'))

    const [selectedLocale, setSelectedLocale] = useState<IDropdownItem | null>(null)

    const { containerRef, dimensions } = useContainerDimensions();

    const headerStyles = {
        fontSize: 40,
        wordWrap: true,
        wordWrapWidth: dimensions.width
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer} ref={containerRef}>
                <SecondaryStyledText text={headerText} className={styles.header} textStyles={headerStyles}></SecondaryStyledText>

                <div className={styles.h2}>{secondHeaderText}</div>

                <div className={styles.dropdownContainer}>
                    <span className={styles.dropdownLabel}>{dropdownLabel}</span>
                    <Dropdown
                        items={supportLocaleItems}
                        selectedItem={preselectedLocale}
                        onSelect={(data) => {
                            setSelectedLocale(data)
                            store.dispatch(updateUserLocale(data.data));
                        }}
                    />
                </div>
            </div>

            <Button className={`${styles.selectBtn}`} text={buttonText} isConfirm onClick={() => {
                if (!isUserAcceptedTerms) {
                    setIsTosApprovePopupOpen(true)
                } else

                if (selectedLocale) {
                    onLangSelect(selectedLocale)
                }
            }}></Button>

            <TosApprovePopup
                isOpen={isTosApprovePopupOpen}
                onConfirm={() => onTosApprove()}
                onClose={() => onTosDecline()}
            ></TosApprovePopup>
        </div>
    );
}
