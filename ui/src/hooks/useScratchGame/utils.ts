import { IScratchCardHandle } from '@components/ScratchCard';
import { RefObject } from 'react';

export function _applyForEachScratchCardRef<T extends IScratchCardHandle = IScratchCardHandle>(
    scratchCardsRefConfig: { [key: string]: RefObject<T> },
    callback: (ref: T, index: number) => void
) {
    if (!scratchCardsRefConfig) return {};

    const scratchCardsRefList = Object.values(scratchCardsRefConfig);

    for (let index = 0; index < scratchCardsRefList.length; index++) {
        const scratchCardRef = scratchCardsRefList[index];
        if (scratchCardRef.current) {
            callback(scratchCardRef.current, index);
        }
    }
}

export function _getScratchedStateConfig(config: { [key: string]: RefObject<IScratchCardHandle> }, value: boolean) {
    if (!config) return {};
    return Object.keys(config).reduce((acc: { [key: string]: boolean }, key) => {
        acc[key] = value;
        return acc;
    }, {})
}
