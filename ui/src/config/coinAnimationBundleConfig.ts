import { AssetsBundle } from 'pixi.js-legacy';

const COIN_ANIMATION_BUNDLE_BASE_PATH = '/coinsAnimation';

export interface ICoinAnimationBundle {
    coinSpine: any;
}

export const COIN_ANIMATION_BUNDLE: AssetsBundle = {
    name: 'coinAnimation',
    assets: [
        {
            alias: 'coinSpine',
            src: `${COIN_ANIMATION_BUNDLE_BASE_PATH}/coin.json`,
        },
    ],
};
