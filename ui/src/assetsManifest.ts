import { Texture } from 'pixi.js';

const SCRATCH_CARD_BUNDLE_BASE_PATH = '/scratchCard';

export interface IScrathCardBundle {
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

export const ASSETS_MANIFEST = {
    bundles: [
        {
            name: 'scratchCard',
            assets: [
                {
                    alias: 'cover',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/cover.svg`,
                },
                {
                    alias: 'greenCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/greenCandy.svg`,
                },
                {
                    alias: 'stickIceCream',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/stickIceCream.svg`,
                },
                {
                    alias: 'miffunIceCream',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/miffunIceCream.svg`,
                },
                {
                    alias: 'donutCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/donutCandy.svg`,
                },
                {
                    alias: 'squareCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/squareCandy.svg`,
                },
                {
                    alias: 'moonShapeCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/moonShapeCandy.svg`,
                },
                {
                    alias: 'roundCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/roundCandy.svg`,
                },
                {
                    alias: 'bigRedCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/bigRedCandy.svg`,
                },
                {
                    alias: 'chocolateCandy',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/chocolateCandy.svg`,
                },
                {
                    alias: 'w2',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/w2.svg`,
                },
                {
                    alias: 'w3',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/w3.svg`,
                },
                {
                    alias: 'w4',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/w4.svg`,
                },
                {
                    alias: 'w5',
                    src: `${SCRATCH_CARD_BUNDLE_BASE_PATH}/w5.svg`,
                },
            ],
        },
    ],
};

export const bundleNameList = ASSETS_MANIFEST.bundles.map((bundle) => bundle.name);