import { Header } from '@components/Header';
import styles from './App.module.scss';

import { useInitApp } from '@hooks/useInitApp';
import { AppRouter } from '@routers/router';
import { ROUTES } from '@routers/routerConfig';
import { setIsPreferredLocaleSelectedToCloud } from '@services/telegramCloud/preferredLocale.service';
import { selectPreferredLocale, selectUserAcceptedTerms } from '@store/selectors/user.selectors';
import store from '@store/store';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';

// TODO: remove test code when done
function TestBtn({ click }: { click: () => void }) {
    const preferredLocale = useSelector(selectPreferredLocale)

    return (
        <div style={{
            width: '100%',
            backgroundColor: 'lightgreen',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }} onClick={() => click()}>Reset(only for test) Locale: {preferredLocale}</div>
    )
}

function App() {
    const [isLoaded, isPreferredLocaleSelected, setIsPreferredLocaleSelected] = useInitApp();

    const navigate = useNavigate();
    const isUserAcceptedTerms = useSelector(selectUserAcceptedTerms)
    const shouldRedirectToLanguageSelect = !isPreferredLocaleSelected || !isUserAcceptedTerms;

    useEffect(() => {
        if (!isLoaded) return;

        if (shouldRedirectToLanguageSelect) {
            navigate(ROUTES.LanguageSelect);
        }
    }, [isLoaded, shouldRedirectToLanguageSelect, navigate]);

    const location = useLocation();

    if (!isLoaded) {
        return <div className={`${styles.mainContainer} ${styles.loading}`}><span>Loading...</span></div>
    }

    const onLangSelected = async () => {
        setIsPreferredLocaleSelected(true)
    }

    const languageSelectProps = {
        onLangSelected,
        isPreferredLocaleSelected,
    }
    // TODO: remove test code when done
    const onTestBtnClick = async () => {
        const result = await setIsPreferredLocaleSelectedToCloud(false)
        setIsPreferredLocaleSelected(false)
        console.log('testbtn setIsPreferredLocaleSelectedToCloud result:', result);
    }

    return (
        <div className={styles.mainContainer}>
            <Header />
            <AppRouter languageSelectProps={languageSelectProps} />

            {/* // TODO: remove test code when done */}
            { location.pathname === ROUTES.Home && <TestBtn click={() => onTestBtnClick()}/>}
        </div>
    )
};

function Root() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    )
};

export default Root;
