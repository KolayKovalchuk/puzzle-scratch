import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { StyledTextPixiEl } from '@components/shared/StyledText';
import { GameCellTextStyle } from '@components/shared/StyledText/components/GameCellStyledText';
import { ISantaSacBundle } from '@config/santaSacBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js-legacy';
import { useItemPrizePosition } from './hooks/useItemPrizePosition';
import { SantaSacScratchItemsEnum } from './scratchItemsEnum';

export interface ISantaSacSpriteCellData extends ISpriteCellData {
    textureName: SantaSacScratchItemsEnum;
    bundleName: string;
    itemPrize: number;
}

export interface ISantaSacSpriteCellProps extends IMatrixCellProps<ISantaSacSpriteCellData> {
}

const ItemPrizeTextStyles: Partial<ITextStyle> = {
    ...GameCellTextStyle,
    fontSize: 16,
    dropShadow: false,
}

export const ItemPrizeTextStylesClass = new TextStyle(ItemPrizeTextStyles);

export function SantaSacSpriteCell({ x, y, width, height, data }: ISantaSacSpriteCellProps) {
    const { bundle, loading: isBundleLoading } = useLoadBundle<ISantaSacBundle>(data.bundleName);

    const itemPrize = data.itemPrize?.toString() || '0';
    const { x: itemPrizeTextX, y: itemPrizeTextY } = useItemPrizePosition(data.itemPrize, width, height);

    if (!bundle) return null

    const texture = bundle[data.textureName];

    if (isBundleLoading || !texture) {
        return null;
    }

    return (
        <Container
            x={x}
            y={y}>
            <Sprite
                width={width}
                height={height}
                texture={texture}
            />
            <StyledTextPixiEl
                dimensions={{ width: width, height: height }}
                text={itemPrize}
                x={itemPrizeTextX}
                y={itemPrizeTextY}
                textStyles={ItemPrizeTextStyles}
                valueForMeasure='1000'
            />
        </Container>
    );
};
