import { LanguageSelect } from '@components/LanguageSelect/LanguageSelect';
import styles from './App.module.scss';

import { MainView } from '@components/MainView';
import { TosApprovePopup } from '@components/TosApprovePopup/TosApprovePopup';
import { useInitApp } from '@hooks/useInitApp';
import { aprooveUserTerms } from '@services/api/user.service';
import { setIsPreferredLocaleSelectedToCloud } from '@services/telegramCloud/preferredLocale.service';
import { selectPreferredLocale, selectUserAcceptedTerms } from '@store/selectors/user.selectors';
import store from '@store/store';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';

function App() {
    const [isLoaded, isPreferredLocaleSelected, setIsPreferredLocaleSelected] = useInitApp();

    const isUserAcceptedTerms = useSelector(selectUserAcceptedTerms)
    const isMainViewAvailable = isPreferredLocaleSelected && isUserAcceptedTerms;

    const [isTosApprovePopupOpen, setIsTosApprovePopupOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsTosApprovePopupOpen(isPreferredLocaleSelected && !isUserAcceptedTerms);
    }, [isPreferredLocaleSelected, isUserAcceptedTerms]);

    // TODO: remove test code when done
    const preferredLocale = useSelector(selectPreferredLocale)

    if (!isLoaded) {
        return <div  className={`${styles.mainContainer} ${styles.loading}`}><span>Loading...</span></div>
    }

    const onLangSelected = async () => {
        const result = await setIsPreferredLocaleSelectedToCloud(true)

        if (!result) {
            console.error('Failed to set isPreferredLocaleSelected to cloud');
            return;
        }

        setIsPreferredLocaleSelected(true)

        if (!isUserAcceptedTerms) {}
    }

    const onTosApprove = async () => {
        await aprooveUserTerms();
        setIsTosApprovePopupOpen(false)
    }

    const onTosDecline = () => {
        setIsTosApprovePopupOpen(false)
        WebApp.close();
    }


    // TODO: remove test code when done
    const onTestBtnClick = async () => {
        const result = await setIsPreferredLocaleSelectedToCloud(false)
        setIsPreferredLocaleSelected(false)
        console.log('testbtn setIsPreferredLocaleSelectedToCloud result:', result);
    }

    return (
        <div className={styles.mainContainer}>
            {!isMainViewAvailable
                ? <LanguageSelect onLangSelected={() => onLangSelected()} isPreferredLocaleSelected={isPreferredLocaleSelected}></LanguageSelect>
                : <>
                    <MainView></MainView>
                </>
            }

            <TosApprovePopup
                isOpen={isTosApprovePopupOpen}
                onConfirm={() => onTosApprove()}
                onClose={() => onTosDecline()}
                ></TosApprovePopup>
            {/* // TODO: remove test code when done */}
            <div style={{
                width: '100%',
                height: '100px',
                backgroundColor: 'lightgreen',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} onClick={() => onTestBtnClick()}>Reset(only for test) Locale: {preferredLocale}</div>
        </div>
    );
};

function Root() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
};

export default Root;
