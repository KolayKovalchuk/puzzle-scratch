import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { RedStyledTextStyle, StyledTextPixiEl } from '@components/shared/StyledText';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { VegasLootScratchItemsEnum, VegasLootScratchTextItems } from '@pages/Vegas/scratchItemsEnum';
import { Container, Sprite } from '@pixi/react';

export interface IVegasLootSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface IVegasLootSpriteCellProps extends IMatrixCellProps<IVegasLootSpriteCellData> {
}

export function VegasLootSpriteCell({ x, y, width, height, data }: IVegasLootSpriteCellProps) {
    const { bundle, loading: isBundleLoading } = useLoadBundle(data.bundleName);
    const texture = bundle?.[data.textureName];

    if (VegasLootScratchTextItems.includes(data.textureName as VegasLootScratchItemsEnum)) {
        const text = data.textureName.replace('w', 'x');

        return (<Container>
            <StyledTextPixiEl
                text={text}
                dimensions={{ width, height }}
                x={x}
                y={y}
                xShift={0.55}
                textStyles={RedStyledTextStyle}
            />
        </Container>)
    }

    if (!bundle) return null

    if (isBundleLoading || !texture || texture.baseTexture.width === 0) {
        return null;
    }

    return (<Container>
        <Sprite
            x={x}
            y={y}
            width={width}
            height={height}
            texture={texture}
        />
    </Container>);
};
