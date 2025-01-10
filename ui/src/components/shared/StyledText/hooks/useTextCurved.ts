import { useApp } from '@pixi/react';
import { BaseTexture, Container, Matrix, Point, RenderTexture, SimpleRope, Sprite, Text, Texture } from 'pixi.js-legacy';
import { useEffect, useRef } from 'react';

export function useTextCurved() {
    const app = useApp();
    const spriteRef = useRef<Sprite>(null);

    useEffect(() => {
        if (!spriteRef?.current) return;

        const text = new Text("HELLO WORLD, HOW ARE YOU TODAY?", { fontSize: 50, fill: 'white' });
        text.updateText(true);

        const radius = 300;
        const maxRopePoints = 100;
        const step = Math.PI / maxRopePoints;

        let ropePoints = maxRopePoints - Math.round((text.texture.width / (radius * Math.PI)) * maxRopePoints);
        ropePoints /= 2;

        const points = [];
        for (let i = maxRopePoints - ropePoints; i > ropePoints; i--) {
            const x = radius * Math.cos(step * i);
            const y = radius * Math.sin(step * i);
            points.push(new Point(x, -y));
        }

        const container = new Container();
        const rope = new SimpleRope(text.texture, points);
        container.addChild(rope);
        const bounds = container.getLocalBounds();
        const matrix = new Matrix();
        matrix.tx = -bounds.x;
        matrix.ty = -bounds.y;

        const renderTexture = RenderTexture.create({ width: bounds.width, height: bounds.height });
        app.renderer.render(container, { renderTexture, clear: true, transform: matrix });
        BaseTexture.addToCache(renderTexture.baseTexture, 'curvedText');
        Texture.addToCache(renderTexture, 'curvedText');

        if (spriteRef.current) {
            spriteRef.current.texture = Texture.from('curvedText');
            spriteRef.current.position.set(50, 100);
        }

        container.destroy(true);
        text.destroy(true);

        return () => {
            BaseTexture.removeFromCache('curvedText');
            Texture.removeFromCache('curvedText');
        };
    }, [app, spriteRef?.current]);

    return spriteRef;
}