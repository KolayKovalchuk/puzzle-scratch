import { useState, useEffect, useRef } from 'react';

export const useContainerDimensions = () => {
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
    }, []);

    return { containerRef, dimensions };
};