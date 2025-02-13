import { useEffect } from 'react';

function _zoomDocument(scale: number) {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
        metaViewport.setAttribute('content', `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`);
    } else {
        const newMetaViewport = document.createElement('meta');
        newMetaViewport.name = 'viewport';
        newMetaViewport.content = `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`;
        document.head.appendChild(newMetaViewport);
    }
};

export function useFixIOSBlinkingElements(isLoaded: boolean) {
    useEffect(() => {
        if (isLoaded) {
            _zoomDocument(1);
        }
    }, [isLoaded]);
}