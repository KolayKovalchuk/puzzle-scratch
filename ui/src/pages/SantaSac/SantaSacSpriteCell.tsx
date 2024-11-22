import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { useItemPrizePosition } from './hooks/useItemPrizePosition';
import { SantaSacScratchItemsEnum } from './scratchItemsEnum';

export interface ISantaSacSpriteCellData extends ISpriteCellData {
    textureName: SantaSacScratchItemsEnum;
    bundleName: string;
    itemPrize: number;
}

export interface ISantaSacSpriteCellProps extends IMatrixCellProps<ISantaSacSpriteCellData> {
}

export const ItemPrizeTextStyles = new TextStyle({
    fontSize: 16,
    fill: 'white',
    fontWeight: 'bold',
    stroke: '#090A58',
    strokeThickness: 2,
})

export function SantaSacSpriteCell({ x, y, width, height, data }: ISantaSacSpriteCellProps) {
    const { bundle, loading: isBundleLoading } = useLoadBundle(data.bundleName);

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
            {!!data.itemPrize
                ? <Text text={itemPrize} x={itemPrizeTextX} y={itemPrizeTextY} style={ItemPrizeTextStyles} />
                : null
            }
        </Container>
    );
};
