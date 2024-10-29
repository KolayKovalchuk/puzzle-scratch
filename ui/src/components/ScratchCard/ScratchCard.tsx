// import useAppLoader from "@hooks/useAppLoader";
import "@pixi/events";
import { Container, Sprite, Text, useApp } from '@pixi/react';
import { FederatedPointerEvent, Graphics, Sprite as OriginSprite, RenderTexture, Texture } from "pixi.js";
import { FC, useMemo } from 'react';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';

export type ScratchCardAssetsNames = 'cover' | 'revealed'

export type IScratchCardBundleConfig = {
    [key in ScratchCardAssetsNames]: string;
};

export type IScratchCardBundle = {
    [key in ScratchCardAssetsNames]: Texture;
};

export interface IScratchCardProps {
    bundleName: string,
}

export const ScratchCard: FC<IScratchCardProps> = ({ bundleName }) => {
    const app = useApp();
    const { width, height } = app.screen;

    // brush
    const brush = useMemo(() => new Graphics(), []);
    const brushRadius = width * 0.1;
    brush.beginFill(0xffffff);
    brush.drawCircle(0, 0, brushRadius);
    brush.endFill();

    // mask
    const renderTexture = useMemo(() => RenderTexture.create({
        width: app.screen.width,
        height: app.screen.height
    }), [app]);

    const renderTextureSprite = new OriginSprite(renderTexture);

    let dragging = false;

    const pointerMove = (e: FederatedPointerEvent) => {
        if (dragging) {
            console.log("move");
            brush.position.copyFrom(e.global);
            app.renderer.render(brush, {
                renderTexture,
                clear: false,
            })
        }
    };

    const pointerDown = (e: FederatedPointerEvent) => {
        console.log("down");
        dragging = true;
        pointerMove(e);
    };

    const pointerUp = () => {
        console.log("up");
        dragging = false;
        app.renderer.render(brush, {
            renderTexture,
            clear: false,
        })
    };


    const { bundle, loading } = useLoadBundle<IScratchCardBundle>(bundleName)

    //TODO: Provide with error loading screen
    if (!bundle) return null

    const coverTexture = bundle.cover
    const revealedTexture = bundle.revealed


    //TODO: Provide with loading screen
    if (loading) return (
        <Container>
            <Text text='test'></Text>
        </Container>
    )

    return (
        <Container>
            <Sprite width={width} height={height} texture={coverTexture} />
            <Sprite
                eventMode='static'
                width={width}
                height={height}
                texture={revealedTexture}
                mask={renderTextureSprite}
                pointermove={pointerMove}
                pointerdown={pointerDown}
                pointerup={pointerUp}
            />
        </Container>
    );
};

