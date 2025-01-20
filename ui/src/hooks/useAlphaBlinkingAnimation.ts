import { selectMatrixBlinkCounter } from '@store/selectors/appState.selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export function useAlphaBlinkingAnimation() {
    let timeout: NodeJS.Timeout | undefined = undefined;
    let animationFrameId: number | undefined = undefined;
    const [alpha, setAlpha] = useState(0);

    const matrixBlinkCounter = useSelector(selectMatrixBlinkCounter);
    useEffect(() => {
        const blinkingDuration = 1000 * 10;
        const alphaStep = 0.02;
        // const alphaStep =  1 / (1000 / 60); // 60 FPS;
        let lastTimestamp: number | null = null;

        const clearAnimationFrame = () => {
            if (animationFrameId !== undefined) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = undefined;
            }
        };

        const clearTimeoutCb = () => {
            clearTimeout(timeout);
            timeout = undefined;
        };

        if (matrixBlinkCounter === 0) {
            clearAnimationFrame();
            clearTimeoutCb();

            setAlpha(0);
            return;
        }

        let isIncreasing = true;

        const animate = (timestamp: number) => {
            if (lastTimestamp !== null) {
                const deltaTime = timestamp - lastTimestamp;
                const adjustedAlphaStep = alphaStep * (deltaTime / 16.67); // 16.67ms is approximately 60fps

                setAlpha(prevAlpha => {
                    let newAlpha = prevAlpha;
                    if (newAlpha >= 1) {
                        newAlpha -= adjustedAlphaStep;
                        isIncreasing = false;
                    } else if (newAlpha <= 0.5) {
                        newAlpha += adjustedAlphaStep;
                        isIncreasing = true;
                    } else {
                        newAlpha += isIncreasing ? adjustedAlphaStep : -adjustedAlphaStep;
                    }
                    return newAlpha;
                });
            }
            lastTimestamp = timestamp;
            animationFrameId = requestAnimationFrame(animate);
        };

        clearAnimationFrame();
        animate(performance.now());

        if (timeout) {
            clearTimeoutCb();
        }

        timeout = setTimeout(() => {
            clearAnimationFrame();
            const smoothToFullAlpha = () => {
                setAlpha(prevAlpha => {
                    if (prevAlpha < 1) {
                        const newAlpha = Math.min(prevAlpha + alphaStep, 1);
                        requestAnimationFrame(smoothToFullAlpha);
                        return newAlpha;
                    }
                    return 1;
                });
            };
            smoothToFullAlpha();
        }, blinkingDuration);

        return () => {
            clearAnimationFrame();
            clearTimeoutCb();
        };
    }, [matrixBlinkCounter, setAlpha]);

    return { alpha };
}
