import { IScratchCardHandle, IScratchCardProps, ScratchCard } from '../../ScratchCard';

import { Graphics, Resource, Texture } from 'pixi.js';
import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './RoundScratchCard.module.scss';
import { RoundSpriteCell } from './RoundSpriteCell';

export interface IRoundScratchCardProps extends Omit<IScratchCardProps, 'data' | 'renderCell'> {
    cellData: string;
    renderCell?: IScratchCardProps['renderCell'];
    xShift?: number;
    yShift?: number;
}

export interface IRoundScratchCardHandle extends IScratchCardHandle {
}

function RoundScratchCardComponent(props: IRoundScratchCardProps, ref: Ref<IRoundScratchCardHandle>) {
    const [data, setData] = useState<{ textureName: string }[][]>([[{ textureName: props.cellData }]])

    useEffect(() => {
        setData([[{ textureName: props.cellData }]])
    }, [props.cellData])

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
            renderCell={(data) => (<RoundSpriteCell {...data} xShift={props.xShift} yShift={props.yShift}/>)}
            coverTextureName='roundCover'
            sizeX={1}
            sizeY={1}
            renderBg={renderBg}
            activateAreaPercent={0.6}
            activateTotalPercent={0.5}
            brushSizeCoef={0.3}
            {...props}
        />);
}


export const RoundScratchCard = forwardRef<IRoundScratchCardHandle, IRoundScratchCardProps>(RoundScratchCardComponent);