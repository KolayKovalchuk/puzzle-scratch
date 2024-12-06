import { useEffect, useRef, useState } from 'react';

export const widestChildTargetClassName = 'widestChildTarget';

export function useGetWidestChild<T extends Element = HTMLDivElement>(...args: any[]) {
    const containerRef = useRef<T>(null);
    const [width, setWidth] = useState<number | 'auto'>(0);

    useEffect(() => {
        setTimeout(() => {
        if (containerRef.current) {
            const targetChildren = containerRef.current.querySelectorAll(`.${widestChildTargetClassName}`);
            let maxWidth = 0;
            for (let i = 0; i < targetChildren.length; i++) {
                const child = targetChildren[i];

                if (!child) continue;

                const childWidth = child.getBoundingClientRect().width;
                
                if (childWidth > maxWidth) {
                    maxWidth = childWidth;
                }
            }

            setWidth(maxWidth);
        }
        }, 100);
    }, [containerRef.current, containerRef.current?.children.length, ...args]);

    return {
        containerRef,
        width,
    }
}