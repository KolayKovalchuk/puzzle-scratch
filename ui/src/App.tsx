import WebApp from '@twa-dev/sdk';
import './App.css';

import Main from './components/Main/Main';
import { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        WebApp.ready();
    })

    return (
        <>
            <Main></Main>
        </>
    );
};

export default App;
