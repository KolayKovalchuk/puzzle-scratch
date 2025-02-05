import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { DefaultTextStyleConfig, RedStyledTextStyle } from '@components/shared/StyledText';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js-legacy';
import { CandyMazeScratchItemsEnum, CandyMazeScratchTextItems } from '@pages/CandyMaze/scratchItemsEnum';

export interface ICandyMazeSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface ICandyMazeSpriteCellProps extends IMatrixCellProps<ICandyMazeSpriteCellData> {
}

const textStyleConfig: TextStyle = new TextStyle({
    ...DefaultTextStyleConfig,
    ...RedStyledTextStyle,
});

export function CandyMazeSpriteCell({ x, y, width, height, data }: ICandyMazeSpriteCellProps) {
    const { bundle, loading: isBundleLoading } = useLoadBundle(data.bundleName);
    const texture = bundle?.[data.textureName];

    if (CandyMazeScratchTextItems.includes(data.textureName as CandyMazeScratchItemsEnum)) {
        const text = data.textureName.replace('w', 'x');

        const xShift = width * 0.1;
        const yShift = height * 0.1 * -1;

        const textX = x + xShift;
        const textY = y + yShift;

        return (<Container>
                <Text text={text} x={textX} y={textY} style={textStyleConfig} />
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
