import { useApp } from '@pixi/react';
import { FederatedPointerEvent, Graphics, RenderTexture, Sprite } from 'pixi.js';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useScratchBrash(
    isDisabled = false,
    brushSizeCoef: number = 0.15,
    onScratchStarted?: () => void
) {
    const app = useApp();
    const { width, height } = app.screen;
    const brushRadius = width * brushSizeCoef;

    // brush
    const brush = useMemo(() => new Graphics(), []);

    const setBrush = useCallback(() => {
        brush.clear();
        brush.beginFill(0xffffff);
        brush.drawCircle(0, 0, brushRadius);
        brush.endFill();
    }, [brush, brushRadius]);


    useEffect(() => setBrush(), [brush, brushRadius]);

    // mask
    const renderTexture = useMemo(() => RenderTexture.create({
        width: app.screen.width,
        height: app.screen.height
    }), [app]);

    const renderTextureSprite = useMemo(() => new Sprite(renderTexture), [renderTexture]);

    const [dragging, setDragging] = useState(false);

    const pointerMove = (e: FederatedPointerEvent, forcePaint = false) => {
        if (isDisabled) return;

        if (dragging || forcePaint) {
            brush.position.copyFrom(e.global);
            app.renderer.render(brush, {
                renderTexture,
                clear: false,
            })
        }
    };

    const pointerDown = (e: FederatedPointerEvent) => {
        if (isDisabled) return;

        setDragging(true);
        pointerMove(e, true);
        onScratchStarted && onScratchStarted();
    };

    const pointerUp = () => {
        if (isDisabled) return;

        setDragging(false);
        app.renderer.render(brush, {
            renderTexture,
            clear: false,
        })
    };

    const resetTexture = () => {
        setBrush();
        app.renderer.render(new Graphics(), {
            renderTexture,
            clear: true,
        });
    };

    const revealTexture = () => {
        const brushRadius = width;
        brush.clear();

        brush.beginFill(0xffffff);
        brush.drawRect(0, 0, width, height);
        brush.endFill();

        for (let x = 0; x < app.screen.width; x += brushRadius) {
            for (let y = 0; y < app.screen.height; y += brushRadius) {
                brush.position.set(x, y);
                app.renderer.render(brush, {
                    renderTexture,
                    clear: false,
                });
            }
        }
    };

    return {
        dragging,
        renderTexture,
        renderTextureSprite,
        brush,
        pointerMove,
        pointerDown,
        pointerUp,
        resetTexture,
        revealTexture
    }
}