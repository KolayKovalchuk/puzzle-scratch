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

    const {  width: cellWidth, height: cellHeight } = useCellSize(config, fistRowLength, data.length);
    const { offsetX, offsetY } = useCellOffset(cellWidth, cellHeight, config.cellPadding, fistRowLength, data.length);

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
                    
                    const x = colIndex * (cellWidth + config.cellPadding) + offsetX;
                    const y = rowIndex * (cellHeight + config.cellPadding) + offsetY - config.paddintBottom;
                    const key = `${rowIndex}-${colIndex}`

                    return (
                        <Container key={key}>
                            {renderCell({ data: cellData, x, y, width: cellWidth, height: cellHeight })}
                        </Container>
                    )
                }
                ))
            }
        </Container>
    );
};
