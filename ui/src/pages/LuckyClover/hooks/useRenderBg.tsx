import { ILuckyCloverBundle, LUCKY_CLOVER_BUNDLE } from '@config/luckyCloverBundleConfig';
import { useLoadBundle } from '@hooks/useAssetsBundleLoader';
import { Container, Graphics, Sprite } from '@pixi/react';
import { Resource, Texture } from 'pixi.js-legacy';
import { useCallback } from 'react';

export function useRenderBg() {
    const { bundle, loading } = useLoadBundle<ILuckyCloverBundle>(LUCKY_CLOVER_BUNDLE.name);

    const renderBgGradient = useCallback((gradientTexture: Texture<Resource>, width: number, height: number) => {
        return (<Graphics draw={g => {
            g.clear()
            .beginTextureFill({ texture: gradientTexture })
            .drawRoundedRect(0, 0, width, height, 14)
            .endFill()
        }}
        />);


    }, []);

    const renderCloverBg = useCallback((fullWidth: number, fullHeight: number) => {
        if (!bundle || loading) return <></>;

        const cloverTexture = bundle.clover;
        const width = (fullWidth / 2);
        const height = (fullHeight / 2);
        
        return Array.from({ length: 4 }).map((_, index) => {
            const x = index % 2 === 0 ? 0 : fullWidth - width;
            const y = index < 2 ? 0 : fullHeight - height;
            return (<Sprite
                key={index}
                texture={cloverTexture}
                x={x}
                y={y}
                width={width}
                height={height}
            />);
        });

    }, [bundle, loading]);

    const renderBgTexture = useCallback((gradientTexture: Texture<Resource>, width: number, height: number) => {
        const bgGradient = renderBgGradient(gradientTexture, width, height);
        const bgClover = renderCloverBg(width, height);

        return (<Container width={width} height={height}>
            {bgGradient}
            {bgClover}
        </Container>);

    }, [bundle, loading]);

    return { renderBgTexture };
}
