import { IMatrixCellProps } from '@components/shared/IconMatrix/IconMatrix.models';
import { RedStyledText } from '@components/shared/StyledText';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite } from '@pixi/react';
import { CandyMazeScratchItemsEnum, CandyMazeScratchTextItems } from './scratchItemsEnum';

export interface ICandyMazeSpriteCellData {
    textureName: CandyMazeScratchItemsEnum;
    bundleName: string;
}

export interface ICandyMazeSpriteCellProps extends IMatrixCellProps<ICandyMazeSpriteCellData> {
}

export function CandyMazeSpriteCell({ x, y, width, height, data }: ICandyMazeSpriteCellProps) {
    const { bundle, loading: isBundleLoading } = useLoadBundle(data.bundleName);
    const texture = bundle?.[data.textureName];


    if (CandyMazeScratchTextItems.includes(data.textureName)) {
        const text = data.textureName.replace('w', 'x');
        return (
            <Container
                x={x}
                y={y}
                width={width * 1.2}
                height={height * 1.2}
            >
                <RedStyledText asPixiContainer anchor={0.1} text={text} textStyles={{ fontSize: 50 }}/>
            </Container>
        )
    }

    if (!bundle) return null

    if (isBundleLoading || !texture || texture.baseTexture.width === 0) {
        return null;
    }

    return (
        <Sprite
            x={x}
            y={y}
            width={width}
            height={height}
            texture={texture}
        />
    );
};
