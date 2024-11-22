import {TouchEvent, MouseEvent, useState} from "react";

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

    const onTouchStart = (e: TouchEvent | MouseEvent) => {
        setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
        setTouchStart('touches' in e ? e.targetTouches[0].clientX : e.clientX);
    }

    const onTouchMove = (e: TouchEvent | MouseEvent) => setTouchEnd('touches' in e ? e.targetTouches[0].clientX : e.clientX);

    const onTouchEnd = () => {
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
    }

    const onMouseDown = (e: MouseEvent) => onTouchStart(e);
    const onMouseMove = (e: MouseEvent) => onTouchMove(e);
    const onMouseUp = () => onTouchEnd();

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onMouseDown,
        onMouseMove,
        onMouseUp
    }
}
