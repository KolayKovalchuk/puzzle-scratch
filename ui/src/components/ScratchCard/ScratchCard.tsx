import "@pixi/events";
import { Container, Graphics, Stage, useApp } from '@pixi/react';
import { IScrathCardBundle } from '@src/assetsManifest';

import { IconMatrix, IGameMatrixProps, ISpriteCellProps, SpriteCell } from '@components/shared/IconMatrix';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useContainerDimensions } from '@src/hooks/useContainerDimensions';

import styles from './ScratchCard.module.scss';
import { useIsPercentAreaScratched } from './hooks/useIsAreaScratched';
import { useScratchBrash } from './hooks/useScratchBrash';
import { useScratchedPercent } from './hooks/useScratchedPercent';
import { Texture } from 'pixi.js';
import { useEffect } from 'react';

export type ScratchCardAssetsNames = 'cover' | 'revealed'

export interface IScratchCardProps {
    data: IGameMatrixProps<ISpriteCellProps>['data']
    bundleName: string,
    isDisabled?: boolean,
    activateAreaPercent?: number,
    activateTotalPercent?: number,
    className?: string,
    onScratchedEnought?: () => void
}

// Function to create a gradient texture
function createGradientTexture(width: number, height: number): Texture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#0D3877');
        gradient.addColorStop(0.008960573934018612, '#0D3A7C');
        gradient.addColorStop(0.10215053614228964, '#134D9A');
        gradient.addColorStop(0.18637992441654205, '#1450A1');
        gradient.addColorStop(0.22580644488334656, '#1553A4');
        gradient.addColorStop(0.2473118305206299, '#1555A9');
        gradient.addColorStop(0.31362007558345795, '#185DB4');
        gradient.addColorStop(0.41577062010765076, '#1A66C4');
        gradient.addColorStop(0.51971326768398285, '#1A64BF');
        gradient.addColorStop(0.56913978815078735, '#1962BE');
        gradient.addColorStop(0.5878136456012726, '#1960B9');
        gradient.addColorStop(0.677419364452362, '#1452A3');
        gradient.addColorStop(0.8512544929981232, '#0F3E82');
        gradient.addColorStop(0.9659498333930969, '#0D3B7B');
        gradient.addColorStop(0.9910394251346588, '#0D3877');
        gradient.addColorStop(1, '#0D3877');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }

    return Texture.from(canvas);
}

export function ScratchCardEl({
    bundleName,
    activateAreaPercent = 0.75,
    activateTotalPercent = 0.95,
    isDisabled = false,
    data = [],
    onScratchedEnought,
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

    console.log('isAreaScratched', isAreaScratched);
    console.log('scratchedPercent > activateTotalPercent',scratchedPercent, scratchedPercent > activateTotalPercent);
    console.log('isScratchedEnought', isScratchedEnought);

    useEffect(() => {
        clearTexture();
    }, [data]);

    useEffect(() => {
        if (isScratchedEnought && onScratchedEnought) {
            console.log('Scratched enought');
            onScratchedEnought();
        }
    }, [isScratchedEnought]);

    const { bundle } = useLoadBundle<IScrathCardBundle>(bundleName)
    const coverTexture = bundle?.cover

    if (!bundle || !coverTexture) return null

    const coverData: IGameMatrixProps<ISpriteCellProps>['data'] = Array
        .from({ length: 6 }, () =>
            Array.from({ length: 6 }, () => ({ texture: coverTexture }))
        );

    const gradientTexture = createGradientTexture(width, height);

    return (
        <Container width={width} height={height}>
            <IconMatrix data={coverData} renderCell={(data) => (<SpriteCell {...data} />)} />
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
                    g.drawRect(0, 0, width, height);
                    g.endFill();
                }} />
                <IconMatrix data={data} config={{ padding: 8 }} renderCell={(data) => (<SpriteCell {...data} />)} />
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

