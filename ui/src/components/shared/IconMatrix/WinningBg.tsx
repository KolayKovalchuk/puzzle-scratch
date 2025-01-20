
import { useWinningBgConfig } from '@hooks/useWinningBgConfig';
import { Sprite } from '@pixi/react';
import { useAlphaBlinkingAnimation } from '@hooks/useAlphaBlinkingAnimation';
import { Texture } from 'pixi.js-legacy';
import { IGameMatrixDefaultConfig } from './hooks/useCellSize';

interface IWinningBgProps {
    cellWidth: number;
    config: IGameMatrixDefaultConfig;
    winningBgTexture: Texture;
    isWinning: boolean;

    x: number;
    y: number;
}

export function WinningBg({
    cellWidth,
    config,
    winningBgTexture,
    isWinning,

    x,
    y,
}: IWinningBgProps) {
    const {
        winningBgTextureWidth,
        winningBgTextureHeight,
        winningBgTextureX,
        winningBgTextureY,
    } = useWinningBgConfig(cellWidth, config);
    const { alpha } = useAlphaBlinkingAnimation();

    if (!winningBgTexture || !isWinning) return null;

    return (
        <Sprite
            texture={winningBgTexture}
            width={winningBgTextureWidth}
            height={winningBgTextureHeight}
            x={x + winningBgTextureX}
            y={y + winningBgTextureY}
            alpha={alpha}
        />
    );
}