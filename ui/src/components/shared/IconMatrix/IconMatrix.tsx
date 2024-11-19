import { Container, useApp } from '@pixi/react';
import { useCellOffset } from './hooks/useCellOffset';
import { defaultConfig, useCellSize } from './hooks/useCellSize';
import { IGameMatrixProps } from './IconMatrix.models';

export function IconMatrix({ data = [], renderCell, config: configArg = defaultConfig }: IGameMatrixProps) {
    const config = { ...defaultConfig, ...configArg };
    const app = useApp();
    const { width: appWidth, height: appHeight } = app.screen;

    const fistRow = data[0] || [];
    const fistRowLength = fistRow?.length || 0;

    const cellSize = useCellSize(config, fistRowLength, data.length);
    const { offsetX, offsetY } = useCellOffset(cellSize, config.cellPadding, fistRowLength, data.length);

    if (!cellSize) {
        return null;
    }

    return (
        <Container
            width={appWidth}
            height={appHeight}
        >
            {data.map((rowData, rowIndex) =>
                rowData.map((cellData, colIndex) => {
                    const x = colIndex * (cellSize + config.cellPadding) + offsetX;
                    const y = rowIndex * (cellSize + config.cellPadding) + offsetY;
                    const key = `${rowIndex}-${colIndex}`

                    return (
                        <Container key={key}>
                            {renderCell({ data: cellData, x, y, width: cellSize, height: cellSize })}
                        </Container>
                    )
                }
                ))
            }
        </Container>
    );
};
