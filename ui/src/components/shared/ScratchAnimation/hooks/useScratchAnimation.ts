import { IScratchAnimationBundle, SCRATCH_ANIMATION_BUNDLE } from '@config/scratchAnimationBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useApp } from '@pixi/react';
import { Spine } from 'pixi-spine';
import { useCallback, useEffect, useState } from 'react';
import { ScratchAnimationName } from '../ScratchAnimation';

function getScratchJson(bundle: IScratchAnimationBundle | null, animationName: ScratchAnimationName) {
    switch (animationName) {
        case ScratchAnimationName.candy_action:
            return bundle?.scratchCandyBox;
        case ScratchAnimationName.santa_action:
            return bundle?.scratchSantaSac
        case ScratchAnimationName.ice_action:
            return bundle?.scratchIceBox
        default:
            return null;
    }
}

export function useScratchAnimation(
    width: number,
    height: number,
    animationName: ScratchAnimationName,
    onComplete?: (...args: any) => void,
) {
    const app = useApp();
    const [animation, setAnimation] = useState<Spine | null>(null);

    const bundleName = SCRATCH_ANIMATION_BUNDLE.name
    const { bundle } = useLoadBundle<IScratchAnimationBundle>(bundleName)
    
    const scratchJson = getScratchJson(bundle, animationName);

    useEffect(() => {
        console.log('ScratchAnimationSprite create animation');
        
        if (!scratchJson) {
            return;
        }

        animation?.destroy();
        app.stage.removeChildren();
        const newAnimation = new Spine(scratchJson.spineData);

        app.stage.addChild(newAnimation);
        setAnimation(newAnimation);
    }, [app, scratchJson]);

    useEffect(() => {
        if (!animation) {
            return;
        }

        animation.x = width / 2;
        animation.y = height * 0.38;
        animation.width = width;
        animation.height = height;
    }, [width, height, animation]);

    const onCompleteListener = useCallback(() => {
        console.log('Animation rendering finished: ', animationName);
        onComplete && onComplete();
    }, [onComplete, animationName]);

    useEffect(() => {
        if (!animation) {
            return;
        }

        animation.state.addListener({
            complete: onCompleteListener
        });

        return () => {
            animation.state.clearListeners();
        }
    }, [animation, onCompleteListener]);

    const play = useCallback(() => {
        if (!animation) {
            return;
        }

        console.log('ScratchAnimationSprite play animation', animationName);
        animation.state.setAnimation(0, animationName, false);
    }, [animation, animationName]);

    const stop = useCallback(() => {
        if (!animation) {
            return;
        }

        console.log('ScratchAnimationSprite stop animation', animationName);
        animation.state.clearTracks();
    }, [animation, animationName]);

    const reset = useCallback(() => {
        if (!animation) {
            return;
        }

        console.log('ScratchAnimationSprite reset animation', animationName);
        animation.state.clearTracks();
        animation.skeleton.setToSetupPose();
    }, [animation, animationName]);

    return {
        animation,
        play,
        stop,
        reset,
    };
}