import 'pixi-spine';

import { IIceBoxBundle } from '@config/iceBoxBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage, useApp } from '@pixi/react';
import { Spine } from 'pixi-spine';
import { useEffect } from 'react';

import { COIN_ANIMATION_BUNDLE } from '@config/coinAnimationBundleConfig';
import styles from './CoinAnimation.module.scss';

export enum CoinAnimationName {
    coint_l = 'coint_l',
    coint_m = 'coint_m',
    coint_s = 'coint_s',
}

export interface ICoinAnimationSpriteProps {
    width: number;
    height: number;
    animationName: CoinAnimationName;
}

export function CoinAnimationSprite({ width, height, animationName }: ICoinAnimationSpriteProps) {
    const app = useApp();

    const bundleName = COIN_ANIMATION_BUNDLE.name
    const { bundle } = useLoadBundle<IIceBoxBundle>(bundleName)
    const coinJson = bundle?.coinSpine;

    useEffect(() => {
        if (!coinJson) {
            return;
        }

        app.stage.removeChildren();
        const animation = new Spine(coinJson.spineData);
        const animationSize = width / 5;
        animation.x = width / 2;
        animation.y = width / 1.5;
        animation.width = animationSize;
        animation.height = animationSize;

        app.stage.addChild(animation);

        animation.state.setAnimation(0, animationName, false); // Replace 'animation' with your animation name
    }, [app, coinJson, width, height, animationName]);

    return null;
};

export interface ICoinAnimationProps {
    width?: number;
    height?: number;
    animationName: CoinAnimationName;
}

export function CoinAnimation({ animationName, width: widthArg, height: heigthArg }: ICoinAnimationProps) {
    const { containerRef, dimensions } = useContainerDimensions();
    const width = widthArg || dimensions.width;
    const height = heigthArg || dimensions.height;

    return (<div className={styles.container} ref={containerRef}>
        <Stage
            width={width}
            height={height}
            options={{ backgroundAlpha: 0 }}
        >
            <CoinAnimationSprite
                width={width}
                height={height}
                animationName={animationName}
            />
        </Stage>
    </div>
    );
}