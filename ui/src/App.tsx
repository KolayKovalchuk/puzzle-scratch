import './App.css';
import { useEffect } from 'react';

import { Stage } from '@pixi/react';
import { JetFighter } from './components/jet_fighter/jet_fighter';

import WebApp from '@twa-dev/sdk'

const App = () => {
    useEffect(() => {
        WebApp.ready()
    }, [])
    return (
        <>
            <Stage width={430} height={1000} options={{ background: 0x1099bb }}>
                <JetFighter />
            </Stage>
        </>
    );
};

export default App;