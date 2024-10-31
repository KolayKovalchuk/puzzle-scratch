import { Assets, AssetsBundle, Texture } from 'pixi.js'; // Import Assets from pixi.js
import { useEffect, useState } from 'react';

export interface IAddBundleData<BundleConfig extends AssetsBundle["assets"]> {
    bundleName: string,
    bundle: BundleConfig
}

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

export function useLoadBundle<Bundle>(bundleName: string) {
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
