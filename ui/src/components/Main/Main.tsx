import { Stage } from '@pixi/react';
import { useAddBundle } from '../../hooks/useAssetsBundleLoader';
import { IScratchCardBundleConfig, ScratchCard } from '../ScratchCard/ScratchCard';
import { ScratchCardApp } from '../ScratchCard/ScratchCardApp';

const bundleName = 'scratch_card_bg'
const bundle = {
    cover: './cover.jpg',
    revealed: './revealed.jpg'
}

const Main = () => {
    useAddBundle<IScratchCardBundleConfig>({ bundleName, bundle })

    const width = 200
    const height = 200

    console.log('Main');
    

    return (
        <>
            <Stage width={width} height={height}>
                <ScratchCard bundleName='scratch_card_bg'></ScratchCard>
            </Stage>
            <ScratchCardApp bundleName='scratch_card_bg'></ScratchCardApp>
        </>
    );
};

export default Main;
