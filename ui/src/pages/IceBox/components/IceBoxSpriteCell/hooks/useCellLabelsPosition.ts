import { TextMetrics, TextStyle } from 'pixi.js';
import { useEffect, useState } from 'react';

export function useCellLabelsPosition(
    winNumber: string, 
    priceNumber: string,
    width: number,
    winNumberTextStyleClass: TextStyle,
    priceNumberTextStyleClass: TextStyle
) {

    const [priceNumberPosition, setPriceNumberPosition] = useState({ x: 0, y: 0 });
    const [roboIconSize, setRoboIconSize] = useState(0);
    const [priceContainerWidth, setPriceContainerWidth] = useState(0);

    useEffect(() => {
        const winTextMetrics = TextMetrics.measureText(winNumber, winNumberTextStyleClass);

        const priceTextMetrics = TextMetrics.measureText(priceNumber, priceNumberTextStyleClass);
        const roboIconSize = width / 3;
        const priceContainerWidth = roboIconSize + priceTextMetrics.width;

        const priceNumberX = width / 2 - priceContainerWidth / 2;
        const priceNumberY = winTextMetrics.height + 4;

        setPriceNumberPosition({ x: priceNumberX, y: priceNumberY });
        setRoboIconSize(roboIconSize)
        setPriceContainerWidth(priceContainerWidth);

    }, [winNumber, priceNumber, width, winNumberTextStyleClass, priceNumberTextStyleClass]);

    return { priceNumberPosition, roboIconSize, priceContainerWidth }
}