import { useCallback, useEffect, useRef } from 'react';

export function useScrollTo(scrollOnInit = true) {
    const targetRef = useRef<HTMLDivElement>(null);

    const parent = targetRef.current?.parentElement;

    const scrollTo = useCallback(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView(false);
        }
    }, [targetRef.current])

    useEffect(() => {
        if (!scrollOnInit) return;

        scrollTo();
    }, [
        scrollOnInit,
        targetRef.current,
        parent?.scrollHeight
    ])

    return { targetRef, scrollTo }
}