import { useCallback } from 'react';
import { GradientConfig, useGradientTexture } from './useGradientTexture';
import { Graphics, Texture } from 'pixi.js';

type RenderBgCb = (g: Graphics, gradientTexture: Texture, width: number, height: number) => void;

export function useRenderBgGraphics(
    width: number,
    height: number,
    gradientData: GradientConfig,
    renderBg?: RenderBgCb
) {
    const gradientTexture = useGradientTexture(width, height, gradientData);

    const defaultRenderBg = useCallback((g: Graphics) => {
        g.clear();
        g.beginTextureFill({ texture: gradientTexture });
        g.drawRoundedRect(0, 0, width, height, 14);
        g.endFill();
    }, [gradientTexture, width, height]);
    const renderBgCb = useCallback((g: Graphics) => {
        renderBg && renderBg(g, gradientTexture, width, height);
    }, [renderBg, gradientTexture]);
    const renderBgGraphics = renderBg ? renderBgCb : defaultRenderBg;

    return renderBgGraphics
}