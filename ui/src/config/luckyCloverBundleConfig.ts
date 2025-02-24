import { AssetsBundle, Texture } from 'pixi.js-legacy';
import { IScrathCardBundle } from './assetsManifest';

// TODO: vegas loot 
const LUCKY_CLOVER_BUNDLE_BASE_PATH = '/luckyClover';

export interface ILuckyCloverBundle extends IScrathCardBundle {
    clover: Texture;
    luckyCloverTopCellBg: Texture;
}

export const LUCKY_CLOVER_BUNDLE: AssetsBundle = {
    name: 'luckyClover',
    assets: [
        {
            alias: 'clover',
            src: `${LUCKY_CLOVER_BUNDLE_BASE_PATH}/clover.png`,
        },
        {
            alias: 'winningMatrixCellBg',
            src: `/winningMatrixCellBg.png`,
        },
        {
            alias: 'luckyCloverTopCellBg',
            src: `${LUCKY_CLOVER_BUNDLE_BASE_PATH}/lucky_clover_top_cell_bg.png`
        }
    ],
};
