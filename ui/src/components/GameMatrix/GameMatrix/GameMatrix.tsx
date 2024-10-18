import { Container } from '@pixi/react';
import { IGameMatrixProps } from './GameMatrix.models';

export function GameMatrix({ data, renderCell }: IGameMatrixProps) {
    const cellSize = 50; // Example size for each cell
    const padding = 10;  // Padding between cells

    return (
        <Container>
            {data.map((rowData, rowIndex) =>
                rowData.map((cellData, colIndex) => {
                    const x = colIndex * (cellSize + padding);
                    const y = rowIndex * (cellSize + padding);
                    const key = `${rowIndex}-${colIndex}`

                    return (
                        <Container key={key}>
                            {renderCell({ data: cellData, x, y })}
                        </Container>
                    )}
                ))
            }
        </Container>
    );
};
