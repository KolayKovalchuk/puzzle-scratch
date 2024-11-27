import {TouchEvent, MouseEvent, useState, useCallback} from "react";

interface SwipeInput {
    onSwipedLeft: () => void
    onSwipedRight: () => void
}

interface SwipeOutput {
    onTouchStart: (e: TouchEvent | MouseEvent) => void
    onTouchMove: (e: TouchEvent | MouseEvent) => void
    onTouchEnd: () => void
    onMouseDown: (e: MouseEvent) => void
    onMouseMove: (e: MouseEvent) => void
    onMouseUp: () => void
}

export const useSwipeAria = (input: SwipeInput): SwipeOutput => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const minSwipeDistance = 50;

    const onTouchStart = useCallback((e: TouchEvent | MouseEvent) => {
        setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
        setTouchStart('touches' in e ? e.targetTouches[0].clientX : e.clientX);
    }, []);

    const onTouchMove = useCallback((e: TouchEvent | MouseEvent) =>
        setTouchEnd('touches' in e ? e.targetTouches[0].clientX : e.clientX),
    []);

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            input.onSwipedLeft();
        }
        if (isRightSwipe) {
            input.onSwipedRight();
        }
    }, [touchStart, touchEnd, input]);

    const onMouseDown = useCallback((e: MouseEvent) => onTouchStart(e), [onTouchStart]);
    const onMouseMove = useCallback((e: MouseEvent) => onTouchMove(e), [onTouchMove]);
    const onMouseUp = useCallback(() => onTouchEnd(), [onTouchEnd]);

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onMouseDown,
        onMouseMove,
        onMouseUp
    }
}
