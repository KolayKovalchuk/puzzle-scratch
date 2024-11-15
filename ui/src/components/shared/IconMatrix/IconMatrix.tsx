import { Container, useApp } from '@pixi/react';
import { useCellOffset } from './hooks/useCellOffset';
import { useCellSize } from './hooks/useCellSize';
import { IGameMatrixProps } from './IconMatrix.models';

const defaultConfig = {
    cellSize: null,
    padding: 0
}

export function IconMatrix({ data = [], renderCell, config = defaultConfig }: IGameMatrixProps) {
    const app = useApp();
    const { width: appWidth, height: appHeight } = app.screen;

    const fistRow = data[0] || [];
    const fistRowLength = fistRow?.length || 0;

    const cellSize = useCellSize(config, fistRowLength, data.length);
    const { offsetX, offsetY } = useCellOffset(cellSize, config.padding, fistRowLength, data.length);

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
                    const x = colIndex * (cellSize + config.padding) + offsetX;
                    const y = rowIndex * (cellSize + config.padding) + offsetY;
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
