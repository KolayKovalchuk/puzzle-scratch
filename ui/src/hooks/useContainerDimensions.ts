import { RefObject, useEffect, useRef, useState } from 'react';

export function useContainerDimensions<T extends Element = HTMLDivElement>(containerRef: RefObject<T> = useRef<T>(null)) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === containerRef.current) {

                    setDimensions({
                        width: entry.contentRect.width,
                        height: entry.contentRect.height,
                    });
                }
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [containerRef.current]);

    return { containerRef, dimensions };
};