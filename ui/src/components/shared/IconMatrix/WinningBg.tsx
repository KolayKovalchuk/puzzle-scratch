
import { useAlphaBlinkingAnimation } from '@hooks/useAlphaBlinkingAnimation';
import { useWinningBgConfig } from '@hooks/useWinningBgConfig';
import { Sprite } from '@pixi/react';
import { Texture } from 'pixi.js-legacy';
import { IGameMatrixDefaultConfig } from './hooks/useCellSize';
import { useWinningBgPosition } from './hooks/useWinningBgPosition';

interface IWinningBgProps {
    cellWidth: number;
    config: IGameMatrixDefaultConfig;
    winningBgTexture: Texture | null;
    isWinning: boolean;

    x: number;
    y: number;
    xShift?: number;
    yShift?: number;
}

export function WinningBg({
    cellWidth,
    config,
    winningBgTexture,
    isWinning,

    x,
    y,
    xShift,
    yShift,
}: IWinningBgProps) {
    const {
        winningBgTextureWidth,
        winningBgTextureHeight,
        winningBgTextureX,
        winningBgTextureY,
    } = useWinningBgConfig(cellWidth, config);
    const { alpha } = useAlphaBlinkingAnimation();
    const { position } = useWinningBgPosition(x, y, xShift, yShift, winningBgTextureX, winningBgTextureY);

    if (!winningBgTexture || !isWinning) return null;

    return (
        <Sprite
            texture={winningBgTexture}
            width={winningBgTextureWidth}
            height={winningBgTextureHeight}
            x={position.x}
            y={position.y}
            alpha={alpha}
        />
    );
}