import WebApp from '@twa-dev/sdk';
import './App.css';

import { useEffect } from 'react';

import { MainView } from '@components/MainView';


function App() {
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
