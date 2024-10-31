import { LanguageSelect } from '@components/LanguageSelect/LanguageSelect';
import styles from './App.module.scss';

import { MainView } from '@components/MainView';
import { useInitWebApp } from '@hooks/useInitWebApp';
import { useFetchLocalizationData } from '@services/api/localization.service';
import { useLoginUser } from '@services/auth.service';
import { setIsPreferredLocaleSelectedToCloud, useGetIsPreferredLocaleSelectedFromCloud } from '@services/telegramCloud/preferredLocale.service';
import store from '@store/store';
import { Provider, useSelector } from 'react-redux';
import { selectPreferredLocale } from '@store/selectors/user.selectors';

function useInitApp() {
    const [, isUserLoggedIn] = useLoginUser();
    const [isLocLoaded] = useFetchLocalizationData()
    const [isPreferredLocaleSelected, setIsPreferredLocaleSelected, isPrefLocLoaded] = useGetIsPreferredLocaleSelectedFromCloud()
    useInitWebApp();

    const isLoaded = isUserLoggedIn && isLocLoaded && isPrefLocLoaded;

    return [isLoaded, isPreferredLocaleSelected, setIsPreferredLocaleSelected] as const;
}

function App() {
    const [isLoaded, isPreferredLocaleSelected, setIsPreferredLocaleSelected] = useInitApp();

    // TODO: remove test code when done
    const preferredLocale = useSelector(selectPreferredLocale)

    const onLangSelected = async () => {
        const result = await setIsPreferredLocaleSelectedToCloud(true)

        if (!result) {
            console.error('Failed to set isPreferredLocaleSelected to cloud');
            return;
        }

        setIsPreferredLocaleSelected(true)
    }

    if (!isLoaded) {
        return <div  className={`${styles.mainContainer} ${styles.loading}`}><span>Loading...</span></div>
    }

    // TODO: remove test code when done
    const onTestBtnClick = async () => {
        const result = await setIsPreferredLocaleSelectedToCloud(false)
        setIsPreferredLocaleSelected(false)
        console.log('testbtn setIsPreferredLocaleSelectedToCloud result:', result);

    }

    return (
        <div className={styles.mainContainer}>
            {!isPreferredLocaleSelected
                ? <LanguageSelect onLangSelected={() => onLangSelected()} isPreferredLocaleSelected={isPreferredLocaleSelected}></LanguageSelect>
                : <>
                    <MainView></MainView>

                    // TODO: remove test code when done
                    <div style={{
                        width: '100%',
                        height: '100px',
                        backgroundColor: 'lightgreen',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onClick={() => onTestBtnClick()}>Reset(only for test) Locale: {preferredLocale}</div>
                </>
            }
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
