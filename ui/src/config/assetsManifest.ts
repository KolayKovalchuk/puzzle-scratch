import { AssetsManifest, Texture } from 'pixi.js';
import { IBundle } from '@hooks/useAssetsBundleLoader';

const SCRATCH_CARD_BUNDLE_BASE_PATH = '/scratchCard';

export interface IScrathCardBundle extends IBundle {
    cover: Texture;
    greenCandy: Texture;
    stickIceCream: Texture;
    miffunIceCream: Texture;
    donutCandy: Texture;
    squareCandy: Texture;
    moonShapeCandy: Texture;
    roundCandy: Texture;
    bigRedCandy: Texture;
    chocolateCandy: Texture;
    w2: Texture;
    w3: Texture;
    w4: Texture;
    w5: Texture;
}

export const ASSETS_MANIFEST: AssetsManifest = {
    bundles: [
        {
            name: 'scratchCard',
            assets: [
                {
                    alias: 'cover',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/cover.png`,
                },
                {
                    alias: 'greenCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/greenCandy.png`,
                },
                {
                    alias: 'stickIceCream',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/stickIceCream.png`,
                },
                {
                    alias: 'miffunIceCream',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/miffunIceCream.png`,
                },
                {
                    alias: 'bigRedCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/bigRedCandy.png`,
                },
                {
                    alias: 'donutCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/donutCandy.png`,
                },
                {
                    alias: 'squareCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/squareCandy.png`,
                },
                {
                    alias: 'moonShapeCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/moonShapeCandy.png`,
                },
                {
                    alias: 'roundCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/roundCandy.png`,
                },
                {
                    alias: 'chocolateCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/chocolateCandy.png`,
                },
            ],
        },
    ],
};

export const bundleNameList = ASSETS_MANIFEST.bundles.map((bundle) => bundle.name);