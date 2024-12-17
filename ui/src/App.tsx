import { Header } from '@components/Header';
import styles from './App.module.scss';

import { LoadingScreen } from '@components/LoadingScreen/LoadingScreen';
import { useInitApp } from '@hooks/useInitApp';
import { AppRouter } from '@routers/router';
import { ROUTES } from '@routers/routerConfig';
import { selectUserAcceptedTerms, selectUserPreferredLocale } from '@store/selectors/user.selectors';
import store from '@store/store';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, useNavigate } from 'react-router-dom';

function App() {
    const {
        isLoaded,
        isFontListLoaded,
    } = useInitApp();

    const navigate = useNavigate();
    const isUserAcceptedTerms = useSelector(selectUserAcceptedTerms)
    const isPreferredLocaleSelected = !!useSelector(selectUserPreferredLocale)
    const shouldRedirectToLanguageSelect = !isPreferredLocaleSelected || !isUserAcceptedTerms;

    useEffect(() => {
        if (!isLoaded) return;

        if (shouldRedirectToLanguageSelect) {
            navigate(ROUTES.LanguageSelect);
        }
    }, [isLoaded, shouldRedirectToLanguageSelect, navigate]);

    if (!isFontListLoaded) {
        return null;
    }

    return (
        <div className={styles.mainContainer}>
            {isLoaded ? <>
                <Header />
                <AppRouter />
            </> : null}
            <LoadingScreen isLoaded={isLoaded} />
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
