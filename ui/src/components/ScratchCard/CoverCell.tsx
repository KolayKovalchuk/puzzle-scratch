import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite } from '@pixi/react';

export interface ICoverSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface ICoverSpriteCellProps extends IMatrixCellProps<ICoverSpriteCellData> {
}

export function CoverSpriteCell({ x, y, width, height, data }: ICoverSpriteCellProps) {
    const { bundle } = useLoadBundle(data.bundleName);

    if (!bundle) return null;

    const texture = bundle[data.textureName];

    if (!texture) return null;

    return (
        <Container
            x={x}
            y={y}>
            <Sprite
                width={width}
                height={height}
                texture={texture}
            />
        </Container>
    );
};
