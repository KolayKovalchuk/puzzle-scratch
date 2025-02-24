import { AssetsBundle, Texture } from 'pixi.js-legacy';
import { IScrathCardBundle } from './assetsManifest';

// TODO: vegas loot 
const VEGAS_LOOT_BUNDLE_BASE_PATH = '/vegasLoot';

export interface IVegasLootBundle extends IScrathCardBundle {
    bar: Texture;
    cherry: Texture;
    crown: Texture;
    cup: Texture;
    diece: Texture;
    hearts: Texture;
    seven: Texture;
    spades: Texture;
    w2: Texture;
    w3: Texture;
    w4: Texture;
    w5: Texture;
}

export const VEGAS_LOOT_BUNDLE: AssetsBundle = {
    name: 'vegasLoot',
    assets: [
        {
            alias: 'cover',
            src: `/cover.png`,
        },
        {
            alias: 'winningMatrixCellBg',
            src: `/winningMatrixCellBg.png`,
        },
        {
            alias: 'wideCover',
            src: `/wideCover.png`,
        },
        {
            alias: 'bar',
            src: `${VEGAS_LOOT_BUNDLE_BASE_PATH}/bar.png`,
        },
        {
            alias: 'cherry',
            src: `${VEGAS_LOOT_BUNDLE_BASE_PATH}/cherry.png`,
        },
        {
            alias: 'crown',
            src: `${VEGAS_LOOT_BUNDLE_BASE_PATH}/crown.png`,
        },
        {
            alias: 'cup',
            src: `${VEGAS_LOOT_BUNDLE_BASE_PATH}/cup.png`,
        },
        {
            alias: 'diece',
            src: `${VEGAS_LOOT_BUNDLE_BASE_PATH}/diece.png`,
        },
        {
            alias: 'hearts',
            src: `${VEGAS_LOOT_BUNDLE_BASE_PATH}/hearts.png`,
        },
        {
            alias: 'seven',
            src: `${VEGAS_LOOT_BUNDLE_BASE_PATH}/seven.png`,
        },
        {
            alias: 'spades',
            src: `${VEGAS_LOOT_BUNDLE_BASE_PATH}/spades.png`,
        },
    ],
};
