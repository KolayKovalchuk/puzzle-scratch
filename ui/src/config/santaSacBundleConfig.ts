import { AssetsBundle, Texture } from 'pixi.js';
import { IScrathCardBundle } from './assetsManifest';

const SANTA_SAC_BUNDLE_BASE_PATH = '/santaSac';

export interface ISantaSacBundle extends IScrathCardBundle {
    boat: Texture;
    bagOfCash: Texture;
    champain: Texture;
    goldBar: Texture;
    presentBox: Texture;
    privateJet: Texture;
    ring: Texture;
    sportsCar: Texture;
    watch: Texture;
    womanBag: Texture;
    christmassWreath: Texture;
    greenStar: Texture;
    santaChariot: Texture;
    snowMan: Texture;

    roundCover: Texture;
    cristmasToy: Texture;
    redBallShining: Texture;
}

export const SANTA_SAC_BUNDLE: AssetsBundle = {
    name: 'santaSac',
    assets: [
        {
            alias: 'cover',
            src: `/cover.png`,
        },
        {
            alias: 'boat',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/boat.png`,
        },
        {
            alias: 'bagOfCash',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/bagOfCash.png`,
        },
        {
            alias: 'champain',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/champain.png`,
        },
        {
            alias: 'goldBar',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/goldBar.png`,
        },
        {
            alias: 'presentBox',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/presentBox.png`,
        },
        {
            alias: 'privateJet',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/privateJet.png`,
        },
        {
            alias: 'ring',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/ring.png`,
        },
        {
            alias: 'sportsCar',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/sportsCar.png`,
        },
        {
            alias: 'watch',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/watch.png`,
        },
        {
            alias: 'womanBag',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/womanBag.png`,
        },
        {
            alias: 'christmassWreath',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/christmassWreath.png`,
        },
        {
            alias: 'greenStar',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/greenStar.png`,
        },
        {
            alias: 'santaChariot',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/santaChariot.png`,
        },
        {
            alias: 'snowMan',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/snowMan.png`,
        },


        {
            alias: 'roundCover',
            src: `/roundCover.png`,
        },

        {
            alias: 'redBallShining',
            src: `${SANTA_SAC_BUNDLE_BASE_PATH}/redBallShining.png`,
        },
        // {
        //     alias: 'redBall',
        //     src: `/red_ball.png`,
        // },
    ],
};
