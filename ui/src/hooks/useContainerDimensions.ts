import { RefObject, useEffect, useRef, useState } from 'react';

export function useContainerDimensions<T extends Element = HTMLDivElement>(containerRef: RefObject<T> = useRef<T>(null)) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === containerRef.current) {

                    // console.log('entry.contentRect.width', entry.contentRect.width);
                    // console.log('entry.contentRect.height', entry.contentRect.height);

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

// export function useContainerDimensions(containerRef: RefObject<T> = useRef<T>(null)) {
//     // const containerRef = useRef<HTMLDivElement>(null);
//     const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//     useEffect(() => {
//         const updateDimensions = () => {
//             if (containerRef.current) {
//                 const { clientWidth, clientHeight } = containerRef.current;
//                 setDimensions({ width: clientWidth, height: clientHeight });
//             }
//         };

//         updateDimensions(); // Initial dimensions
//         window.addEventListener('resize', updateDimensions); // Update on resize

//         return () => {
//             window.removeEventListener('resize', updateDimensions);
//         };
//     }, []);

//     return { containerRef, dimensions };
// };