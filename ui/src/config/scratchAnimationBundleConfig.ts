import { AssetsBundle } from 'pixi.js-legacy';

const SCRATCH_ANIMATION_BUNDLE_BASE_PATH = '/scratchAnimation';

export interface IScratchAnimationBundle {
    scratchCandyBox: any;
    scratchSantaSac: any;
    scratchIceBox: any;
    scratchLuckyClover: any;
}

export const SCRATCH_ANIMATION_BUNDLE: AssetsBundle = {
    name: 'scratchAnimation',
    assets: [
        {
            alias: 'scratchCandyBox',
            src: `${SCRATCH_ANIMATION_BUNDLE_BASE_PATH}/candy_maze_updated.json`,
        },
        {
            alias: 'scratchSantaSac',
            src: `${SCRATCH_ANIMATION_BUNDLE_BASE_PATH}/santa_box_updated.json`,
        },
        {
            alias: 'scratchIceBox',
            src: `${SCRATCH_ANIMATION_BUNDLE_BASE_PATH}/ice_box_updated.json`,
        },
        {
            alias: 'scratchLuckyClover',
            src: `${SCRATCH_ANIMATION_BUNDLE_BASE_PATH}/clover_box.json`,
        },
    ],
};
