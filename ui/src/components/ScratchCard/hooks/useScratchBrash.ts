import { useApp } from '@pixi/react';
import { FederatedPointerEvent, Graphics, RenderTexture, Sprite } from 'pixi.js';
import { useEffect, useMemo, useState } from 'react';

export function useScratchBrash(isDisabled = false, brushSizeCoef: number = 0.15) {
    const app = useApp();
    const { width } = app.screen;

    // brush
    const brush = useMemo(() => new Graphics(), []);

    useEffect(() => {
        const brushRadius = width * brushSizeCoef;
        brush.beginFill(0xffffff);
        brush.drawCircle(0, 0, brushRadius);
        brush.endFill();
    }, [brush, width, brushSizeCoef]);

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
    };

    const pointerUp = () => {
        if (isDisabled) return;

        setDragging(false);
        app.renderer.render(brush, {
            renderTexture,
            clear: false,
        })
    };

    const clearTexture = () => {
        app.renderer.render(new Graphics(), {
            renderTexture,
            clear: true,
        });
    };

    return {
        dragging,
        renderTexture,
        renderTextureSprite,
        pointerMove,
        pointerDown,
        pointerUp,
        clearTexture
    }
}