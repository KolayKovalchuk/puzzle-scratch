import { IScrathCardBundle } from '@config/assetsManifest';
import "@pixi/events";
import { Container, Graphics, Sprite, Stage as PixiStage, useApp } from '@pixi/react';
import { ReactReduxContext } from 'react-redux';

import { IconMatrix, IGameMatrixConfig, IGameMatrixProps, IMatrixCellProps } from '@components/shared/IconMatrix';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { useContainerDimensions } from '@hooks/useContainerDimensions';

import { Application, ICanvas, Graphics as OriginGraphics, RenderTexture, Resource, Texture } from 'pixi.js-legacy';
import { FC, forwardRef, ReactElement, ReactNode, Ref, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { GradientConfig, useGradientTexture } from './hooks/useGradientTexture';
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
    coverTextureName?: string | string[][],

    onScratchStarted?: () => void
    onScratchedEnought?: () => void

    gradientData?: GradientConfig,
    renderBg?(graphics: OriginGraphics, gradientTexture: Texture<Resource>, width: number, height: number): void
    renderBgTexture?: (gradientTexture: Texture<Resource>, width: number, height: number) => ReactElement

    bgTextureConfig?: IBgTextureConfig

    matrixConfig?: IGameMatrixConfig
    coverMatrixConfig?: IGameMatrixConfig

    winningBgTexture?: Texture | null
}

const ContextBridge = ({ children, Context, render }: { children: ReactNode, Context: any, render: (children: ReactNode) => ReactNode }) => {
    return (
        <Context.Consumer>
            {(value: any) =>
                render(<Context.Provider value={value}>{children}</Context.Provider>)
            }
        </Context.Consumer>
    );
};

interface StageProps {
    children: ReactNode;
    [key: string]: any;
}

export const Stage: FC<StageProps> = ({ children, ...props }) => {
    return (
        <ContextBridge
            Context={ReactReduxContext}
            render={(children: ReactNode) => <PixiStage {...props}>{children}</PixiStage>}
        >
            {children}
        </ContextBridge>
    );
};

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
    coverMatrixConfig,
    onScratchedEnought,
    onScratchStarted,
    renderCell,
    renderCoverCell,
    renderBg,
    renderBgTexture,
    winningBgTexture,
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
    // const coverData = useCoverData(bundleName, coverTextureName, sizeX, sizeY);
    // const defaultRenderCoverCell = useCallback((props: IMatrixCellProps) => (<CoverSpriteCell {...props} />), []);

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

    const gradientTexture = useGradientTexture(width, height, gradientData);
    const renderCardBg = useMemo(() => {
        if (renderBgTexture) {
            return renderBgTexture(gradientTexture, width, height);
        }

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

    // if (!bundle || !coverData.length) return null
    if (!bundle) return null

    const winningTexture = winningBgTexture || winningBgTexture === null ? winningBgTexture : bundle.winningMatrixCellBg;

    return (
        <Container width={width} height={height}>
            {renderCardBg}
            {/* <IconMatrix data={coverData} renderCell={renderCoverCell || defaultRenderCoverCell} config={coverMatrixConfig || matrixConfig} /> */}
            <Container
                mask={renderTextureSprite}
                pointermove={pointerMove}
                pointerdown={pointerDown}
                pointerout={pointerOut}
                pointerup={pointerUp}
                eventMode='static'
            >
                {renderCardBg}
                <IconMatrix
                    data={data}
                    config={{ cellPadding: 8, ...matrixConfig }}
                    renderCell={renderCell}
                    winningBgTexture={winningTexture}
                />
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
        return (
            <div className={`${styles.container} ${props.className || ''}`} ref={containerRef}>
                {!!width && <Stage width={width} height={height} options={{ backgroundAlpha: 0, forceCanvas: true }}>
                    <ScratchCardEl {...props} ref={scratchCardElRef} />
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
        props.coverMatrixConfig,

        props.matrixConfig?.cellWidth,
        props.matrixConfig?.cellHeight,
        props.matrixConfig?.cellPadding,
        props.matrixConfig?.containerPadding,

        props.coverMatrixConfig?.cellWidth,
        props.coverMatrixConfig?.cellHeight,

        props.onScratchStarted,
        props.onScratchedEnought,

        props.winningBgTexture,
    ]);

    return card;
}

export const ScratchCard = forwardRef<IScratchCardHandle, IScratchCardProps>(ScratchCardComponent);
