import { TextMetrics } from 'pixi.js';
import { useEffect, useState } from 'react';
import { ItemPrizeTextStyles } from '../SantaSacSpriteCell';

export function useItemPrizePosition(itemPrize: number, width: number, height: number) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        if (!itemPrize) return;

        const metrics = TextMetrics.measureText(itemPrize.toString(), ItemPrizeTextStyles);

        const x = width / 2 - metrics.width / 2;
        const y = height - metrics.height / 1.5;

        setPosition({ x, y });
    }, [
        width,
        height,
        itemPrize,
        ItemPrizeTextStyles
    ]);

    return position;
}