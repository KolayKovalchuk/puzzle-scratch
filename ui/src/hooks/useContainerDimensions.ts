import { useEffect, useRef, useState } from 'react';

export function useContainerDimensions(...args: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
            }
        };

        updateDimensions(); // Initial dimensions
        window.addEventListener('resize', updateDimensions); // Update on resize

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [...args]);

    return { containerRef, dimensions };
};