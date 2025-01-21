import { AssetsBundle } from 'pixi.js-legacy';

const SCRATCH_ANIMATION_BUNDLE_BASE_PATH = '/scratchAnimation';

export interface IScratchAnimationBundle {
    scratchCandyBox: any;
    scratchSantaSac: any;
    scratchIceBox: any;
}

export const SCRATCH_ANIMATION_BUNDLE: AssetsBundle = {
    name: 'scratchAnimation',
    assets: [
        {
            alias: 'scratchCandyBox',
            src: `${SCRATCH_ANIMATION_BUNDLE_BASE_PATH}/candy_maze.json`,
        },
        {
            alias: 'scratchSantaSac',
            src: `${SCRATCH_ANIMATION_BUNDLE_BASE_PATH}/santa_box.json`,
        },
        {
            alias: 'scratchIceBox',
            src: `${SCRATCH_ANIMATION_BUNDLE_BASE_PATH}/ice_box.json`,
        },
    ],
};
