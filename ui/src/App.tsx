import './App.css';
import { useEffect } from 'react';

import { Stage } from '@pixi/react';

import WebApp from '@twa-dev/sdk'
import { GameMatrix } from './components/GameMatrix/GameMatrix';
import { TextCell } from './components/GameMatrix/textCell';

// TODO: remove Matrix Data Mock when doesn't need anymore
const data: string[][] = [
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'],
    ['A2', 'B2', 'C2', 'D2', 'E2', 'F2'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3'],
    ['A4', 'B4', 'C4', 'D4', 'E4', 'F4'],
    ['A5', 'B5', 'C5', 'D5', 'E5', 'F5'],
    ['A6', 'B6', 'C6', 'D6', 'E6', 'F6']
];

const App = () => {
    useEffect(() => {
        WebApp.ready()
    }, [])

    return (
        <>
            <Stage width={430} height={1000} options={{ background: 0x1099bb }}>
                <GameMatrix
                    data={data}
                    renderCell={(props) => <TextCell {...props}/>}
                />
            </Stage>
        </>
    );
};

export default App;