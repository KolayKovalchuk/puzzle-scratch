import { ASSETS_MANIFEST, bundleNameList } from '@config/assetsManifest';
import { Assets, AssetsBundle, Texture } from 'pixi.js-legacy'; // Import Assets from pixi.js
import { useEffect, useState } from 'react';

export interface IAddBundleData<BundleConfig extends AssetsBundle["assets"]> {
    bundleName: string,
    bundle: BundleConfig
}

export function useTexture (svgName: string) {
    const [texture, setTexture] = useState<Texture | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // let texture = null;
    useEffect(() => {
        const loadTexture = async () => {
            try {
                const url = `/scratchCard/${svgName}.svg`;
                // const url = './assets/icons/candy_maze.png';
                console.log('url', url);
                
                const loadedTexture = await Texture.fromURL(url)
                    .then((texture) => {
                        console.log('texture', texture);
                        return texture;
                    });
                setTexture(loadedTexture);
                // texture = loadedTexture;
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        loadTexture();
    }, [svgName]);

    return { texture, loading, error };
};

export function useAddBundle<BundleConfig extends AssetsBundle["assets"]>({ bundleName, bundle }: IAddBundleData<BundleConfig>) {
    useEffect(() => {
        const addAssets = () => {
            try {
                // Use Assets to load resources
                Assets.addBundle(bundleName, bundle);
                console.log('Assets added:', bundle);
                
                // setIsLoaded(true);
            } catch (error) {
                console.error('Error adding assets:', error);
            }
        };

        addAssets()

    }, [bundleName, bundle]);
};

export interface IBundle {
    [key: string]: Texture | any;
}

export function useLoadBundle<Bundle extends IBundle>(bundleName: string): { bundle: Bundle | null, error: Error | null, loading: boolean } {
    const [bundle, setBundle] = useState<Bundle | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadBundle = async () => {
            setLoading(true);
            setError(null);
            try {
                const bundleAssets = await Assets.loadBundle(bundleName);
                setBundle(bundleAssets);
            } catch (err) {

                console.log(`Error loading bundle ${bundleName}:`, err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        if (bundleName) {
            loadBundle();
        }
    }, [bundleName]);

    return { bundle, error, loading };
};


export function useLoadAssets(bundle: { [key: string]: string }) {
    const [assets, setAssets] = useState<{ [key: string]: Texture }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAssets = async () => {
            const loadedAssets: { [key: string]: Texture } = {};
            for (const [name, url] of Object.entries(bundle)) {
                const texture = await Assets.load(url);
                loadedAssets[name] = texture;
            }
            setAssets(loadedAssets);
            setLoading(false);
        };

        loadAssets();
    }, [bundle]);

    return { assets, loading };
};

export function useAssetsBundleLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBundles = async () => {
            setLoading(true);
            await Assets.init({ manifest: ASSETS_MANIFEST, basePath: '/public' });

            Assets.backgroundLoadBundle(bundleNameList);
            setLoading(false);
        };

        loadBundles();
    }, []);

    return { loading };
}