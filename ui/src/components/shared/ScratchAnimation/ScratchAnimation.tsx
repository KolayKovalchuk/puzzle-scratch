import 'pixi-spine';
import { forwardRef, Ref, useImperativeHandle, useState } from 'react';

import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage, useApp, AppProvider } from '@pixi/react';
import { Spine } from 'pixi-spine';
import { useEffect } from 'react';

import { IScratchAnimationBundle, SCRATCH_ANIMATION_BUNDLE } from '@config/scratchAnimationBundleConfig';
import styles from './ScratchAnimation.module.scss';

export enum ScratchAnimationName {
    candy_action = 'candy_action',
    candy_idle_start = 'candy_idle_start',
    candy_idle_end = 'candy_idle_end',
}

export interface IScratchAnimationHandle {
    reset: () => void;
    play: () => void;
    stop: () => void;
}

export interface IScratchAnimationSpriteProps {
    width: number;
    height: number;
    animationName: ScratchAnimationName;
}

const ScratchAnimationSprite = forwardRef<IScratchAnimationHandle, IScratchAnimationSpriteProps>(
    (
        { width, height, animationName }: IScratchAnimationSpriteProps,
        ref: Ref<IScratchAnimationHandle>
    ) => {
    
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

    useImperativeHandle(ref, () => {
        return {
            play: () => {
                if (!animation) {
                    return;
                }

                console.log('ScratchAnimationSprite play animation', animationName);
                animation.state.setAnimation(0, animationName, false);
            },
            stop: () => {
                if (!animation) {
                    return;
                }

                console.log('ScratchAnimationSprite stop animation', animationName);
                animation.state.clearTracks();
            },
            reset: () => {
                if (!animation) {
                    return;
                }

                console.log('ScratchAnimationSprite reset animation', animationName);
                animation.state.clearTracks();
                animation.skeleton.setToSetupPose();
            },
        };
    });

    return null;
});


export interface IScratchAnimationProps extends Omit<IScratchAnimationSpriteProps, 'width' | 'height'> {
    width?: number;
    height?: number;
}

function ScratchAnimationComponent(
    props: IScratchAnimationProps,
    ref: Ref<IScratchAnimationHandle>
) {
    const { containerRef, dimensions } = useContainerDimensions();
    const width = props.width || dimensions.width;
    const height = props.height || dimensions.height;

    return ( <div className={styles.container} ref={containerRef}>
        <Stage
            width={width}
            height={height}
            options={{ backgroundAlpha: 0 }}
        >
            <ScratchAnimationSprite
                {...props}
                width={width}
                height={height}
                ref={ref}
            />
        </Stage>
    </div>
    );
}

export const ScratchAnimation = forwardRef<IScratchAnimationHandle, IScratchAnimationProps>(ScratchAnimationComponent);