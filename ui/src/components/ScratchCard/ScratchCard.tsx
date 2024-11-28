import { IScrathCardBundle } from '@config/assetsManifest';
import "@pixi/events";
import { Container, Graphics, Sprite, Stage, useApp } from '@pixi/react';

import { IconMatrix, IGameMatrixConfig, IGameMatrixProps, IMatrixCellProps } from '@components/shared/IconMatrix';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useContainerDimensions } from '@hooks/useContainerDimensions';

import { Application, ICanvas, Graphics as OriginGraphics, RenderTexture, Resource, Texture } from 'pixi.js';
import { forwardRef, ReactElement, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { CoverSpriteCell } from './CoverCell';
import { useCoverData } from './hooks/useCoverData';
import { GradientConfig } from './hooks/useGradientTexture';
import { useIsPercentAreaScratched } from './hooks/useIsAreaScratched';
import { useRenderBgGraphics } from './hooks/useRenderBgGraphics';
import { useScratchBrash } from './hooks/useScratchBrash';
import { useScratchedPercent } from './hooks/useScratchedPercent';
import { ScratchCardBgGradient } from './ScratchCardBgGradient';

import styles from './ScratchCard.module.scss';

export interface IScratchCardHandle {
    reset: () => void;
    reveal: () => void;
    getBrush: () => OriginGraphics | undefined;
    getRenderTexture: () => RenderTexture | undefined;
    getApp: () => Application<ICanvas> | undefined;
}

export interface IBgTextureConfig {
    textureName: string,
    xShift?: number,
    yShift?: number,
    padding?: number,
}

const defaultBgTextureConfig: IBgTextureConfig = {
    textureName: '',
    xShift: 0,
    yShift: 0,
    padding: 0,
}

export interface IScratchCardProps<CellProps extends IMatrixCellProps = IMatrixCellProps> {
    data: IGameMatrixProps<CellProps>['data'],
    renderCell: (props: CellProps) => ReactElement<CellProps>,
    renderCoverCell?: (props: CellProps) => ReactElement<CellProps>,
    bundleName: string,

    className?: string,

    isDisabled?: boolean,
    activateAreaPercent?: number,
    activateTotalPercent?: number,

    brushSizeCoef?: number,
    sizeX?: number;
    sizeY?: number;
    coverTextureName?: string,

    onScratchStarted?: () => void
    onScratchedEnought?: () => void

    gradientData?: GradientConfig,
    renderBg?(graphics: OriginGraphics, gradientTexture: Texture<Resource>, width: number, height: number): void

    bgTextureConfig?: IBgTextureConfig

    matrixConfig?: IGameMatrixConfig
}

function ScratchCardElComponent({
    bundleName,
    activateAreaPercent = 0.75,
    activateTotalPercent = 0.95,
    brushSizeCoef = 0.35,
    sizeX = 6,
    sizeY = 6,
    coverTextureName = 'cover',
    isDisabled = false,
    data = [],
    gradientData = ScratchCardBgGradient,
    bgTextureConfig: bgTextureConfigArg = defaultBgTextureConfig,
    matrixConfig,
    onScratchedEnought,
    onScratchStarted,
    renderCell,
    renderCoverCell,
    renderBg
}: IScratchCardProps, ref: Ref<IScratchCardHandle>) {
    const app = useApp();
    const { width, height } = app.screen;

    const {
        dragging,
        brush,
        renderTexture,
        renderTextureSprite,
        pointerMove,
        pointerDown,
        pointerOut,
        pointerUp,
        resetTexture,
        revealTexture,
    } = useScratchBrash(isDisabled, brushSizeCoef, onScratchStarted);

    const scratchedPercent = useScratchedPercent(renderTexture, dragging);
    const isAreaScratched = useIsPercentAreaScratched(renderTexture, activateAreaPercent, dragging);
    const isScratchedEnought = isAreaScratched || scratchedPercent > activateTotalPercent;

    useEffect(() => {
        if (isScratchedEnought && onScratchedEnought) {
            console.log('Scratched enought');
            onScratchedEnought();
        }
    }, [isScratchedEnought]);

    const { bundle } = useLoadBundle<IScrathCardBundle>(bundleName)
    const coverTexture = bundle?.[coverTextureName];

    const coverData = useCoverData({ bundleName, textureName: coverTextureName }, sizeX, sizeY);
    const defaultRenderCoverCell = useCallback((props: IMatrixCellProps) => (<CoverSpriteCell {...props} />), []);

    useImperativeHandle(ref, () => {
        return {
            reset: () => {
                resetTexture();
            },
            reveal: () => {
                revealTexture();
                onScratchedEnought && onScratchedEnought();
            },
            getBrush: () => brush,
            getApp: () => app,
            getRenderTexture: () => renderTexture,
        }
    });


    const renderBgGraphics = useRenderBgGraphics(width, height, gradientData, renderBg);
    const renderCardBg = useMemo(() => {
        const bgTextureConfig = {
            ...defaultBgTextureConfig,
            ...bgTextureConfigArg,
        }
        const bgTexture = bundle?.[bgTextureConfig.textureName];
        if (bgTexture) {
            const x = (bgTextureConfig?.xShift || 0) + (bgTextureConfig?.padding || 0);
            const y = (bgTextureConfig?.yShift || 0) + (bgTextureConfig?.padding || 0);

            return (<Sprite
                x={x}
                y={y}
                width={width - (bgTextureConfig?.padding || 0) * 2}
                height={height - (bgTextureConfig?.padding || 0) * 2}
                texture={bgTexture}
            />)
        }

        return (<Graphics draw={renderBgGraphics} />)
    }, [renderBgGraphics, width, height, bundle, bgTextureConfigArg]);

    if (!bundle || !coverTexture) return null

    return (
        <Container width={width} height={height}>
            {renderCardBg}
            <IconMatrix data={coverData} renderCell={renderCoverCell || defaultRenderCoverCell} config={matrixConfig} />
            <Container
                mask={renderTextureSprite}
                pointermove={pointerMove}
                pointerdown={pointerDown}
                pointerout={pointerOut}
                pointerup={pointerUp}
                eventMode='static'
            >
                {renderCardBg}
                <IconMatrix data={data} config={{ cellPadding: 8, ...matrixConfig }} renderCell={renderCell} />
            </Container>
        </Container>
    );
};

export const ScratchCardEl = forwardRef<IScratchCardHandle, IScratchCardProps>(ScratchCardElComponent);

function ScratchCardComponent(props: IScratchCardProps, ref: Ref<IScratchCardHandle>) {
    const scratchCardElRef = useRef<IScratchCardHandle>(null);

    useImperativeHandle(ref, () => {
        return {
            reset: () => scratchCardElRef.current?.reset(),
            reveal: () => scratchCardElRef.current?.reveal(),
            getBrush: () => scratchCardElRef.current?.getBrush(),
            getApp: () => scratchCardElRef.current?.getApp(),
            getRenderTexture: () => scratchCardElRef.current?.getRenderTexture(),
        };
    });

    const { containerRef, dimensions } = useContainerDimensions()
    const width = dimensions.width;
    const height = dimensions.height || dimensions.width;

    const card = useMemo(() => {
        console.log('ScratchCard render', width, height);
        

        return (
            <div className={`${styles.container} ${props.className || ''}`} ref={containerRef}>
                {!!width && <Stage width={width} height={height} options={{ backgroundAlpha: 0 }}>
                    <ScratchCardEl {...props} ref={scratchCardElRef}/>
                </Stage>}
            </div>
        );
    }, [
        width,
        height,

        props.renderCell,
        props.renderCoverCell,
        props.renderBg,
        props.data,
        props.bundleName,
        props.className,
        props.isDisabled,
        props.activateAreaPercent,
        props.activateTotalPercent,
        props.brushSizeCoef,
        props.sizeX,
        props.sizeY,
        props.coverTextureName,
        props.gradientData,
        props.bgTextureConfig,
        props.matrixConfig,

        props.onScratchStarted,
        props.onScratchedEnought,
    ]);

    return card;
}

export const ScratchCard = forwardRef<IScratchCardHandle, IScratchCardProps>(ScratchCardComponent);
