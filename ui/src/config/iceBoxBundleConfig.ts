import { AssetsBundle, Texture } from 'pixi.js';
import { IScrathCardBundle } from './assetsManifest';

const ICE_BOX_BUNDLE_BASE_PATH = '/iceBox';

export interface IIceBoxBundle extends IScrathCardBundle {
    redBall: Texture;
    roundCover: Texture;
    coinSpine: any;
    roboTokenBlueBorder: Texture;
    goldenDiamond: Texture;
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
            alias: 'blueDaimond',
            src: `${ICE_BOX_BUNDLE_BASE_PATH}/diamonds/blue_daimond.png`,
        },

        {
            alias: 'greenDaimond',
            src: `${ICE_BOX_BUNDLE_BASE_PATH}/diamonds/green_daimond.png`,
        },

        {
            alias: 'orangeDaimond',
            src: `${ICE_BOX_BUNDLE_BASE_PATH}/diamonds/orange_daimond.png`,
        },

        {
            alias: 'pinkDaimond',
            src: `${ICE_BOX_BUNDLE_BASE_PATH}/diamonds/pink_daimond.png`,
        },

        {
            alias: 'redDaimond',
            src: `${ICE_BOX_BUNDLE_BASE_PATH}/diamonds/red_daimond.png`,
        },

        {
            alias: 'goldenDiamond',
            src: `${ICE_BOX_BUNDLE_BASE_PATH}/diamonds/golden_daimond.png`,
        },

        {
            alias: 'roboTokenBlueBorder',
            src: `/robo_token_blue_border.png`,
        },
    ],
};
