import { useCallback, useRef } from 'react';

export function useDebouncedCallback<T extends (...args: any[]) => any>(cb: T, delay = 300) {
    const timeout = useRef<NodeJS.Timeout>();

    return useCallback(
        (...args: Parameters<T>) => {
            const later = () => {
                clearTimeout(timeout.current);
                cb(...args);
            };

            clearTimeout(timeout.current);
            timeout.current = setTimeout(later, delay);
        },
        [cb, delay]
    );
}
