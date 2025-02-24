import { IMatrixCellProps, ISpriteCellData } from '@components/shared/IconMatrix';
import { defaultConfig } from '@components/shared/IconMatrix/hooks/useCellSize';
import { WinningBg } from '@components/shared/IconMatrix/WinningBg';
import { DefaultTextStyleConfig, StyledTextPixiEl, WinStyledTextConfig } from '@components/shared/StyledText';
import { ILuckyCloverBundle, LUCKY_CLOVER_BUNDLE } from '@config/luckyCloverBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Sprite } from '@pixi/react';
import { ITextStyle } from 'pixi.js-legacy';

const topScratchCardTextStyles: Partial<ITextStyle> = {
    ...DefaultTextStyleConfig,
    ...WinStyledTextConfig,
    fontSize: 26,
}

export interface ILuckyTopScratchCellProps extends IMatrixCellProps<ISpriteCellData> {
}

export function LuckyTopScratchCell({ x, y, width, height, data }: ILuckyTopScratchCellProps) {
    const value = data.textureName + '';
    const { bundle, loading } = useLoadBundle<ILuckyCloverBundle>(LUCKY_CLOVER_BUNDLE.name);

    if (!value || loading || !bundle) return null;

    const isValueVisible = value !== '0';
    const textX = width * 0.03;
    const textY = height * 0.02;

    return (<Container
        x={x}
        y={y}
        width={width}
        height={height}
    >
        <Sprite
            width={width}
            height={height}
            texture={bundle.luckyCloverTopCellBg}
        />
        <WinningBg
            x={0}
            y={0}
            cellWidth={width}
            config={{
                ...defaultConfig,
                winningBgTextureWidthCoef: 0.8,
                winningBgTexturePositionShiftCoef: 0.8,
            }}
            winningBgTexture={bundle.winningMatrixCellBg}
            isWinning={!!data.isWinning}
        />
        {isValueVisible ? <StyledTextPixiEl
            dimensions={{ width, height }}
            text={value}
            textStyles={topScratchCardTextStyles}
            x={textX}
            y={textY}
            valueForMeasure='99'
        />
            : null}
    </Container>
    )
};
