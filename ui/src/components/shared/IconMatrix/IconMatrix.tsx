import { useWinningBgConfig } from '@hooks/useWinningBgConfig';
import { Container, Sprite, useApp } from '@pixi/react';
import { useCallback } from 'react';
import { useCellOffset } from './hooks/useCellOffset';
import { defaultConfig, useCellSize } from './hooks/useCellSize';
import { IGameMatrixProps } from './IconMatrix.models';

export function IconMatrix({ data = [], renderCell, config: configArg = defaultConfig, winningBgTexture }: IGameMatrixProps) {
    const config = { ...defaultConfig, ...configArg };
    const app = useApp();
    const { width: appWidth, height: appHeight } = app.screen;

    const fistRow = data[0] || [];
    const fistRowLength = fistRow?.length || 0;

    const {  width: cellWidth, height: cellHeight } = useCellSize(config, fistRowLength, data.length);
    const { offsetX, offsetY } = useCellOffset(cellWidth, cellHeight, config.cellPadding, fistRowLength, data.length);

    const {
        winningBgTextureWidth,
        winningBgTextureHeight,
        winningBgTextureX,
        winningBgTextureY,
        winningBgTextureAlpha
    } = useWinningBgConfig(cellWidth, config);

    const winningBg = useCallback((x: number, y: number, isWinning: boolean) => {
        if (!winningBgTexture || !isWinning) return null;

        return (
            <Sprite
                texture={winningBgTexture}
                width={winningBgTextureWidth}
                height={winningBgTextureHeight}
                x={x + winningBgTextureX}
                y={y + winningBgTextureY}
                alpha={winningBgTextureAlpha}
            />
        );
    }, [
        winningBgTexture,
        winningBgTextureWidth,
        winningBgTextureHeight,
        winningBgTextureX,
        winningBgTextureY,
        winningBgTextureAlpha
    ]);

    if (!cellWidth || !cellHeight) {
        return null;
    }

    return (
        <Container
            width={appWidth}
            height={appHeight}
        >
            {data.map((rowData, rowIndex) =>
                rowData.map((cellData, colIndex) => {
                    
                    const x = colIndex * (cellWidth + config.cellPadding) + offsetX - config.paddintLeft;
                    const y = rowIndex * (cellHeight + config.cellPadding) + offsetY - config.paddintBottom;
                    const key = `${rowIndex}-${colIndex}`

                    return (
                        <Container key={key}>
                            {winningBg(x, y, cellData.isWinning)}
                            {renderCell({ data: cellData, x, y, width: cellWidth, height: cellHeight })}
                        </Container>
                    )
                }
                ))
            }
        </Container>
    );
};
