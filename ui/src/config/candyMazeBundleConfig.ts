import { AssetsBundle, Texture } from 'pixi.js';
import { IScrathCardBundle } from './assetsManifest';

const CANDY_MAZE_BUNDLE_BASE_PATH = '/candyMaze';

export interface ICandyMazeBundle extends IScrathCardBundle {
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

export const CANDY_MAZE_BUNDLE: AssetsBundle = {
    name: 'candyMaze',
    assets: [
        {
            alias: 'cover',
            src: `/cover.png`,
        },
        {
            alias: 'greenCandy',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/greenCandy.png`,
        },
        {
            alias: 'stickIceCream',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/stickIceCream.png`,
        },
        {
            alias: 'miffunIceCream',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/miffunIceCream.png`,
        },
        {
            alias: 'bigRedCandy',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/bigRedCandy.png`,
        },
        {
            alias: 'donutCandy',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/donutCandy.png`,
        },
        {
            alias: 'squareCandy',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/squareCandy.png`,
        },
        {
            alias: 'moonShapeCandy',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/moonShapeCandy.png`,
        },
        {
            alias: 'roundCandy',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/roundCandy.png`,
        },
        {
            alias: 'chocolateCandy',
            src: `${CANDY_MAZE_BUNDLE_BASE_PATH}/chocolateCandy.png`,
        },
    ],
};
