import { IScratchCardHandle, IScratchCardProps, ScratchCard } from '../../ScratchCard';

import { Graphics, Resource, Texture } from 'pixi.js-legacy';
import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './RoundScratchCard.module.scss';
import { IRoundSpriteCellProps, RoundSpriteCell } from './RoundSpriteCell';
import { IGameMatrixConfig, ISpriteCellData } from '@components/shared/IconMatrix';

export interface IRoundScratchCardProps extends Omit<IScratchCardProps, 'data' | 'renderCell'> {
    cellData: string;
    renderCell?: IScratchCardProps['renderCell'];
    xShift?: number;
    yShift?: number;
    isWinning?: boolean;
}

export interface IRoundScratchCardHandle extends IScratchCardHandle {
}

const matrixConfig: IGameMatrixConfig = {
    winningBgTextureWidthCoef: 0.75,
    winningBgTexturePositionShiftCoef: 0.75,
}

function RoundScratchCardComponent(props: IRoundScratchCardProps, ref: Ref<IRoundScratchCardHandle>) {
    const [data, setData] = useState<Omit<ISpriteCellData, 'bundleName'>[][]>([[{ textureName: props.cellData, isWinning: props.isWinning }]])

    useEffect(() => {
        setData([[{ textureName: props.cellData, isWinning: props.isWinning }]])
    }, [props.cellData, props.isWinning])

    const renderCell = useCallback((data: IRoundSpriteCellProps) => (
        <RoundSpriteCell {...data} xShift={props.xShift} yShift={props.yShift}/>
    ), [props.xShift, props.yShift]);

    const renderBg = useCallback((g: Graphics, gradientTexture: Texture<Resource>, width: number, height: number) => {
        g.clear();
        g.beginTextureFill({ texture: gradientTexture });
        g.drawCircle(width / 2, height / 2, width / 2);
        g.endFill();
    }, []);

    useImperativeHandle(ref, () => {
        return {
            reset: () => scratchCardElRef.current?.reset(),
            reveal: () => scratchCardElRef.current?.reveal(),
            getBrush: () => scratchCardElRef.current?.getBrush(),
            getApp: () => scratchCardElRef.current?.getApp(),
            getRenderTexture: () => scratchCardElRef.current?.getRenderTexture(),
        };
    });

    const scratchCardElRef = useRef<IScratchCardHandle>(null);

    return (
        <ScratchCard
            ref={scratchCardElRef}
            data={data}
            className={`${styles.container} ${props.className || ''}`}
            renderCell={renderCell}
            coverTextureName='roundCover'
            sizeX={1}
            sizeY={1}
            renderBg={renderBg}
            activateAreaPercent={0.6}
            activateTotalPercent={0.5}
            brushSizeCoef={0.3}
            {...props}
            matrixConfig={{
                ...matrixConfig,
                ...props.matrixConfig,
            }}
        />);
}


export const RoundScratchCard = forwardRef<IRoundScratchCardHandle, IRoundScratchCardProps>(RoundScratchCardComponent);