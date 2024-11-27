import { AssetsBundle, Texture } from 'pixi.js';
import { IScrathCardBundle } from './assetsManifest';

const ICE_BOX_BUNDLE_BASE_PATH = '/iceBox';

export interface IIceBoxBundle extends IScrathCardBundle {
    redBall: Texture;
    roundCover: Texture;
    coinSpine: any;
}

export const ICE_BOX_BUNDLE: AssetsBundle = {
    name: 'iceBox',
    assets: [
        {
            alias: 'cover',
            src: `/cover.png`,
        },

        {
            alias: 'redBall',
            src: `${ICE_BOX_BUNDLE_BASE_PATH}/ice_box_red_ball.png`,
        },
        {
            alias: 'roundCover',
            src: `/roundCover.png`,
        },


        {
            alias: 'coinSpine',
            src: `/coinsAnimation/coin.json`,
        },
    ],
};
