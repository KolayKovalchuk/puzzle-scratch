import WebApp from '@twa-dev/sdk';
import './App.css';

import { FC, useEffect } from 'react';
import { MainView } from './components/MainView/MainView';
import { useLoadIcons } from './hooks/useLoadIcons';

const App: FC = () => {
    useEffect(() => {
        WebApp.ready();
    })

    useLoadIcons();

    return (
        <div>
            <MainView></MainView>
        </div>
    );
};

export default App;
