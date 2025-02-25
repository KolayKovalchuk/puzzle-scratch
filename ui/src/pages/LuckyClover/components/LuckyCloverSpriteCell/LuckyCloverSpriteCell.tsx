import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { StyledTextPixiEl } from '@components/shared/StyledText';
import { useCellTextPosition, useCellTextStyles, useIsCenterCloverCell } from '@pages/LuckyClover/hooks/hooks';
import { formatNumber } from '@utils/formatters/formatNumber';
import { useMemo } from 'react';

export interface ILuckyCloverSpriteCellData extends ISpriteCellData {
}

export interface ILuckyCloverSpriteCellProps extends IMatrixCellProps<ILuckyCloverSpriteCellData> {
}

export function LuckyCloverSpriteCell({ x, y, width, height, data, colIndex, rowIndex }: ILuckyCloverSpriteCellProps) {
    if (!data.textureName || data.textureName === '0') return null;

    const { x: xShifted, y: yShifted } = useCellTextPosition(colIndex, rowIndex, width, height, x, y);

    const { isCenterCloverCell } = useIsCenterCloverCell(colIndex, rowIndex);
    const { textStyles } = useCellTextStyles(isCenterCloverCell);

    const formattedValue = useMemo(() => formatNumber(Number(data.textureName)), [data.textureName]);

    return <StyledTextPixiEl
        x={xShifted}
        y={yShifted}
        text={formattedValue}
        textStyles={textStyles}
        dimensions={{ width, height }}
        valueForMeasure='99'
        shouldFitHorizontally={false}
        shouldFitVertically={false}
    />
};
