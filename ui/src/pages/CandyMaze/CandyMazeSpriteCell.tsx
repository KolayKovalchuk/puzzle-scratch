import { IMatrixCellProps } from '@components/shared/IconMatrix/IconMatrix.models';
import { RedStyledTextStyle, StyledTextContainer } from '@components/shared/StyledText';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite } from '@pixi/react';
import { useMemo } from 'react';
import { CandyMazeScratchItemsEnum, CandyMazeScratchTextItems } from './scratchItemsEnum';

export interface ICandyMazeSpriteCellData {
    textureName: CandyMazeScratchItemsEnum;
    bundleName: string;
}

export interface ICandyMazeSpriteCellProps extends IMatrixCellProps<ICandyMazeSpriteCellData> {
}

function getDimentions(width: number, height: number) {
    return {
        width: width * 1,
        height: height * 1,
    }
}

export function CandyMazeSpriteCell({ x, y, width, height, data }: ICandyMazeSpriteCellProps) {
    const { bundle, loading: isBundleLoading } = useLoadBundle(data.bundleName);
    const texture = bundle?.[data.textureName];

    const dimensions = useMemo(() => getDimentions(width, height), [width, height])

    if (CandyMazeScratchTextItems.includes(data.textureName)) {
        const text = data.textureName.replace('w', 'x');

        return (
            <Container
                x={x + 4}
                y={y + 4}
                width={dimensions.width}
                height={dimensions.height}
            >
                {/* <Graphics draw={(g) => {
                    g.clear();
                    g.beginFill(0xFFFFFF);
                    g.drawRect(0 - 4, 0 - 4, width + 5, height + 6.5);
                    g.endFill();
                }} /> */}
                <StyledTextContainer
                    isUnderline={false}
                    dimensions={dimensions}
                    text={text}
                    textStyles={RedStyledTextStyle}
                    textFitCoefficient={1}
                />
            </Container>
        )
    }

    if (!bundle) return null

    if (isBundleLoading || !texture || texture.baseTexture.width === 0) {
        return null;
    }

    return (<Container>
        {/* <Graphics draw={(g) => {
            g.clear();
            g.beginFill(0xFFFFFF);
            g.drawRect(x, y, width, height);
            g.endFill();
        }} /> */}
        <Sprite
            x={x}
            y={y}
            width={width}
            height={height}
            texture={texture}
        />
    </Container>);
};
