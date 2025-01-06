import { IScratchAnimationBundle, SCRATCH_ANIMATION_BUNDLE } from '@config/scratchAnimationBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useApp } from '@pixi/react';
import { Spine } from 'pixi-spine';
import { useCallback, useEffect, useState } from 'react';

export function useScratchAnimation(
    width: number,
    height: number,
    animationName: string,
    onComplete?: (...args: any) => void,
    onCompleteParams: any[] = []
) {
    const app = useApp();
    const [animation, setAnimation] = useState<Spine | null>(null);

    const bundleName = SCRATCH_ANIMATION_BUNDLE.name
    const { bundle } = useLoadBundle<IScratchAnimationBundle>(bundleName)
    const scratchJson = bundle?.scratchCandyBox;

    useEffect(() => {
        console.log('ScratchAnimationSprite create animation');
        
        if (!scratchJson) {
            return;
        }

        app.stage.removeChildren();
        const newAnimation = new Spine(scratchJson.spineData);
        newAnimation.x = width / 2;
        newAnimation.y = height * 0.38;
        newAnimation.width = width;
        newAnimation.height = height;

        app.stage.addChild(newAnimation);
        setAnimation(newAnimation);
    }, [app, scratchJson, width, height]);


    useEffect(() => {
        if (!animation) {
            return;
        }
        const onCompleteListener = () => {
            console.log('Animation rendering finished: ', animationName);
            if(onComplete) onComplete(...onCompleteParams);
        }

        animation.state.addListener({
            complete: onCompleteListener
        });

        return () => {
            animation.state.removeListener({
                complete: onCompleteListener
            });
        }
    }, [animation, animationName, onComplete, onCompleteParams]);

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