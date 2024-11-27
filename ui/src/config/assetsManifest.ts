import { AssetsManifest, Texture } from 'pixi.js';
import { IBundle } from '@hooks/useAssetsBundleLoader';
import { CANDY_MAZE_BUNDLE } from './candyMazeBundleConfig';
import { SANTA_SAC_BUNDLE } from './santaSacBundleConfig';
import { ICE_BOX_BUNDLE } from './iceBoxBundleConfig';

export interface IScrathCardBundle extends IBundle {
    cover: Texture;
}

export const ASSETS_MANIFEST: AssetsManifest = {
    bundles: [ CANDY_MAZE_BUNDLE, SANTA_SAC_BUNDLE, ICE_BOX_BUNDLE ],
};

export const bundleNameList = ASSETS_MANIFEST.bundles.map((bundle) => bundle.name);