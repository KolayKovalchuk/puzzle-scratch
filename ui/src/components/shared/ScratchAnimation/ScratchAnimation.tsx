import 'pixi-spine';
import { forwardRef, Ref, useImperativeHandle } from 'react';

import { useContainerDimensions } from '@hooks/useContainerDimensions';
import { Stage } from '@pixi/react';

import styles from './ScratchAnimation.module.scss';
import { useScratchAnimation } from './hooks/useScratchAnimation';

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
    onComplete?: (...args: any) => void,
}

const ScratchAnimationSprite = forwardRef<IScratchAnimationHandle, IScratchAnimationSpriteProps>(
    (
        { width, height, animationName, onComplete }: IScratchAnimationSpriteProps,
        ref: Ref<IScratchAnimationHandle>
    ) => {
    
    const { play, stop, reset } = useScratchAnimation(width, height, animationName, onComplete);

    useImperativeHandle(ref, () => {
        return {
            play: play,
            stop: stop,
            reset: reset,
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