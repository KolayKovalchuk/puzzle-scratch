import 'pixi-spine';

import { IIceBoxBundle } from '@config/iceBoxBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage, useApp } from '@pixi/react';
import { ITrackEntry, Spine } from 'pixi-spine';
import { useEffect, useState } from 'react';

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
    onAnimationEnd?: () => void;
}

export function CoinAnimationSprite({ width, height, animationName, onAnimationEnd }: ICoinAnimationSpriteProps) {
    const app = useApp();

    const bundleName = COIN_ANIMATION_BUNDLE.name
    const { bundle } = useLoadBundle<IIceBoxBundle>(bundleName)
    const coinJson = bundle?.coinSpine;

    const [animation, setAnimation] = useState<Spine | null>(null);
    
    useEffect(() => {
        console.log('ScratchAnimationSprite create animation');
        
        if (!coinJson) {
            return;
        }

        animation?.destroy();
        app.stage.removeChildren();
        const newAnimation = new Spine(coinJson.spineData);

        app.stage.addChild(newAnimation);
        setAnimation(newAnimation);
    }, [app, coinJson]);

    useEffect(() => {
        if (!animation) {
            return;
        }

        const animationSize = width / 5;
        animation.x = width / 2;
        animation.y = width / 1.5;
        animation.width = animationSize;
        animation.height = animationSize;

        
    }, [width, height, animation]);

    const [trackEntry, setTrackEntry] = useState<ITrackEntry | null>(null);

    useEffect(() => {
        if (!animation) {
            return;
        }

        const trackEntry = animation.state.setAnimation(0, animationName, false);
        setTrackEntry(trackEntry);
    }, [animation, animationName, onAnimationEnd]);

    useEffect(() => {
        if (!trackEntry) {
            return;
        }

        trackEntry.listener = {
            complete: () => {
                onAnimationEnd && onAnimationEnd();
            }
        };
    }, [trackEntry, onAnimationEnd]);

    return null;
};

export interface ICoinAnimationProps {
    width?: number;
    height?: number;
    animationName: CoinAnimationName;
    onAnimationEnd?: () => void;
}

export function CoinAnimation({ animationName, width: widthArg, height: heigthArg, onAnimationEnd }: ICoinAnimationProps) {
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
                onAnimationEnd={onAnimationEnd}
            />
        </Stage>
    </div>
    );
}