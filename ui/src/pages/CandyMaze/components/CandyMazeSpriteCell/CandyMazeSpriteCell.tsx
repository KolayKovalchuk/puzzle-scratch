import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { RedStyledTextStyle, StyledTextPixiEl } from '@components/shared/StyledText';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { CandyMazeScratchItemsEnum, CandyMazeScratchTextItems } from '@pages/CandyMaze/scratchItemsEnum';
import { Container, Sprite } from '@pixi/react';

export interface ICandyMazeSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface ICandyMazeSpriteCellProps extends IMatrixCellProps<ICandyMazeSpriteCellData> {
}

export function CandyMazeSpriteCell({ x, y, width, height, data }: ICandyMazeSpriteCellProps) {
    const { bundle, loading: isBundleLoading } = useLoadBundle(data.bundleName);
    const texture = bundle?.[data.textureName];

    if (CandyMazeScratchTextItems.includes(data.textureName as CandyMazeScratchItemsEnum)) {
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
