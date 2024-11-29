import { IMatrixCellProps } from '@components/shared/IconMatrix/IconMatrix.models';
import { DefaultTextStyleConfig, StyledTextPixiEl } from '@components/shared/StyledText';
import { GameCellTextStyle } from '@components/shared/StyledText/components/GameCellStyledText';
import { IIceBoxBundle } from '@config/iceBoxBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite, Text } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js';
import { useCellLabelsPosition } from './hooks/useCellLabelsPosition';

export interface IIceBoxSpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface IIceBoxSpriteCellProps extends IMatrixCellProps<IIceBoxSpriteCellData> {
}

const winNumberTextStyle: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    ...GameCellTextStyle,
    dropShadow: false,
    fontSize: 24,
}

const winNumberTextStyleClass = new TextStyle(winNumberTextStyle);

const priceNumberTextStyle: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    ...GameCellTextStyle,
    dropShadow: false,
    fontSize: 18,
}

const priceNumberTextStyleClass = new TextStyle(priceNumberTextStyle);

export function IceBoxSpriteCell({ x, y, width, height, data }: IIceBoxSpriteCellProps) {
    const [winNumber, priceNumber] = data.textureName.split(',');
    

    const { bundle, loading } = useLoadBundle<IIceBoxBundle>(data.bundleName);
    const roboTokenBlueBorder = bundle?.roboTokenBlueBorder;
    const goldenDiamond = bundle?.goldenDiamond;

    const { priceContainerWidth, priceNumberPosition, roboIconSize } = useCellLabelsPosition(winNumber,
        priceNumber,
        width,
        winNumberTextStyleClass,
        priceNumberTextStyleClass
    );

    if (!width || loading) return null;

    if (winNumber.toLowerCase() === 'd') {
        return (
            <Container x={x} y={y} width={width} height={height}>
                <Sprite
                    texture={goldenDiamond}
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                ></Sprite>
            </Container>
        )
    }


    return (
        <Container x={x} y={y} width={width} height={height}>
            <StyledTextPixiEl
                dimensions={{ width, height }}
                text={winNumber}
                textStyles={winNumberTextStyle}
                textFitCoefficient={0.8}
                x={0}
                y={0}
                xShift={0.55}
            />
            <Container
                width={priceContainerWidth}
                height={roboIconSize + 4}
                x={priceNumberPosition.x}
                y={priceNumberPosition.y}
            >
                <Sprite
                    texture={roboTokenBlueBorder}
                    x={0}
                    y={0}
                    width={roboIconSize}
                    height={roboIconSize}
                ></Sprite>
                <Text
                    text={priceNumber}
                    style={priceNumberTextStyleClass}
                    x={roboIconSize}
                    y={-4}
                />
            </Container>
        </Container >
    )
};
