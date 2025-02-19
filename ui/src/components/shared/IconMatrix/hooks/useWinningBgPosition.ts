import { useEffect, useState } from 'react';

export function useWinningBgPosition(
    x: number,
    y: number,
    xShift: number | undefined,
    yShift: number | undefined,
    winningBgTextureX: number,
    winningBgTextureY: number
) {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const xShiftValue = typeof xShift === 'number' ? xShift : 1;
        const yShiftValue = typeof yShift === 'number' ? yShift : 1;
        const xPosition = (x + winningBgTextureX) * xShiftValue;
        const yPosition = (y + winningBgTextureY) * yShiftValue;
        setPosition({ x: xPosition, y: yPosition });
    }, [x, y, xShift, yShift, winningBgTextureX, winningBgTextureY]);

    return { position };
}