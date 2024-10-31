import './App.css';


import { MainView } from '@components/MainView';
import { useInitWebApp } from '@hooks/useInitWebApp';
import { useFetchLocalizationData } from '@services/api/localizationService';
import { useLoginUser } from '@services/authService';
import store from '@store/store';
import { Provider } from 'react-redux';



function App() {
    useInitWebApp();
    useLoginUser();
    useFetchLocalizationData()

    // const langKey = useSelector(selectLocalizationDataKey('lang.en'));


    // WebApp.CloudStorage.removeItem('jwt_token', (error, result) => {
    //     console.log('jwt_token removed', error, result);
    // })

    // const [apiClient, isSuccess] = useApiClient();
    // console.log('after hook', isSuccess, apiClient?.defaults.baseURL);


    function onTestBtnClick() {
        // console.log('baseURL', apiClient?.defaults.baseURL);
        // console.log('headers', apiClient?.defaults.headers);
        // console.log('common', apiClient?.defaults.headers.common['Authorization']);

        // apiClient?.get('/api/batches', {
        //     headers: {
        //         Authorization: `Bearer ${jwt_token}`
        //     }
        // })
        //     .then((response) => {
        //         console.log('response', response);
        //     }).catch((error) => {
        //         console.log('error', error);
        //     });

        // fetchLocalizationData()
        //     .then((data) => {
        //         console.log('fetchLocalizationFile', data);

        //         const state = store.getState();
        //         const test = selectLocalizationDataKey('lang.en')(state);
        //         console.log('test', test);
                
        //     })
        //     .catch((error) => {
        //         console.error('fetchLocalizationFile error', error);
        //     })
    }

    return (
        <div>
            <MainView></MainView>

            <div style={{
                width: '100%',
                height: '100px',
                backgroundColor: 'lightgreen',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} onClick={() => onTestBtnClick()}>Test button</div>
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
