import { TextMetrics } from 'pixi.js-legacy';
import { useEffect, useState } from 'react';
import { ItemPrizeTextStylesClass } from '../SantaSacSpriteCell';

const cache = new Map<string, TextMetrics>();

function getMetrics(targetCacheKey: string, value: string): TextMetrics {
    if (cache.has(targetCacheKey)) {
        const cacheMetrics = cache.get(targetCacheKey) as TextMetrics;
        return cacheMetrics;
    } else {
        const metrics = TextMetrics.measureText(value, ItemPrizeTextStylesClass);
        cache.set(targetCacheKey, metrics);
        return metrics;
    }
}

export function useItemPrizePosition(itemPrize: number, width: number, height: number) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        if (typeof itemPrize !== 'number') return;

        const targetCacheKey = `${itemPrize}-${width}-${height}`;
        const metrics: TextMetrics = getMetrics(targetCacheKey, itemPrize.toString());

        const x = 0;
        const y = height - metrics.height * 1.4;

        setPosition({ x, y });
    }, [
        width,
        height,
        itemPrize,
        ItemPrizeTextStylesClass
    ]);

    return position;
}