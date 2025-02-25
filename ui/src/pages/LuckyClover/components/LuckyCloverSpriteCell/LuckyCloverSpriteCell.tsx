import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { StyledTextPixiEl } from '@components/shared/StyledText';
import { LUCKY_CLOVER_BUNDLE } from '@config/luckyCloverBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useCellTextPosition, useCellTextStyles, useIsCenterCloverCell } from '@pages/LuckyClover/hooks/hooks';
import { Sprite } from '@pixi/react';
import { formatNumber } from '@utils/formatters/formatNumber';
import { useMemo } from 'react';

export interface ILuckyCloverSpriteCellData extends ISpriteCellData {
}

export interface ILuckyCloverSpriteCellProps extends IMatrixCellProps<ILuckyCloverSpriteCellData> {
}

export function LuckyCloverSpriteCell({ x, y, width, height, data, colIndex, rowIndex }: ILuckyCloverSpriteCellProps) {
    const { bundle } = useLoadBundle(LUCKY_CLOVER_BUNDLE.name);

    const { isCenterCloverCell } = useIsCenterCloverCell(colIndex, rowIndex);
    const { textStyles } = useCellTextStyles(isCenterCloverCell);
    const formattedValue = useMemo(() => formatNumber(Number(data.textureName)), [data.textureName]);

    const {
        x: textX,
        y: textY,
        roboIconX,
        roboIconY,
        roboIconWidth,
        roboIconHeight
    } = useCellTextPosition(
        colIndex,
        rowIndex,
        width,
        height,
        x,
        y,
        isCenterCloverCell,
        formattedValue,
        textStyles
    );


    if (!data.textureName || data.textureName === '0' || !bundle) return null;


    return <>
        <StyledTextPixiEl
            x={textX}
            y={textY}
            text={formattedValue}
            textStyles={textStyles}
            dimensions={{ width, height }}
            valueForMeasure='99'
            shouldFitHorizontally={false}
            shouldFitVertically={false}
            xShift={0}
        />
        { isCenterCloverCell && <Sprite
            texture={bundle.roboTokenGoldNoShining}
            x={roboIconX}
            y={roboIconY}
            width={roboIconWidth}
            height={roboIconHeight}
        /> }
    </>
};
