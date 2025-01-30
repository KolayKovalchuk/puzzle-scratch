import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix/IconMatrix.models';
import { DefaultTextStyleConfig, StyledTextPixiEl } from '@components/shared/StyledText';
import { GameCellTextStyle } from '@components/shared/StyledText/components/GameCellStyledText';
import { IIceBoxBundle } from '@config/iceBoxBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite } from '@pixi/react';
import { ITextStyle, TextStyle } from 'pixi.js-legacy';
import { useCellLabelsPosition } from './hooks/useCellLabelsPosition';

export interface IIceBoxSpriteCellData extends ISpriteCellData {
    textureName: string;
    bundleName: string;
}

export interface IIceBoxSpriteCellProps extends IMatrixCellProps<IIceBoxSpriteCellData> {
}

const winNumberTextStyle: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    ...GameCellTextStyle,
    dropShadow: false,
    fontSize: 20,
}

const winNumberTextStyleClass = new TextStyle(winNumberTextStyle);

const priceNumberTextStyle: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    ...GameCellTextStyle,
    dropShadow: false,
    fontSize: 14,
}

const priceNumberTextStyleClass = new TextStyle(priceNumberTextStyle);

export function IceBoxSpriteCell({ x, y, width, height, data }: IIceBoxSpriteCellProps) {
    const [winNumber, priceNumber] = data.textureName.split(',');
    

    const { bundle, loading } = useLoadBundle<IIceBoxBundle>(data.bundleName);
    const roboTokenBlueBorder = bundle?.roboTokenBlueBorder;
    const goldenDiamond = bundle?.goldenDiamond;

    const { priceContainerWidth, priceNumberPosition, roboIconSize } = useCellLabelsPosition(
        winNumber,
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
                    width={width - 5}
                    height={height - 5}
                ></Sprite>
            </Container>
        )
    }


    return (
        <Container x={x} y={y - 8} width={width} height={height}>
            <StyledTextPixiEl
                dimensions={{ width, height }}
                text={winNumber}
                textStyles={winNumberTextStyle}
                textFitCoefficient={0.8}
                x={0}
                y={0}
                xShift={0.55}
                valueForMeasure={'1000'}
            />
            <Container
                width={priceContainerWidth}
                height={roboIconSize}
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

                <StyledTextPixiEl
                    dimensions={{ width: priceContainerWidth - roboIconSize, height: roboIconSize }}
                    text={priceNumber}
                    textStyles={priceNumberTextStyleClass}
                    textFitCoefficient={1}
                    x={roboIconSize}
                    y={0}
                    // xShift={0.55}
                    valueForMeasure={'100'}
                    // shouldFitFontSize={false}
                />
            </Container>
        </Container >
    )
};
