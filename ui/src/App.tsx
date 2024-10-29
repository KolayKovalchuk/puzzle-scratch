import WebApp from '@twa-dev/sdk';
import './App.css';

import { FC, useEffect } from 'react';

import { MainView } from '@components/MainView';


const App: FC = () => {
    useEffect(() => {
        WebApp.ready();
    })

    return (
        <div>
            <MainView></MainView>
        </div>
    );
};

export default App;
