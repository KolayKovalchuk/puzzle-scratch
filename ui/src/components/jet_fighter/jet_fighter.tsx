import { AnimatedSprite, Container, useApp, useTick } from '@pixi/react';
import { Texture, Assets, Resource, BlurFilter, Application, ICanvas } from 'pixi.js';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

const [width, height] = [500, 500];
const spritesheet = "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";

function useLoadFrames(app: Application<ICanvas>) {
    const [frames, setFrames] = useState<Texture<Resource>[]>([]);

    // Load spritesheet when app is ready
    useEffect(() => {
        if (!app) return;  // Ensure `app` is available

        // Load the spritesheet using PIXI.Assets
        Assets.load(spritesheet).then((resource) => {
            setFrames(
                Object.keys(resource.data.frames).map(frame =>
                    Texture.from(frame)
                )
            );
        });

        // Cleanup if necessary
        return () => {
            // No specific cleanup needed with PIXI.Assets
        };
    }, [app]);

    return frames
}

function useHandleRotationTick(): [number, Dispatch<SetStateAction<number>>] {
    const [rot, setRot] = useState(0);
    useTick(delta => {
        setRot(r => r + (0.05 * delta));
    });

    return [rot, setRot]
}

function useHandleBlurTick() {
    const blurCounter = useRef(0);
    const blurFilter = useMemo(() => new BlurFilter(), []);
    const tickCount = useRef(0); // Track tick count

    const blurDeep = 10; // Smaller increment
    const increment = 0.05; // Smaller increment
    const updateFrequency = 5; // Update every 10 ticks

    useTick(() => {
        tickCount.current += 1; // Increment tick count

        // Update the blur filter only every `updateFrequency` ticks
        if (tickCount.current % updateFrequency === 0) {
            const newBlurValue = Math.round(Math.sin(blurCounter.current) * blurDeep);

            blurFilter.blur = newBlurValue;

            if (!blurFilter.blur){
                blurFilter.blur = 0.0001
            }

            blurCounter.current += increment; // Increment blur counter
            if (blurCounter.current >= 100) blurCounter.current = 0; // Reset if necessary
        }
    });

    return [blurFilter];
}


export const JetFighter = () => {
    const app = useApp();
    const [rot] = useHandleRotationTick()
    // const [blurFilter] = useHandleBlurTick()
    const frames = useLoadFrames(app)

    if (frames.length === 0) {
        return null;
    }

    return (
        <Container rotation={rot} x={width / 2} y={height / 2}>
            <AnimatedSprite
                animationSpeed={0.5}
                isPlaying={true}
                textures={frames}
                anchor={0.5}
                x={0}
                y={0}
                // filters={[blurFilter]} // Apply the blur filter to the sprite
            />
        </Container>
    );
};
