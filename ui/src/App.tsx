import './App.css';
import { useMemo } from 'react';

import { BlurFilter, TextStyle } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { JetFighter } from './components/jet_fighter/jet_fighter';

const App = () => {
  // const blurFilter = useMemo(() => new BlurFilter(2), []);
  // const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
  return (
    <Stage width={430} height={1000} options={{ background: 0x1099bb }}>
      {/* <Sprite image={bunnyUrl} x={80} y={150} />
      <Sprite image={bunnyUrl} x={215} y={200} />
      <Sprite image={bunnyUrl} x={350} y={150} />

      <Container x={430} y={200}>
        <Text
          text="Hello World"
          anchor={1.06}
          x={0}
          y={350}
          filters={[blurFilter]}
          style={
            new TextStyle({
              align: 'center',
              fill: '0xffffff',
              fontSize: 35,
              letterSpacing: 20,
              dropShadow: true,
              dropShadowColor: '#E72264',
              dropShadowDistance: 6,
            })
          }
        />
      </Container> */}

        <JetFighter />
    </Stage>
  );
};

export default App;