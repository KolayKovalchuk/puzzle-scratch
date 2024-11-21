import { IScrathCardBundle } from '@config/assetsManifest';
import "@pixi/events";
import { Container, Graphics, Stage, useApp } from '@pixi/react';

import { IconMatrix, IGameMatrixProps, IMatrixCellProps } from '@components/shared/IconMatrix';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useContainerDimensions } from '@hooks/useContainerDimensions';

import { ReactElement, useEffect } from 'react';
import styles from './ScratchCard.module.scss';
import { useCoverData } from './hooks/useCoverData';
import { GradientConfig, useGradientTexture } from './hooks/useGradientTexture';
import { useIsPercentAreaScratched } from './hooks/useIsAreaScratched';
import { useScratchBrash } from './hooks/useScratchBrash';
import { useScratchedPercent } from './hooks/useScratchedPercent';
import { ScratchCardBgGradient } from './ScratchCardBgGradient';

export type ScratchCardAssetsNames = 'cover' | 'revealed'

export interface IScratchCardProps<CellProps extends IMatrixCellProps = IMatrixCellProps> {
    data: IGameMatrixProps<CellProps>['data'],
    bundleName: string,
    renderCell: (props: CellProps) => ReactElement<CellProps>,
    gradientData?: GradientConfig,
    isDisabled?: boolean,
    activateAreaPercent?: number,
    activateTotalPercent?: number,
    matrixSize?: number,
    coverTextureName?: string,
    className?: string,
    onScratchedEnought?: () => void
}

export function ScratchCardEl({
    bundleName,
    activateAreaPercent = 0.75,
    activateTotalPercent = 0.95,
    matrixSize = 6,
    coverTextureName = 'cover',
    isDisabled = false,
    data = [],
    gradientData = ScratchCardBgGradient,
    onScratchedEnought,
    renderCell,
}: IScratchCardProps) {
    const app = useApp();
    const { width, height } = app.screen;

    const {
        dragging,
        renderTexture,
        renderTextureSprite,
        pointerMove,
        pointerDown,
        pointerUp,
        clearTexture
    } = useScratchBrash(isDisabled);

    const scratchedPercent = useScratchedPercent(renderTexture, dragging);
    const isAreaScratched = useIsPercentAreaScratched(renderTexture, activateAreaPercent, dragging);
    const isScratchedEnought = isAreaScratched || scratchedPercent > activateTotalPercent;

    useEffect(() => {
        clearTexture();
    }, [data]);

    useEffect(() => {
        if (isScratchedEnought && onScratchedEnought) {
            console.log('Scratched enought');
            onScratchedEnought();
        }
    }, [isScratchedEnought]);

    const gradientTexture = useGradientTexture(width, height, gradientData);

    const coverData = useCoverData({ bundleName, textureName: coverTextureName }, matrixSize);

    const { bundle } = useLoadBundle<IScrathCardBundle>(bundleName)
    const coverTexture = bundle?.cover

    if (!bundle || !coverTexture) return null
    return (
        <Container width={width} height={height}>
            <Graphics draw={(g) => {
                g.clear();
                g.beginTextureFill({ texture: gradientTexture });
                g.drawRoundedRect(0, 0, width, height, 20);
                g.endFill();
            }} />
            <IconMatrix data={coverData} renderCell={renderCell}/>
            <Container
                mask={renderTextureSprite}
                pointermove={pointerMove}
                pointerdown={pointerDown}
                pointerup={pointerUp}
                eventMode='static'
            >
                <Graphics draw={(g) => {
                    g.clear();
                    g.beginTextureFill({ texture: gradientTexture });
                    g.drawRoundedRect(0, 0, width, height, 20);
                    g.endFill();
                }} />
                <IconMatrix data={data} config={{ cellPadding: 8 }} renderCell={renderCell} />
            </Container>
        </Container>
    );
};

export function ScratchCard(props: IScratchCardProps) {
    const { containerRef, dimensions } = useContainerDimensions()

    const size = dimensions.width;

    return (
        <div className={`${styles.container} ${props.className || ''}`} ref={containerRef}>
            {!!size && <Stage width={dimensions.width} height={dimensions.width} options={{ backgroundAlpha: 0 }}>
                <ScratchCardEl {...props} />
            </Stage>}
        </div>
    );
}

